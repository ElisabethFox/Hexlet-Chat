import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRollbar } from "@rollbar/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthorization } from "../../hooks/hooks";
import Title from "../title/Title";
import LoginButton from "../buttons/LoginButton";

import axios from "axios";
import { toast } from "react-toastify";
import signupSchema from "../../validation/signupShema";

const SignupForm = () => {
    const { t } = useTranslation();
    const rollbar = useRollbar();
    const navigate = useNavigate();
    const { logIn } = useAuthorization();
    const [isInvalidAuth, setInvalidAuth] = useState(false);

    const formik = useFormik({
    initialValues: { username: "", password: "", passwordConfirmation: "" },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
        const { username, password } = values; 
        try {
            setInvalidAuth(false);
            await axios
                    .post('/api/v1/signup', { username, password })
                    .then((response) => {
                        logIn(response.data);
                        navigate('/');
                    });
        } catch(error) {
            if (error.isAxiosError && error.response.status === 409) {
                setInvalidAuth(true);
                return;
            }

            toast.error(t('toast.networkError'));
            rollbar.error('Signup', error);
        }
    },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <Title title="Регистрация"/>
            <div className="form-floating mb-3">
                <Form.Control
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Ваш ник"
                    onChange={(e) => {
                        setInvalidAuth(false);
                        formik.handleChange(e)
                    }}
                    isInvalid={isInvalidAuth || (formik.touched.username && formik.errors.username)}
                    required
                />
                <Form.Label htmlFor="username" className="form-label">
                    Имя пользователя
                </Form.Label>
                <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                        tooltip={isInvalidAuth}>
                    От 3 до 20 символов
                </Form.Control.Feedback>
            </div>
            <div className="form-floating mb-3">
                <Form.Control
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    isInvalid={isInvalidAuth || (formik.touched.password && formik.errors.password)}
                    required
                />
                <Form.Label htmlFor="password" className="form-label">
                    Пароль
                </Form.Label>
                <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                        tooltip={isInvalidAuth}>
                    Не менее 6 символов
                </Form.Control.Feedback>
            </div>
            <div className="form-floating mb-4">
                <Form.Control
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    className="form-control"
                    placeholder="Не менее 6 символов"
                    onChange={formik.handleChange}
                    isInvalid={isInvalidAuth || (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
                    required
                />
                <Form.Label htmlFor="passwordConfirmation" className="form-label">
                    Подтвердите пароль
                </Form.Label>
                <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                        tooltip={isInvalidAuth}>
                    Пароли должны совпадать
                </Form.Control.Feedback>
            </div>
            <LoginButton title="Зарегистрироваться" />
        </Form>
    );
};
 
export default SignupForm;