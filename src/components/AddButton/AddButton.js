import React from 'react';
import { IconCircle } from './styles';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({ handleClick }) {
    return (
        <IconCircle onClick={handleClick}>
            <AddIcon sx={{ color: 'white' }} />
        </IconCircle>
    )
}