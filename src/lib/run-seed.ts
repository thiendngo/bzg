/**
 * Returns a single seed number for the lifetime of the dev server process.
 * On the first call after `npm run dev` starts, it sets the seed.
 * It persists in `globalThis` so HMR doesn't change it.
 */
export function getRunSeed() {
    const g = globalThis as any;
    if (!g.__RUN_SEED__) {
        // You can also use crypto.randomInt if you prefer
        g.__RUN_SEED__ = Date.now() & 0xffffffff; // 32-bit
    }
    return g.__RUN_SEED__ as number;
}
