export type TProductResponse = {
  id: number;
  name: string;
  year: string;
  color: string;
  pantone_value: string;
};

export type TProductsDetailsResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type TProductsResponse = TProductsDetailsResponse & {
  data: TProductResponse | TProductResponse[];
};
