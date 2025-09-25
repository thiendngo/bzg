// CLIENT-ONLY random data (used from client components)
// Re-generates on full reload; stays stable while the page is open.

export type CardType = "Virtual" | "Physical";
export type CardStatus = "Active" | "Inactive" | "Frozen";
export type CardInsight =
    | "Healthy spend trend"
    | "Likely to exceed in 10 days"
    | "Over limit last week"
    | "Limit underutilized";

export type CardRow = {
    cardholder: string;
    type: CardType;
    limit: number;
    spendMtd: number;
    status: CardStatus;
    insight: CardInsight | string;
};

const cardholders = [
    "Marketing Dept", "Summer Ads", "Campaign Card", "Tools Subscription",
    "Pool", "Engineering", "HR", "Finance", "Sales", "John Doe (CFO)",
];

const statuses: CardStatus[] = ["Active", "Inactive", "Frozen"];
const insights: CardInsight[] = [
    "Healthy spend trend",
    "Likely to exceed in 10 days",
    "Over limit last week",
    "Limit underutilized",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function generateRows(count = 140): CardRow[] {
    const rows: CardRow[] = [];
    for (let i = 0; i < count; i++) {
        rows.push({
            cardholder: `${pick(cardholders)} #${i + 1}`,
            type: Math.random() < 0.5 ? "Virtual" : "Physical",
            limit: 4000 + Math.floor(Math.random() * 8) * 500, // 4k..7.5k
            spendMtd: 200 + Math.floor(Math.random() * 5200),  // 200..5399
            status: pick(statuses),
            insight: pick(insights),
        });
    }
    return rows;
}

export const cards = Array.from({ length: 140 }).map((_, i) => ({
    id: i + 1,
    holder: ["Marketing Dept", "Summer Ads", "Campaign Card", "Tools Subscription", "Finance", "Sales", "Engineering", "John Doe (CFO)"][i % 8] + ` #${i + 1}`,
    type: i % 2 === 0 ? "Virtual" : "Physical",
    limit: 5000 + (i % 5) * 1000,
    spend: 1000 + (i * 123) % 5000,
    percent: 77,
    status: ["Active", "Inactive", "Frozen"][i % 3],
    insight: [
        "Healthy spend trend",
        "Over limit last week",
        "Likely to exceed in 10 days",
        "Limit underutilized",
    ][i % 4],
}));


export function computeMetrics(data: CardRow[]) {
    const activeCount = data.filter((r) => r.status === "Active").length;
    const monthlySpend = data.reduce((s, r) => s + r.spendMtd, 0);
    const aiAlerts = data.filter((r) => {
        const s = String(r.insight).toLowerCase();
        return r.status === "Frozen" || /over\s*limit|exceed/.test(s);
    }).length;
    const unusedCards = data.filter((r) => r.status === "Inactive").length;
    return { activeCount, monthlySpend, aiAlerts, unusedCards };
}
