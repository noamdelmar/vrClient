import React from 'react';
import { Item, Container } from './styles';

export default function TitleRow({ titles }) {
    return (
        <Container styles={{ borderBottom: '1px solid #d3d3d4', height: 'auto', paddingBottom: '.7rem' }} >
            {titles.map(title => {
                return <Item styles={{ color: '#cecfcf' }} >{title}</Item>
            })}
        </Container>
    )
}