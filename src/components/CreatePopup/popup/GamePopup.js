import React, { useState, useEffect } from 'react';
import { Title, SaveButton } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function CreatePopup({ name, game, submit }) {
    const [tags, setTags] = useState();
    const values = game ? game : {};
    const [formErrors, setFormErrors] = useState({});

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

    //VALIDATE FORM BEFORE SUBMIT
    const validateForm = () => {
        let errors = {};

        // Perform validation checks for each field
        if (!values.name) {
            errors.name = true;
        }

        if (!values.description) {
            errors.description = true;
        }

        if (!values.estimated_time) {
            errors.estimated_time = true;
        }

        if (!values.tagsId) {
            errors.tagsId = true;
        }
        setFormErrors(errors)

        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    }

    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} title='שם' name={'name'} error={formErrors.name} />
            <BasicInput values={values} title='תיאור' name={'description'} error={formErrors.description} />
            <BasicInput values={values} title='זמן משוער' name={'estimated_time'} type='number' error={formErrors.estimated_time} />
            <FileInput values={values} name='תמונה' value={'image'} />
            <SelectInput values={values} data={tags} value={'tagsId'} name='קטגוריה' error={formErrors.tagsId} />
            <SaveButton onClick={() => {
                if (validateForm()) {
                    submit(values);
                }
            }}>פרסם</SaveButton>
        </>
    )
}