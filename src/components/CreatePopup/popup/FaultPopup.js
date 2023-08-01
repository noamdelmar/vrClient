import React, { useState, useEffect } from 'react';
import { Title, SaveButton } from './styles';
import BasicInput from '../../Input/BasicInput';
import FileInput from '../../Input/FileInput';
import SelectInput from '../../Input/SelectInput';
import httpCommon from '../../../services/http-common';

export default function FaultPopup({ name, submit, existingFault }) {
    const [faultType, setFaultType] = useState();
    const values = existingFault ? existingFault : {};
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        //GET ALL THE FAULT TYPE
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

        if (!values.solution) {
            errors.solution = true;
        }

        if (!values.type) {
            errors.type = true;
        }
        setFormErrors(errors)

        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    }

    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} title='שם' name='name' error={formErrors.name} />
            <BasicInput values={values} title='תיאור' name='description' error={formErrors.description} />
            <BasicInput values={values} title='פתרון' name='solution' error={formErrors.solution} />
            <FileInput values={values} name='תמונה' value='image' />
            <SelectInput values={values} name='קטגוריה' data={faultType} value='type' error={formErrors.type} />
            <SaveButton onClick={() => {
                if (validateForm()) {
                    submit(values);
                }
            }}>שמור</SaveButton>
        </>
    )
}