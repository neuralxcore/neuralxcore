/**
 * @param {{ label?: string; lines?: string[]; text?: string } | string} entry
 * @returns {{ label: string; paragraphs: string[] }}
 */
export function normalizeHeroSlide(entry) {
  if (typeof entry === "string") {
    const trimmed = entry.trim();
    return {
      label: "",
      paragraphs: trimmed ? [trimmed] : [],
    };
  }

  const label = (entry.label ?? "").trim();

  if (Array.isArray(entry.lines) && entry.lines.length > 0) {
    return {
      label,
      paragraphs: entry.lines.map((l) => l.trim()).filter(Boolean),
    };
  }

  const text = (entry.text ?? "").trim();
  if (!text) {
    return { label, paragraphs: [] };
  }

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    label,
    paragraphs: paragraphs.length > 0 ? paragraphs : [text],
  };
}
