import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';

export default function TypePopup({ name, submit, existingType }) {
    const values = existingType ? existingType : {};

    console.log(existingType);

    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} title='שם' name='name' />
            <BasicInput values={values} title='תיאור' name='description' />
            <div onClick={() => submit(values)}>submit</div>
        </>
    )
}