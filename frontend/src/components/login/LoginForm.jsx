import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useRollbar } from '@rollbar/react';
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../../hooks/hooks';
import Title from '../title/Title';
import LoginButton from '../buttons/LoginButton';
import { chatContextRoutes } from '../../routes/routes';
import { appRoutes } from '../../routes/routes';

import axios from 'axios';
import { toast } from 'react-toastify';
import loginSchema from '../../validation/loginSchema';

const LoginForm = () => {
    const { t } = useTranslation();
    const rollbar = useRollbar();
    const navigate = useNavigate();
    const { logIn } = useAuthorization();
    const [isInvalidUserData, setInvalidUserData] = useState(false);

    const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema(t('login.requaredField')),
    onSubmit: async (values) => {
        try {
            setInvalidUserData(false);
            await axios
                .post(chatContextRoutes.login(), values)
                .then((response) => {
                    logIn(response.data);
                    navigate(appRoutes.chatPagePath());
                });
        } catch(error) {
            if (error.isAxiosError && error.response.status === 401) {
                setInvalidUserData(true);
            } else {
                toast.error(t('toast.networkError'));
                rollbar.error('Login', error);
            };
        }
    },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <Title title="Войти" />
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
};

export default LoginForm;