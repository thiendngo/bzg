export const formatMoney = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export const formatCurrency = (n: number) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
