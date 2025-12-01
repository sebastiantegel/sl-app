export const get = async <T>(url: string) => {
  const response = await fetch(encodeURI(url));
  const data: T = await response.json();

  return data;
};
