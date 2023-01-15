import { TProductsResponse, TProductsDetailsResponse, TProductResponse } from '../types/ProductResponseTypes';
import { TProducts, TProductsDetails, TProduct } from '../types/ProductTypes';

const formatProductsResponse = (data: TProductsResponse): TProducts => {
  const { data: rawData, ...productsDetails } = data;

  const isFiltered = !Array.isArray(rawData);

  const formatPageDetails = (productsDetails: TProductsDetailsResponse): TProductsDetails => {
    const currentPage = productsDetails.page ?? 1;
    const productsPerPage = productsDetails.per_page ?? 1;
    const pagesAmount = productsDetails.total_pages ?? 1;
    const productsAmount = productsDetails.total ?? 1;

    return { currentPage, productsPerPage, pagesAmount, productsAmount };
  };

  const formatRawData = (productData: TProductResponse): TProduct => {
    const { id, name, year, color: hexCode, pantone_value: pantoneValue } = productData;

    return { id, name, year, hexCode, pantoneValue };
  };

  const products = isFiltered ? [formatRawData(rawData)] : rawData.map((data) => formatRawData(data));

  return { ...formatPageDetails(productsDetails), products };
};

export default formatProductsResponse;
