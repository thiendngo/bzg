// FILE: src/lib/api/cards.ts
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/** ---- Types (adjust to match your API exactly) ---- */
export type CardStatus = "Active" | "Inactive" | "Frozen" | string;

export type Card = {
    id: string | number;
    holder: string;
    type: string;
    limit: number;
    spend: number;
    percent: number; // spend as % of limit
    status: CardStatus;
    insight: string;
};

export type CardsQuery = {
    page?: number;     // 1-based
    pageSize?: number; // default 10
    search?: string;
    status?: CardStatus;
    sort?: string;     // e.g. "holder:asc"
};

export type CardsResponse = {
    data: Card[];
    total?: number;    // optional total count if API returns it
    page?: number;
    pageSize?: number;
};

/** ---- Config ---- */
const DEFAULT_BASE =
    process.env.NEXT_PUBLIC_API_BASE ?? "https://www.examplegateway.com";
const CARDS_PATH = "/api/card";

/** Build URL with query params */
function buildUrl(base = DEFAULT_BASE, path = CARDS_PATH, query?: CardsQuery) {
    const url = new URL(path, base);
    if (query) {
        if (query.page) url.searchParams.set("page", String(query.page));
        if (query.pageSize) url.searchParams.set("pageSize", String(query.pageSize));
        if (query.search) url.searchParams.set("search", query.search);
        if (query.status) url.searchParams.set("status", String(query.status));
        if (query.sort) url.searchParams.set("sort", query.sort);
    }
    return url.toString();
}

/** Basic runtime guard to ensure array of objects */
function isCardsArray(x: unknown): x is Card[] {
    return Array.isArray(x);
}

/** ---- Server-side fetch (RSC/Routes) ----
 * Usage in a server component / loader:
 *   const { data } = await fetchCardsServer({ page: 1, pageSize: 10 }, { revalidate: 60 });
 */
export async function fetchCardsServer(
    query?: CardsQuery,
    opts?: { baseUrl?: string; revalidate?: number; headers?: HeadersInit }
): Promise<CardsResponse> {
    const url = buildUrl(opts?.baseUrl, CARDS_PATH, query);

    const res = await fetch(url, {
        headers: {
            "Accept": "application/json",
            ...(opts?.headers ?? {}),
        },
        // Next.js RSC caching:
        next: { revalidate: opts?.revalidate ?? 30 },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`fetchCardsServer: ${res.status} ${res.statusText} – ${text}`);
    }

    const json = await res.json();
    // Accept either `{ data: Card[] }` or a bare `Card[]`
    if (isCardsArray(json)) {
        return { data: normalizeCards(json) };
    }
    if (json && isCardsArray(json.data)) {
        return {
            data: normalizeCards(json.data),
            total: json.total,
            page: json.page,
            pageSize: json.pageSize,
        };
    }
    throw new Error("fetchCardsServer: Unexpected response shape");
}

/** ---- Client hook (no external libs) ----
 * Usage in a client component:
 *   const { data, total, loading, error, refetch } = useCards({ page, pageSize: 10 })
 */
export function useCards(
    query?: CardsQuery,
    opts?: { baseUrl?: string; headers?: HeadersInit }
) {
    const [data, setData] = useState<Card[] | null>(null);
    const [total, setTotal] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    //useMemo caches the result of buildUrl
    const stableUrl = useMemo(
        () => buildUrl(opts?.baseUrl, CARDS_PATH, query),
        [opts?.baseUrl, query?.page, query?.pageSize, query?.search, query?.status, query?.sort]
    );

    //Avoid race condition if user triggers another card query too quick
    const abortRef = useRef<AbortController | null>(null);

    const fetchOnce = async () => {
        abortRef.current?.abort(); //always cancel old request
        const ctrl = new AbortController();
        abortRef.current = ctrl;

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(stableUrl, {
                headers: {
                    Accept: "application/json",
                    ...(opts?.headers ?? {}),
                },
                signal: ctrl.signal,
            });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`${res.status} ${res.statusText} – ${text}`);
            }
            const json = await res.json();
            if (isCardsArray(json)) {
                setData(normalizeCards(json));
                setTotal(undefined);
            } else if (json && isCardsArray(json.data)) {
                setData(normalizeCards(json.data));
                setTotal(json.total);
            } else {
                throw new Error("Unexpected response shape");
            }
        } catch (e: any) {
            if (e?.name !== "AbortError") {
                setError(e?.message ?? "Unknown error");
                setData(null);
                setTotal(undefined);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOnce();
        return () => abortRef.current?.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stableUrl]);

    return { data, total, loading, error, refetch: fetchOnce };
}

/** ---- Helpers ----
 * If the API returns slightly different field names, map them here.
 * Adjust to your API's payload shape.
 */
function normalizeCards(rows: any[]): Card[] {
    return rows.map((r) => ({
        id: r.id ?? r.cardId ?? String(Math.random()),
        holder: r.holder ?? r.cardholder ?? r.name ?? "Unknown",
        type: r.type ?? r.cardType ?? "Virtual",
        limit: numberOr(r.limit ?? r.creditLimit, 0),
        spend: numberOr(r.spend ?? r.mtdSpend, 0),
        percent: percentOr(r.percent, r.spend, r.limit),
        status: r.status ?? "Active",
        insight: r.insight ?? r.note ?? "On track",
    }));
}

function numberOr(x: any, fallback: number) {
    const n = typeof x === "string" ? Number(x) : x;
    return Number.isFinite(n) ? n : fallback;
}

function percentOr(percent: any, spend: any, limit: any) {
    const p = numberOr(percent, NaN);
    if (Number.isFinite(p)) return p;
    const s = numberOr(spend, 0);
    const l = numberOr(limit, 0);
    return l > 0 ? Math.round((s / l) * 100) : 0;
}
