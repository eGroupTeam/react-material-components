export default function shortUsername(username) {
  if (!username || !username.length) return;

  const isEnglish = /^[A-Za-z0-9]*$/.test(username);
  if (isEnglish) {
    return username.charAt(0).toUpperCase();
  }
  return username.slice(-2);
}
