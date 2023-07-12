import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import GamePopup from '../../components/CreatePopup/popup/GamePopup';
import httpCommon from '../../services/http-common';
import { GamesContainer, Container } from './styles';
import ProductRow from '../../components/ProductRow/ProductRow';

export default function Games({ handleFileUpload }) {
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
                console.log(res.data);
            } catch (err) {
                console.error('error geting game: ', err);
            }
        }
        getGames()
    }, [])
    return (
        <Container>
            <GamesContainer>
                <div>משחקים</div>
                {existingGames?.map((game) => {
                    return <ProductRow game={game} />
                })}
            </GamesContainer>
            <div onClick={() => showPopup(<GamePopup name='יצירת משחק' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת משחק</div>
        </Container>
    )
}