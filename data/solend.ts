export const vulnerable_code_solend = `
const price = saber.getPrice("USDH/USDC"); // Low liquidity source
`;

export const fixed_code_solend = `
const price = oracle.aggregate(["Saber", "Orca", "Raydium"]);
`;