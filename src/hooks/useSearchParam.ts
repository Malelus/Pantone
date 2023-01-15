export const getParam = (url: URL, key: string) => {
  return url.searchParams.get(key);
};

export const setParam = (url: URL, key: string, value: string | number) => {
  return url.searchParams.set(key, value.toString());
};

export const delParam = (url: URL, key: string) => {
  return url.searchParams.delete(key);
};

export const updateParam = (url: URL, key: string, value: string | number | undefined) => {
  return value ? setParam(url, key, value) : delParam(url, key);
};

export const getPageNumber = (): number => {
  const pageNumber = Number(getParam(new URL(window.location.href), 'page'));

  return pageNumber > 0 ? pageNumber : 1;
};

export const getProductID = (): number | undefined => {
  const productID = Number(getParam(new URL(window.location.href), 'id'));

  return productID > 0 ? productID : undefined;
};
