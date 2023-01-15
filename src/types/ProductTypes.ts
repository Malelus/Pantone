export type TProduct = {
  id: number;
  name: string;
  year: string;
  hexCode: string;
  pantoneValue: string;
};

export type TProductsDetails = {
  currentPage: number;
  productsPerPage: number;
  pagesAmount: number;
  productsAmount: number;
};

export type TProducts = TProductsDetails & {
  products: TProduct[];
};

export type TProductsControl = {
  isLoading: boolean;
  first: () => void;
  prev: () => void;
  next: () => void;
  last: () => void;
};
