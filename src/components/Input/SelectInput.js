import React from 'react';
import { MenuItem } from '@mui/material';
import { ErrorMsg, FlexContainer, NameField, StyledSelect } from './styles';
export default function SelectInput({ values, name, data, value, error }) {

    const handleChange = (e) => {
        values[value] = e.target.value
    }

    return (
        <>
            <FlexContainer>
                <NameField>{name}</NameField>
                <StyledSelect error={error} labelId="label" id="select" name={value} value={values[value]} onChange={handleChange}>
                    {data?.map(tag => {
                        return <MenuItem name={value} key={value} value={tag.id}>{tag.name}</MenuItem>
                    })}
                </StyledSelect>
            </FlexContainer>
            <ErrorMsg>{error ? '***שדה חובה' : null}</ErrorMsg>
        </>
    )
}