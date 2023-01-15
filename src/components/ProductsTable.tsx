import { TableContainer, Table, TableHead, TableBody, TableFooter, TableCell, TableRow, Paper } from '@mui/material';

import ProductRow from './ProductRow';
import ProductsControl from './ProductsControl';

import { TProducts, TProductsControl } from '../types/ProductTypes';

type ProductsTableProps = {
  content: TProducts;
  rowsPerPage?: number;
  changePage: TProductsControl;
  status: {
    isError: boolean;
    message: string | undefined;
  };
};

const ProductsTable = ({ content, rowsPerPage = 5, changePage, status }: ProductsTableProps) => {
  const { products, ...pageDetails } = content;

  const emptyRows = rowsPerPage - (products.length ?? 0);

  const EmptyRows = () => (
    <TableRow style={{ height: 53 * emptyRows }}>
      <TableCell colSpan={6} />
    </TableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label='Products table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
          {emptyRows > 0 && <EmptyRows />}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>
              <ProductsControl changePage={changePage} pageDetails={pageDetails} status={status} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
