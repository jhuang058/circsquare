import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" style={{
        position: 'absolute', left: '50%', paddingBottom:'100px',
        transform: 'translate(-50%, -50%)'
    }}/>
    </Stack>
  );
}
