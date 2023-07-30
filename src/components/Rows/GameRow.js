import React, { useEffect, useState } from 'react';
import { Container, Item, Image } from './styles';
import httpCommon from '../../services/http-common';
import GamePopup from '../CreatePopup/popup/GamePopup';
import { useAppContext } from '../../context/popup/popup_context_provider';
import More from '../More/More';

export default function GameRow({ game, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [image, setImage] = useState();
    const [tag, setTag] = useState();
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
                    console.log(response.data);
                    const data = response.data.rows[0].name;
                    setTag(data)
                } catch (err) {
                    console.error('Error retrieving game tag:', err);
                }
            }
            getTag()
            getFiles()
        }
    }, [])

    const updateGame = async (update) => {
        const updateData = Object.keys(update);
        const dataArray = updateData.map(key => {
            if (key === 'image' && typeof (update[key]) !== 'number') {
                updateFile(update[key])
                return { id: update['id'], name: 'image', value: imageId };
            } else if (key === 'tagsId') {
                updateGameTag({ id: update['id'], name: 'tag_id', value: update[key] })
            } else {
                return { id: update['id'], name: key, value: update[key] };
            }
        });
        dataArray.map(async (data) => {
            if (data) {
                try {
                    await httpCommon.put('games/update', data);
                    hidePopup()
                } catch (err) {
                    console.error('error updating game', err);
                }
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
            const id = game.id;
            const res = await httpCommon.delete(`/games/delete?id=${id}`);
        } catch (err) {
            console.error('error deleting game: ', err);
        }
    }

    const updateGameTag = async (data) => {
        console.log(data);
        try {
            const res = await httpCommon.put('/gameTags/update', data);
            console.log(res);
        } catch (err) {
            console.error('error updating game tag', err);
        }
    }
    return (
        <Container>
            <Item>{game.name}</Item>
            <Item>{game.description}</Item>
            <Item><Image src={`data:image/jpeg;base64,${image}`} /></Item>
            <Item>{game.estimated_time}</Item>
            <Item>{tag}</Item>
            <Item>{game.visible ? 'מפורסם' : 'מוסתר'}</Item>
            <More
                handleEdit={() => showPopup(<GamePopup name='עריכת משחק' submit={updateGame} game={game} />)}
                handleDelete={() => deleteGame()}
            />
        </Container>
    )
}