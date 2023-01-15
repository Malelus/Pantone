import { useRef, useState } from 'react';

import { Box, Fade, Modal, Typography } from '@mui/material';

import { useOnClickOutside } from 'usehooks-ts';

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

const StatusMessage = ({ isError, message }: { isError: boolean; message: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, closeModal);

  const messageLength = 20;

  return (
    <>
      <Typography
        variant='subtitle1'
        onClick={isError ? openModal : undefined}
        sx={{ cursor: isError ? 'pointer' : 'default', color: isError ? 'red' : 'initial' }}
      >
        {message!.length > messageLength ? `${message!.substring(0, messageLength).trim()}...` : message}
      </Typography>

      {isError && (
        <Modal open={isOpen} aria-labelledby='modal-title'>
          <Fade in={isOpen}>
            <Box sx={{ ...style, color: 'red' }} ref={modalRef}>
              <Typography id='modal-title' variant='h4' component='h2'>
                {message}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default StatusMessage;
