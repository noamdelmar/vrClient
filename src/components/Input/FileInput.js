import React from 'react';
import { FlexContainer, NameField } from './styles';
export default function FileInput({ values, name, value }) {
    const handleFileChange = (e) => {
        values[e.target.name] = e.target.files[0];
    };

    return (
        <FlexContainer>
            <NameField>{name}</NameField>
            <input name={value} type="file" onChange={handleFileChange} />
        </FlexContainer>
    )
}