import { Grid, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import StatusMessage from './StatusMessage';

import { TProductsControl, TProductsDetails } from '../types/ProductTypes';

type ProductsControlProps = {
  changePage: TProductsControl;
  pageDetails: TProductsDetails;
  status: {
    isError: boolean;
    message: string | undefined;
  };
};

const ProductsControl = ({ changePage, pageDetails, status }: ProductsControlProps) => {
  const { isLoading, first, prev, next, last } = changePage;
  const { currentPage, pagesAmount, productsAmount, productsPerPage } = pageDetails;
  const { isError, message } = status;

  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesAmount;

  const to = productsPerPage * currentPage > productsAmount ? productsAmount : productsPerPage * currentPage;
  const from = currentPage === pagesAmount ? productsPerPage * (currentPage - 1) + 1 : to - productsPerPage + 1;

  const productRange = productsPerPage === 1 ? to : `${from} - ${to}`;

  return (
    <Grid container alignItems='center' justifyContent='flex-end'>
      <Grid item marginRight={'auto'}>
        {message ? (
          <StatusMessage {...{ isError, message }} />
        ) : (
          <Typography variant='subtitle1'>
            Page: {currentPage} / {pagesAmount}
          </Typography>
        )}
      </Grid>

      {!isError && (
        <Grid item marginRight={0.5}>
          <Typography variant='subtitle1'>
            {productRange} of {productsAmount}
          </Typography>
        </Grid>
      )}

      <Grid item>
        <IconButton onClick={first} disabled={isError || isLoading || isFirst} aria-label='first page'>
          <FirstPageIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton onClick={prev} disabled={isError || isLoading || isFirst} aria-label='previous page'>
          <KeyboardArrowLeft />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton onClick={next} disabled={isError || isLoading || isLast} aria-label='next page'>
          <KeyboardArrowRight />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton onClick={last} disabled={isError || isLoading || isLast} aria-label='last page'>
          <LastPageIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ProductsControl;
