import React, { useEffect, useState } from 'react';
import { Container, Item, Image, DropDown, DropItem } from './styles';
import httpCommon from '../../services/http-common';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FaultPopup from '../CreatePopup/popup/FaultPopup';
import { useAppContext } from '../../context/popup/popup_context_provider';

export default function GameRow({ fault, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [image, setImage] = useState();
    const [open, setOpen] = useState(false);
    const [faultType, setFaultType] = useState();
    const imageId = fault['image'];

    useEffect(() => {
        if (fault.image) {
            const getFiles = async () => {
                try {
                    let id = fault.image;
                    const res = await httpCommon.get(`/files/get?id=${id}`)
                    setImage(res.data.content)
                } catch (err) {
                    console.error('Error geting file: ', err);
                }
            }
            const getFaultTypes = async () => {
                try {
                    const res = await httpCommon.get(`/faultTypes/get?id=${fault['type']}`)
                    setFaultType(res.data['name']);
                } catch (err) {
                    console.error('error retrieving fault types: ', err);
                }
            }

            getFaultTypes()
            getFiles()
        }
    }, [])

    const updateFault = (update) => {
        console.log(update);
        const updateData = Object.keys(update);
        const dataArray = updateData.map(key => {
            if (key === 'image') {
                updateFile(update[key])
                return { id: update['id'], name: 'image', value: imageId };
            } else {
                return { id: update['id'], name: key, value: update[key] };
            }
        });
        dataArray.map(async (data) => {
            try {
                await httpCommon.put('/faults/update', data);
                hidePopup()
            } catch (err) {
                console.error('error updating fault', err);
            }
        });
    };

    const updateFile = async (image) => {
        try {
            await handleFileUpdate(imageId, image);
        } catch (err) {
            console.error('Error updating file:', err);
            throw err; // rethrow the error or handle it as needed
        }
    };

    const deleteGame = async () => {
        try {
            const id = fault.id;
            const res = await httpCommon.delete(`/faults/delete?id=${id}`);
            console.log(res);
        } catch (err) {
            console.error('error deleting fault: ', err);
        }
    }

    return (
        <Container>
            <Item>{fault.name}</Item>
            <Item>{fault.description}</Item>
            <Item>{fault.solution}</Item>
            <Item><Image src={`data:image/jpeg;base64,${image}`} /></Item>
            <Item>{faultType}</Item>
            <Item styles={{ color: '#d3d3d4' }} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} >
                <MoreHorizIcon />
                {open ?
                    <DropDown>
                        <DropItem onClick={() => showPopup(<FaultPopup name='עריכת תקלה' existingFault={fault} submit={updateFault} />)}>edit</DropItem>
                        <DropItem onClick={() => deleteGame()}>delete</DropItem>
                    </DropDown> : null
                }
            </Item>
        </Container>
    )
}