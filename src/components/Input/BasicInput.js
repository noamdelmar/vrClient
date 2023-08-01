import React, { useState } from 'react';
import { NameField, FlexContainer, ErrorMsg } from './styles';
import Input from '@mui/material/Input'

export default function BasicInput({ values, title, name, type = null, error, login }) {
    const [fieldValue, setFieldValue] = useState(values[name]);

    const handleChange = (e) => {
        setFieldValue(e.target.value);
        values[name] = e.target.value;
    };

    return (
        <FlexContainer login={login}>
            <NameField>{title}</NameField>
            <Input
                error={error}
                name={name}
                onChange={handleChange}
                type='number'
                // type={type}
                value={error ? '***שדה חובה' : fieldValue}
                multiline
                sx={{
                    color: error ? 'rgb(211,47,47)' : 'black',
                }}
            />
        </FlexContainer>
    );
}