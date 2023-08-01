import React, { useState, useEffect } from 'react';
import { Title, SaveButton } from './styles';
import BasicInput from '../../Input/BasicInput';

export default function TypePopup({ name, submit, existingType }) {
    const values = existingType ? existingType : {};
    const [formErrors, setFormErrors] = useState({});

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

        setFormErrors(errors)

        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    }
    return (
        <>
            <Title>{name}</Title>
            <BasicInput values={values} title='שם' name='name' error={formErrors.name} />
            <BasicInput values={values} title='תיאור' name='description' error={formErrors.description} />
            <SaveButton onClick={() => {
                if (validateForm()) {
                    submit(values);
                }
            }}>שמור</SaveButton>
        </>
    )
}