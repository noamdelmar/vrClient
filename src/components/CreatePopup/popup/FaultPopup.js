import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function FaultPopup({ name, handleFileUpload, hidePopup }) {
    const [faultType, setFaultType] = useState();
    const values = {};

    const createFault = async (form) => {
        try {
            form['imageId'] = await handleFileUpload(form.imageId)
            const res = await httpCommon.post('/faults/create', form);
            hidePopup()

        } catch (err) {
            console.error('error creating fault', err);
        }
    }

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
            <BasicInput values={values} name='שם' value='name' />
            <BasicInput values={values} name='תיאור' value='description' />
            <BasicInput values={values} name='פתרון' value='solution' />
            <FileInput values={values} name='תמונה' value='imageId' />
            <SelectInput values={values} name='קטגוריה' data={faultType} value='typeId' />
            <div onClick={() => createFault(values)}>submit</div>
        </>
    )
}