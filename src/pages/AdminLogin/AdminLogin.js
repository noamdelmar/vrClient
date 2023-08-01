import React, { useState } from 'react';
import { Container, WhiteContainer, Title } from './styles'
import { ErrorMsg } from '../../components/Input/styles';
import BasicInput from '../../components/Input/BasicInput';
import { SaveButton } from '../../components/CreatePopup/popup/styles';
import httpCommon from '../../services/http-common';
import { Navigate } from 'react-router-dom';

export default function AdminLogin() {
    const [formErrors, setFormErrors] = useState({});
    const [navigate, setNavigate] = useState(false);
    const values = {};

    //VALIDATE FORM BEFORE SUBMIT
    const validateForm = () => {
        let errors = {};

        // Perform validation checks for each field
        if (!values.username) {
            errors.username = true;
        }

        if (!values.password) {
            errors.password = true;
        }

        setFormErrors(errors)

        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async () => {
        const data = {
            username: values['username'],
            password: values['password']
        }
        console.log(data);
        const res = await httpCommon.post('auth/auth', data);
        console.log(res.data['found']);
        if (res.data['found']) {
            localStorage.setItem('user', JSON.stringify(data));
            setNavigate(true)
        } else {
            console.log('sdl');
            setFormErrors({ incorrect: true })
        }
    }


    return (
        <Container>
            <WhiteContainer>
                <Title>כניסת מנהל מערכת</Title>
                <BasicInput values={values} title='שם משתמש' name={'username'} login={true} error={formErrors.username} />
                <BasicInput values={values} title='סיסמה' name={'password'} login={true} type={'password'} error={formErrors.password} />
                <SaveButton styles={{ marginTop: '4rem' }} onClick={() => {
                    if (validateForm()) {
                        handleSubmit()
                    }
                }}>פרסם</SaveButton>
                <ErrorMsg styles={{ textAlign: 'center', padding: '0' }}>{formErrors.incorrect ? 'שם משתמש או סיסמה לא נכונים' : null}</ErrorMsg>
            </WhiteContainer>
            {navigate ? <Navigate to={'/wp-admin/admin'} replace={true} /> : null}
        </Container>
    )
}