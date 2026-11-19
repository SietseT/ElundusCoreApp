const MAX_TEXT_CHARS = 40

/**
 * Builds a filename like "Brian - hello chat this is a test.mp3".
 * The text part is cleaned of characters that are invalid on Windows/macOS
 * and cut at a word boundary so long messages don't produce huge names.
 */
export function speechFileName(voice: string, text: string): string {
  const cleaned = text
    // eslint-disable-next-line no-control-regex
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const chars = Array.from(cleaned) // count code points, so emoji aren't split
  let snippet = cleaned
  if (chars.length > MAX_TEXT_CHARS) {
    snippet = chars.slice(0, MAX_TEXT_CHARS).join('')
    const lastSpace = snippet.lastIndexOf(' ')
    // Prefer a word boundary, unless that would throw away most of the snippet.
    if (lastSpace > MAX_TEXT_CHARS / 2) snippet = snippet.slice(0, lastSpace)
  }
  // Windows rejects names ending in a dot or space.
  snippet = snippet.replace(/[. ]+$/, '')

  return snippet ? `${voice} - ${snippet}.mp3` : `${voice}.mp3`
}
