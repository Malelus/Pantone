import { useState } from 'react';

import { TableCell, TableRow, useTheme } from '@mui/material';

import ProductDetails from './ProductDetails';

import { TProduct } from '../types/ProductTypes';

const ProductRow = ({ product }: { product: TProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const color = useTheme().palette.getContrastText(product.hexCode);

  return (
    <>
      <TableRow onClick={openModal} sx={{ bgcolor: product.hexCode, cursor: 'pointer' }}>
        <TableCell component='th' scope='row' sx={{ color }}>
          {product.id}
        </TableCell>
        <TableCell style={{ width: 160 }} align='right' sx={{ color }}>
          {product.name}
        </TableCell>
        <TableCell style={{ width: 160 }} align='right' sx={{ color }}>
          {product.year}
        </TableCell>
        <ProductDetails product={product} isOpen={isOpen} closeModal={closeModal} color={color} />
      </TableRow>
    </>
  );
};

export default ProductRow;
