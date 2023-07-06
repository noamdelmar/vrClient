import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function CreatePopup({ name, handleFileUpload, hidePopup }) {
    const [tags, setTags] = useState();
    const values = {};

    const createGame = async (form) => {
        try {
            form['imageId'] = await handleFileUpload(form.imageId)
            console.log(form['imageId']);
            const res = await httpCommon.post('/games/create', form);
            hidePopup()

        } catch (err) {
            console.error('error creating game', err);
        }
    }

    useEffect(() => {
        const getTag = async () => {
            try {
                const res = await httpCommon.get('/tags/get')
                setTags(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        getTag()
    }, [])

    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} name='שם' value='name' />
            <BasicInput values={values} name='תיאור' value='description' />
            <BasicInput values={values} name='זמן משוער' value='estimated_time' type='number' />
            <FileInput values={values} name='תמונה' value='imageId' />
            <SelectInput values={values} data={tags} value='tagsId' name='קטגוריה' />
            <div onClick={() => createGame(values)}>submit</div>
        </>
    )
}