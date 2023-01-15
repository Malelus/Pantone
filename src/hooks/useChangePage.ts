import { Dispatch, SetStateAction } from 'react';

import { TProducts } from '../types/ProductTypes';

const useChangePage = (content: TProducts, isLoading: boolean, changePage: Dispatch<SetStateAction<number>>) => {
  const { currentPage, pagesAmount } = content;

  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesAmount;

  const first = () => {
    changePage(1);
  };

  const prev = () => {
    if (!isFirst) {
      changePage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (!isLast) {
      changePage((prev) => prev + 1);
    }
  };

  const last = () => {
    changePage(pagesAmount);
  };

  return { isLoading, first, prev, next, last };
};

export default useChangePage;
