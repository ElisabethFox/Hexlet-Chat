import { Formik, Form, Field } from 'formik';
import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserDataContextProvider from "../../context/Provider";
import UserDataContext from "../../context/UserDataContext";
import Title from "../title/Title";
import LoginButton from '../buttons/login-button/LoginButton'
import './style.css';

const LoginForm = () => {
    const { userData, logIn, logOut } = useContext(UserDataContext);
    console.log(logIn)

    const navigate = useNavigate();

    const handleSubmit = async () => {
        await axios
                .post('/api/v1/login', { username: 'admin', password: 'admin' })
                .then((response) => {
                    logIn(response);
                    navigate('/');
        });
    };

    return (
        <Formik initialValues={{ name: "", password: "" }}
                onSubmit={handleSubmit}
        >
            {() => (
                        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                            <Title title="Войти"/>
                            <div className="form-floating mb-3">
                                <Field
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Ваш ник"
                                    autoComplete="username"
                                    required
                                />
                                <label htmlFor="name" className="form-label">Ваш ник</label>
                            </div>
                            <div className="form-floating mb-4">
                                <Field
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Ваш пароль"
                                    autoComplete="current-password"
                                    required
                                />
                                <label htmlFor="password" className="form-label">Пароль</label>
                            </div>
                            <LoginButton title="Войти" />
                        </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
