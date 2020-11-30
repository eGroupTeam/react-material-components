import { useState } from 'react';

export default function useIsOpen(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    handleOpen,
    handleClose,
  };
}
