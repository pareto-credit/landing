type ClassValue = string | false | null | undefined;

export const cn = (...classValues: ClassValue[]) =>
  classValues.filter(Boolean).join(" ");
