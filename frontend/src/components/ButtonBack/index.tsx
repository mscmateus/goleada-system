import React from 'react';
import { Button } from '@mui/material';

type BackButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Button sx={{ fontWeight: "bold", marginTop: "20px", textTransform: 'capitalize', fontSize: "18px" }} onClick={onClick}>
      🠔 Voltar
    </Button>
  );
};

export default BackButton;