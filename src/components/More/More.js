import React, { useState } from 'react';
import { Item } from '../Rows/styles';
import { DropDown, DropItem } from './styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function More({ handleEdit, handleDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <Item styles={{ color: '#d3d3d4' }} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} >
            <MoreHorizIcon />
            {open ?
                <DropDown>
                    <DropItem top={true} onClick={handleEdit}>edit</DropItem>
                    <DropItem onClick={handleDelete}>delete</DropItem>
                </DropDown> : null
            }
        </Item>
    )
}