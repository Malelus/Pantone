import { TProductsResponse } from '../types/ProductResponseTypes';

const checkIfDataExists = (data: TProductsResponse) => {
  return Array.isArray(data.data) ? !!data.data.length : !!Object.keys(data.data).length;
};

export default checkIfDataExists;
