import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function FaultPopup({ name, submit, existingFault }) {
    const [faultType, setFaultType] = useState();
    const values = existingFault ? existingFault : {};


    useEffect(() => {
        const getFaultType = async () => {
            try {
                const res = await httpCommon.get('/faultTypes/get')
                setFaultType(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        getFaultType()
    }, [])
    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} title='שם' name='name' />
            <BasicInput values={values} title='תיאור' name='description' />
            <BasicInput values={values} title='פתרון' name='solution' />
            <FileInput values={values} name='תמונה' value='image' />
            <SelectInput values={values} name='קטגוריה' data={faultType} value='type' />
            <div onClick={() => submit(values)}>submit</div>
        </>
    )
}