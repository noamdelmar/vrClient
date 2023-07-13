import React, { useState, useEffect } from 'react';
import { Title } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function CreatePopup({ name, game, submit }) {
    const [tags, setTags] = useState();
    const values = game ? game : {};


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
            <BasicInput values={values} title='שם' name={'name'} />
            <BasicInput values={values} title='תיאור' name={'description'} />
            <BasicInput values={values} title='זמן משוער' name={'estimated_time'} type='number' />
            <FileInput values={values} name='תמונה' value={'image'} />
            <SelectInput values={values} data={tags} value={'tagsId'} name='קטגוריה' />
            <div onClick={() => submit(values)}>submit</div>
        </>
    )
}