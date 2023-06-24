import Form from 'react-bootstrap/Form';
import React, {useContext, useState} from "react";
import logInSchema from "../../../validation/logInShema";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import UserDataContext from "../../../context/UserDataContext";
import Title from "../../title/Title";
import LoginButton from '../../buttons/login-button/LoginButton'
import './style.css';

const LoginForm = () => {
    const { logIn } = useContext(UserDataContext);
    const navigate = useNavigate();
    const [isInvalid, setValid] = useState(false);

    const formik = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: logInSchema,
    onSubmit: async (values) => {
        const { name, password } = values;
        try {
            setValid(false);
            await axios
                .post('/api/v1/login', { username: name, password: password })
                .then((response) => {
                    logIn(response.data);
                    navigate('/');
                });
        } catch {
            setValid(true);
            console.log('Неверные имя пользователя или пароль')
        }
    },
    });

    return (
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <Title title="Войти"/>
                <div className="form-floating mb-3">
                    <Form.Control
                        id="name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        isInvalid={isInvalid}
                        required
                    />
                    <Form.Label htmlFor="name" className="form-label">
                        Ваш ник
                    </Form.Label>
                </div>
                <div className="form-floating mb-4">
                    <Form.Control
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Ваш пароль"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        isInvalid={isInvalid}
                        required
                    />
                    <Form.Label htmlFor="password" className="form-label">
                        Пароль
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                           tooltip={isInvalid}>
                        Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                </div>
                <LoginButton title="Войти" />
            </Form>
    );
}

export default LoginForm;
