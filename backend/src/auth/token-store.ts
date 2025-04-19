const validTokens = new Set<string>();

export const TokenStore = {
  add: (token: string) => validTokens.add(token),
  has: (token: string) => validTokens.has(token),
  remove: (token: string) => validTokens.delete(token),
};
