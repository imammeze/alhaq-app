export const setLocationCookie = (lat: number, lng: number) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();

  document.cookie = `user_location=${lat},${lng}; path=/; ${expires}; SameSite=Lax`;
};

export const getLocationFromCookie = (): {
  lat: number;
  lng: number;
} | null => {
  if (typeof document === "undefined") return null;

  const name = "user_location=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) {
      const coords = c.substring(name.length, c.length).split(",");
      return { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) };
    }
  }
  return null;
};
