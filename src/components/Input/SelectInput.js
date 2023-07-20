import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { FlexContainer, NameField } from './styles';
export default function SelectInput({ values, name, data, value }) {

    const handleChange = (e) => {
        values[value] = e.target.value
        // values[e.target.name] = values[e.target.name] ? values[e.target.name].push(e.target.value) : [e.target.value]
    }

    return (
        <FlexContainer>
            <NameField>{name}</NameField>
            <Select labelId="label" id="select" name={value} value={values[value]} onChange={handleChange}>
                {data?.map(tag => {
                    return <MenuItem name={value} key={value} value={tag.id}>{tag.name}</MenuItem>
                })}
            </Select>
        </FlexContainer>
    )
}