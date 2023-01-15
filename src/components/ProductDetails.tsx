import { useRef } from 'react';

import { Box, Modal, Typography } from '@mui/material';

import { useOnClickOutside } from 'usehooks-ts';

import { TProduct } from '../types/ProductTypes';

type ProductModalProps = {
  product: TProduct;
  color: string;
  isOpen: boolean;
  closeModal: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  outline: 'none',
  py: 3,
  px: 6,
  borderRadius: '0.5em',
};

const ProductDetails = ({ product, color, isOpen, closeModal }: ProductModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, closeModal);

  return (
    <Modal open={isOpen} aria-labelledby='modal-title'>
      <Box sx={{ ...style, bgcolor: product.hexCode, color }} ref={modalRef}>
        <Typography id='modal-title' variant='h4' component='h2'>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 4 }}>
          <Typography variant='body1'>ID: {product.id}</Typography>
          <Typography variant='body1'>HEX Code: {product.hexCode}</Typography>
          <Typography variant='body1'>Pantone Value: {product.pantoneValue}</Typography>
          <Typography variant='body1'>Year: {product.year}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;
