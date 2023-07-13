import React, { useEffect, useState } from 'react';
import { Container, Item, Image, DropDown, DropItem } from './styles';
import httpCommon from '../../services/http-common';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GamePopup from '../CreatePopup/popup/GamePopup';
import { useAppContext } from '../../context/popup/popup_context_provider';

export default function ProductRow({ game, handleFileUpdate }) {
    const [image, setImage] = useState();
    const [open, setOpen] = useState(false);
    const { showPopup, hidePopup } = useAppContext();
    const imageId = game['image'];

    useEffect(() => {
        if (game.image) {
            const getFiles = async () => {
                try {
                    let id = game.image;
                    const res = await httpCommon.get(`/files/get?id=${id}`)
                    setImage(res.data.content)
                } catch (err) {
                    console.error('Error geting file: ', err);
                }
            }
            const getTag = async () => {
                try {
                    const response = await httpCommon.get('/gameTags/get', {
                        params: {
                            name: 'game_id',
                            value: game['id']
                        }
                    });
                    const data = response.data;
                    console.log(data);
                } catch (err) {
                    console.error('Error retrieving game tag:', err);
                }
            }
            getTag()
            getFiles()
        }
    }, [])

    const updateGame = (update) => {
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
                await httpCommon.put('/games/update', data);
                hidePopup()
            } catch (err) {
                console.error('error updating game', err);
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
        // try {
        //     const id = game.id;
        //     const res = await httpCommon.delete(`/games/delete?id=${id}`);
        //     console.log(res);
        // } catch (err) {
        //     console.error('error deleting game: ', err);
        // }
    }

    return (
        <Container>
            <Item>{game.name}</Item>
            <Item>{game.description}</Item>
            <Item><Image src={`data:image/jpeg;base64,${image}`} /></Item>
            <Item>{game.estimated_time}</Item>
            <Item>{game.estimated_time}</Item>
            <Item>פרסם/הסתר</Item>
            <Item styles={{ color: '#d3d3d4' }} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} >
                <MoreHorizIcon />
                {open ?
                    <DropDown>
                        <DropItem onClick={() => showPopup(<GamePopup name='עריכת משחק' submit={updateGame} game={game} />)}>edit</DropItem>
                        <DropItem onClick={() => deleteGame()}>delete</DropItem>
                    </DropDown> : null
                }
            </Item>
        </Container>
    )
}