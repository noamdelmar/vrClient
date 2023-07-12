import React, { useEffect, useState } from 'react';
import { Container, Item, Image } from './styles';
import httpCommon from '../../services/http-common';

export default function ProductRow({ game }) {
    const [image, setImage] = useState();
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
            getFiles()
        }
    }, [])
    return (
        <Container>
            <Item>{game.name}</Item>
            <Item>{game.description}</Item>
            <Item><Image src={`data:image/jpeg;base64,${image}`} /></Item>
            <Item>{game.estimated_time}</Item>
            <Item>פרסם/הסתר</Item>
        </Container>
    )
}