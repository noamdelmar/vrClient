import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';

export default function TypePopup({ name, submit }) {
    const values = {};

    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} name='שם' value='name' />
            <BasicInput values={values} name='תיאור' value='description' />
            <div onClick={() => submit(values)}>submit</div>
        </>
    )
}