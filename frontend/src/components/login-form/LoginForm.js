import Form from 'react-bootstrap/Form';
import React, {useContext} from "react";
import logInSchema from "../../validation/logInShema";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import UserDataContext from "../../context/UserDataContext";
import Title from "../title/Title";
import LoginButton from '../buttons/login-button/LoginButton'
import './style.css';

const LoginForm = () => {
    const { logIn } = useContext(UserDataContext);
    const navigate = useNavigate();

    const formik = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: logInSchema,
    onSubmit: async (val) => {
        try {
            await axios
                .post('/api/v1/login', { username: '123456678', password: 'admin' })
                .then((response) => {
                    logIn(response);
                    navigate('/');
                });
        } catch {
            console.log('Неверные имя пользователя или пароль')
        }
    },
    })

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
                        required
                    />
                    <Form.Label htmlFor="name" className="form-label">
                        Ваш ник
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback"
                                           tooltip={formik.errors.name && formik.touched.name}>
                        Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
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
                        required
                    />
                    <Form.Label htmlFor="password" className="form-label">
                        Пароль
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback"
                                           tooltip={formik.errors.password && formik.touched.password}>
                        Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                </div>
                <LoginButton title="Войти" />
            </Form>
    );
}

export default LoginForm;
