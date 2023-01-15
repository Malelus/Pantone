import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import useFetch from 'react-fetch-hook';
import useChangePage from './hooks/useChangePage';
import { getPageNumber, getProductID, updateParam } from './hooks/useSearchParam';

import ProductsTable from './components/ProductsTable';

import checkIfDataExists from './utils/checkifDataExists';
import formatProductsResponse from './utils/formatProductsResponse';

import { TProductsResponse } from './types/ProductResponseTypes';
import { TProducts } from './types/ProductTypes';

const url = new URL('https://reqres.in/api/products?per_page=5');

const initialContent: TProducts = {
  currentPage: 0,
  productsPerPage: 0,
  pagesAmount: 0,
  productsAmount: 0,
  products: [],
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(() => getPageNumber());
  const [productID, setFilter] = useState<number | undefined>(() => getProductID());

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(Number(event.target.value.replace(/\D/g, '')));
  };

  const handleFilterReset = () => setFilter(undefined);

  const [shouldFetchProducts, setShouldFetchProducts] = useState<boolean>(false);

  // Search param modifier and fetch trigger
  useEffect(() => {
    setShouldFetchProducts(false);

    updateParam(url, 'page', currentPage);
    updateParam(url, 'id', productID);

    const refetch = setTimeout(() => setShouldFetchProducts(true), 100);

    return () => clearTimeout(refetch);
  }, [currentPage, productID]);

  const fetchDefault = () => {
    updateParam(url, 'page', 1);
    setCurrentPage(1);
  };

  const [content, setContent] = useState<TProducts>(initialContent);
  const [statusMessage, setStatusMessage] = useState<string>();

  const { isLoading, data, error } = useFetch<TProductsResponse>(url.href, { depends: [shouldFetchProducts] });

  useEffect(() => {
    if (isLoading) setStatusMessage('Loading...');

    if (error) setStatusMessage(`${error.status} ${error.message}`);

    if (data) {
      if (!checkIfDataExists(data)) return fetchDefault();

      setContent(formatProductsResponse(data));
      setStatusMessage(undefined);
    }

    setShouldFetchProducts(false);
  }, [isLoading, error, data]);

  const changePage = useChangePage(content, isLoading, setCurrentPage);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: 'hsl(0 0% 98%)' }}>
      <CssBaseline />
      <Container maxWidth='md'>
        <Typography variant='h3' mb={8}>
          Check out our products!
        </Typography>

        <Grid container mb={4} alignItems='center' justifyContent='start' gap='1rem'>
          <Grid item>
            <TextField
              label='Filter products by ID'
              variant='outlined'
              value={productID || ''}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item sx={{ display: 'grid', alignSelf: 'stretch' }}>
            <Button variant='outlined' onClick={handleFilterReset}>
              <RestartAltIcon />
            </Button>
          </Grid>
        </Grid>

        <ProductsTable
          content={content}
          changePage={changePage}
          status={{ isError: !!error, message: statusMessage }}
        />
      </Container>
    </main>
  );
};

export default App;
