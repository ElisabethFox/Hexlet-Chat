import Form from 'react-bootstrap/Form';
import React, {useContext, useState} from "react";
import signupSchema from "../../../validation/signupShema";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import Title from "../../title/Title";
import LoginButton from '../../buttons/login-button/LoginButton'
import { useAuthorization } from '../../../hooks/hooks';

const SignupForm = () => {
        const { logIn } = useAuthorization();
        const navigate = useNavigate();
        const [isInvalid, setValid] = useState(false);
    
        const formik = useFormik({
        initialValues: { name: "", password: "", passwordConfirmation: "" },
        signupSchema,
        onSubmit: async (values) => {
            const { name, password } = values;
            try {
                setValid(false);
                await axios
                    .post('/api/v1/signup', { username: name, password: password })
                    .then((response) => {
                        logIn(response.data);
                        navigate('/');
                    });
            } catch {
                setValid(true);
                console.log('error');
            }
        },
        });
    
        return (
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <Title title="Регистрация"/>
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
                            Имя пользователя
                        </Form.Label>
                        <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                               tooltip={isInvalid}>
                            Неверные имя пользователя или пароль
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-floating mb-3">
                        <Form.Control
                            id="password"
                            type="text"
                            name="password"
                            className="form-control"
                            placeholder="Пароль"
                            autoComplete="password"
                            onChange={formik.handleChange}
                            isInvalid={isInvalid}
                            required
                        />
                        <Form.Label htmlFor="password" className="form-label">
                            Пароль
                        </Form.Label>
                        <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                               tooltip={isInvalid}>
                            От 3 до 20 символов
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-floating mb-4">
                        <Form.Control
                            id="passwordConfirmation"
                            type="password"
                            name="passwordConfirmation"
                            className="form-control"
                            placeholder="Подтвердите пароль"
                            autoComplete="passwordConfirmation"
                            onChange={formik.handleChange}
                            isInvalid={isInvalid}
                            required
                        />
                        <Form.Label htmlFor="password" className="form-label">
                            Не менее 6 символов
                        </Form.Label>
                        <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                               tooltip={isInvalid}>
                            Пароли должны сов
                        </Form.Control.Feedback>
                    </div>
                    <LoginButton title="Зарегистрироваться" />
                </Form>
    );
}
 
export default SignupForm;