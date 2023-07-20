import React, { useState } from "react";
import { Container, Item, DropDown, DropItem } from './styles';
import TypePopup from "../CreatePopup/popup/TypePopup";
import httpCommon from "../../services/http-common";
import { useAppContext } from '../../context/popup/popup_context_provider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function TagRow({ tag }) {
    const [open, setOpen] = useState(false);
    const { showPopup, hidePopup } = useAppContext();

    const updateTag = async (update) => {
        const updateData = Object.keys(update);
        const dataArray = updateData.map(key => {
            return { id: update['id'], name: key, value: update[key] }
        })

        dataArray.map(async (data) => {
            try {
                const res = await httpCommon.put('tags/update', data);
                console.log(res);
            } catch (err) {
                console.error('error creating tag:', err);
            }
        })
    }
    const deleteTag = async () => {
        try {
            const res = await httpCommon.delete(`/tags/delete?id=${tag.id}`);
            console.log(res);
        } catch (err) {
            console.error('error deleting tag:', err);
        }
    }

    return (
        <Container>
            <Item>{tag.name}</Item>
            <Item>{tag.description}</Item>
            <Item styles={{ color: '#d3d3d4' }} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} >
                <MoreHorizIcon />
                {open ?
                    <DropDown>
                        <DropItem onClick={() => showPopup(<TypePopup name='יצירת קטגוריה' existingType={tag} submit={updateTag} />)}>edit</DropItem>
                        <DropItem onClick={() => deleteTag()}>delete</DropItem>
                    </DropDown> : null
                }
            </Item>
        </Container>
    )
}


{/* <div onClick={() => showPopup(<CreatePopup name='יצירת קטגוריה' data={TAG} submit={createTag} />)}>יצירת קטגוריה</div> */ }
