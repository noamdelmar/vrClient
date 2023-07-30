import React, { useState } from 'react';
import { Container, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ handleChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Container maxWidth="md" sx={{ border: 'none', width: '90%' }}>
            <style>
                {`
          .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
            border: none;
          }
        `}
            </style>
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '50px',
                    backgroundColor: '#f0f0f0',
                    height: '2rem',
                    paddingX: '0.5rem',
                }}
            >
                <TextField
                    id="search"
                    type="search"
                    label="חיפוש"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); handleChange(e.target.value) }}
                    sx={{
                        width: 200,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Container>
    );
}