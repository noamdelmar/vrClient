import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import GamePopup from '../../components/CreatePopup/popup/GamePopup';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container, SearchContainer, Title } from './styles';
import GameRow from '../../components/Rows/GameRow';
import TitleRow from '../../components/Rows/TitleRow';
import Search from '../../components/Search/Search';
import AddButton from '../../components/AddButton/AddButton';

export default function Games({ handleFileUpload, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [existingGames, setExistingGames] = useState();
    const [games, setGames] = useState();
    const TITLES = ['שם', 'תיאור', 'תמונה', 'זמן', 'קטגוריה', 'מצב', ''];

    useEffect(() => {
        //GET ALL VISIBLE GAMES
        const getGames = async () => {
            try {
                const data = {
                    name: 'visible',
                    value: true
                }
                const res = await httpCommon.get(`/games/get?data=${JSON.stringify(data)}`);
                setExistingGames(res.data);
                setGames(res.data)
            } catch (err) {
                console.error('error geting game: ', err);
            }
        }
        getGames()
    }, [])

    //CREATE A NEW GAME
    const createGame = async (form) => {
        try {
            form['image'] = await handleFileUpload(form.image)
            const res = await httpCommon.post('/games/create', form);
        } catch (err) {
            console.error('error creating game', err);
        }
        hidePopup()
    }

    //SEARCH GAME BY QUERY
    const handleSearch = (search) => {
        const lowerCaseSearch = search.toLowerCase();
        const queryArray = existingGames.filter(game => game.name.toLowerCase().includes(lowerCaseSearch));
        setGames(queryArray)
    }

    //SET GAMES BACK TO ALL VISIBLE GAMES
    useEffect(() => {
        if (games?.length == 0) {
            setGames(existingGames)
        }
    }, [games])


    return (
        <Container>
            <WhiteContainer>
                <SearchContainer>
                    <Search handleChange={handleSearch} />
                    <Title>משחקים</Title>
                </SearchContainer>
                <TitleRow titles={TITLES} />
                {games?.map((game) => {
                    return <GameRow game={game} handleFileUpdate={handleFileUpdate} />
                })}
                <AddButton handleClick={() => showPopup(<GamePopup name='יצירת משחק' submit={createGame} />)} />
            </WhiteContainer>
        </Container>
    )
}