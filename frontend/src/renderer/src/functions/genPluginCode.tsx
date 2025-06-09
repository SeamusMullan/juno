// Auto-generate plugin code (4 uppercase letters from project name)
export default function autoGeneratePluginCode(): string {
  // return a random 4-letter code based on project name, contains at least one capital letter
  const letters = [
    'A',
    'a',
    'B',
    'b',
    'C',
    'c',
    'D',
    'd',
    'E',
    'e',
    'F',
    'f',
    'G',
    'g',
    'H',
    'h',
    'I',
    'i',
    'J',
    'j',
    'K',
    'k',
    'L',
    'l',
    'M',
    'm',
    'N',
    'n',
    'O',
    'o',
    'P',
    'p',
    'Q',
    'q',
    'R',
    'r',
    'S',
    's',
    'T',
    't',
    'U',
    'u',
    'V',
    'v',
    'W',
    'w',
    'X',
    'x',
    'Y',
    'y',
    'Z',
    'z'
  ]
  let out = Array.from(
    { length: 4 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join('')
  // Ensure at least one uppercase letter
  if (!/[A-Z]/.test(out)) {
    out = out.replace(/[a-z]/, (match) => match.toUpperCase())
  }
  return out // Ensure exactly 4 characters
}
