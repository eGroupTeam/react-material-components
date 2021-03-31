export default function deIdentification(str: string, loose?: boolean) {
  if (loose) {
    const showLen = Math.round(str.length / 2);
    const markLen = str.length - showLen;
    const showStart = Math.round((str.length - showLen) / 2);
    return str.replace(str.substr(showStart, markLen), '○'.repeat(markLen));
  }
  const markLen = str.length - 1;
  return str.replace(str.substr(1, markLen), '○'.repeat(markLen));
}
