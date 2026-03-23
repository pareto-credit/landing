const LEGAL_PAGE_RETURN_SCROLL_KEY = "pareto:legal:return-scroll-y";

const parseStoredScroll = (value: string | null) => {
  if (value === null) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
};

export const saveLegalPageReturnScroll = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    LEGAL_PAGE_RETURN_SCROLL_KEY,
    String(window.scrollY),
  );
};

export const getLegalPageReturnScroll = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return parseStoredScroll(
    window.sessionStorage.getItem(LEGAL_PAGE_RETURN_SCROLL_KEY),
  );
};

export const consumeLegalPageReturnScroll = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const scrollY = getLegalPageReturnScroll();
  window.sessionStorage.removeItem(LEGAL_PAGE_RETURN_SCROLL_KEY);
  return scrollY;
};
