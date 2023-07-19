import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import logInSchema from "../../../validation/logInShema";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import Title from "../../title/Title";
import LoginButton from '../../buttons/LoginButton'
import './style.css';
import { useAuthorization } from '../../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

const LoginForm = () => {
    const { logIn } = useAuthorization();
    const navigate = useNavigate();
    const [isInvalidUserData, setInvalidUserData] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: logInSchema,
    onSubmit: async (values) => {
        try {
            setInvalidUserData(false);
            await axios
                .post('/api/v1/login', values)
                .then((response) => {
                    logIn(response.data);
                    navigate('/');
                });
        } catch(error) {
            if (error.isAxiosError && error.response.status === 401) {
                setInvalidUserData(true);
            } else {
                toast.error(t('toast.networkError'));
            };
        }
    },
    });

    return (
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <Title title="Войти"/>
                <div className="form-floating mb-3">
                    <Form.Control
                        id="username"
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t('login.userName')}
                        autoComplete="username"
                        onChange={formik.handleChange}
                        isInvalid={isInvalidUserData}
                        required
                    />
                    <Form.Label htmlFor="username" className="form-label">
                        {t('login.userName')}
                    </Form.Label>
                </div>
                <div className="form-floating mb-4">
                    <Form.Control
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('login.password')}
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        isInvalid={isInvalidUserData}
                        required
                    />
                    <Form.Label htmlFor="password" className="form-label">
                        {t('login.password')}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                           tooltip={isInvalidUserData}>
                        {t('login.loginError')}
                    </Form.Control.Feedback>
                </div>
                <LoginButton title={t('login.loginTitle')} />
            </Form>
    );
}

export default LoginForm;