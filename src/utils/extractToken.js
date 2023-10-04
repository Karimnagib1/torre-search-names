/**
 * Extracts the token from the cookie
 * @returns {string} token - The token extracted from the cookie or null if not found
 */
export const extractTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("Authorization=")) {
      const token = cookie.substring("Authorization=".length);
      return token;
    }
  }
  return null;
};
