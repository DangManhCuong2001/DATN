import { Box, SxProps } from '@mui/material';
import React from 'react';

export default function DividerCustom({ sx }: { sx?: SxProps }) {
    return (
        <Box
            sx={{
                borderTop: (theme) => (theme.palette.mode == 'dark' ? '1px solid #585F5A4D' : '1px solid #D8D8D8'),
                borderBottom: (theme) => (theme.palette.mode == 'dark' ? '1px solid #585F5A4D' : '2px solid #F7F7F7'),
                mt: 2.5,
                mb: 2,
                ...sx,
            }}
        ></Box>
    );
}
