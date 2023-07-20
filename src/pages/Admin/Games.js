import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import GamePopup from '../../components/CreatePopup/popup/GamePopup';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container } from './styles';
import GameRow from '../../components/Rows/GameRow';

export default function Games({ handleFileUpload, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [existingGames, setGames] = useState();

    useEffect(() => {
        const getGames = async () => {
            try {
                const data = {
                    name: 'visible',
                    value: true
                }
                const res = await httpCommon.get(`/games/get?data=${JSON.stringify(data)}`);
                setGames(res.data);
            } catch (err) {
                console.error('error geting game: ', err);
            }
        }
        getGames()
    }, [])

    const createGame = async (form) => {
        try {
            form['image'] = await handleFileUpload(form.image)
            const res = await httpCommon.post('/games/create', form);
        } catch (err) {
            console.error('error creating game', err);
        }
        hidePopup()
    }


    return (
        <Container>
            <WhiteContainer>
                <div>משחקים</div>
                {existingGames?.map((game) => {
                    return <GameRow game={game} handleFileUpdate={handleFileUpdate} />
                })}
            </WhiteContainer>
            <div onClick={() => showPopup(<GamePopup name='יצירת משחק' submit={createGame} />)}>יצירת משחק</div>
        </Container>
    )
}