import React, { useState } from 'react';
import { Container, Route } from './styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function SideBar({ setPage, selectedPage }) {
    const PAGES = [
        { name: 'משחקים', value: 'games' },
        { name: 'קטגוריות', value: 'tag' },
        { name: 'סוגי תקלות', value: 'faultType' },
        { name: 'תקלות', value: 'fault' },
    ]
    return (
        <Container>
            {PAGES.map(page => {
                return (
                    <Route onClick={() => setPage(page.value)} selected={page.value == selectedPage}>
                        <div>{page.name}</div>
                        <SportsEsportsIcon />
                    </Route>
                )
            })}
        </Container>
    )
}