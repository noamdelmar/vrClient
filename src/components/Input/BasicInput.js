import React from 'react';
import { NameField, FlexContainer } from './styles';
import Input from '@mui/material/Input';

export default function BasicInput({ values, name, value, type = null }) {
    const handleChange = (e) => {
        values[e.target.name] = e.target.value
    }
    return (
        <FlexContainer>
            <NameField>{name}</NameField>
            <Input name={value} onChange={handleChange} type={type} multiline />
        </FlexContainer>

    )
}