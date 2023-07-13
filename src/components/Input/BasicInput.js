import React, { useState } from 'react';
import { NameField, FlexContainer } from './styles';
import Input from '@mui/material/Input';

export default function BasicInput({ values, title, name, type = null }) {
    const [fieldValue, setFieldValue] = useState(values[name]);

    const handleChange = (e) => {
        setFieldValue(e.target.value);
        values[name] = e.target.value;
    };


    return (
        <FlexContainer>
            <NameField>{title}</NameField>
            <Input name={name} onChange={handleChange} type={type} value={fieldValue} multiline />
        </FlexContainer>
    );
}