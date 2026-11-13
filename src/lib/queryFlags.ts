/** Hidden sections stay in the codebase and can be previewed with a query flag. */
export const isQueryFlagEnabled = (name: string): boolean => {
  if (typeof window === "undefined") return false;

  const value = new URLSearchParams(window.location.search).get(name);
  if (value === null) return false;

  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
};
