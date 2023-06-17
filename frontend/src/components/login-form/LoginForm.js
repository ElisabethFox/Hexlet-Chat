import { Formik, Form, Field } from 'formik';
import Title from "../title/Title";
import Button from "../buttton/Button";
import './style.css';

const LoginForm = () => {
    return ( 
        <Formik initialValues={{ name: "", password: "" }}
                onSubmit={({ setSubmitting }) => {
                    console.log("Form is validated! Submitting the form...");
                    setSubmitting(false);
                }}
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
                                    autocomplete="username"
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
                                    autocomplete="current-password"
                                    required
                                />
                                <label htmlFor="password" className="form-label">Пароль</label>
                            </div>
                            <Button title="Войти" />
                        </Form>
            )}
        </Formik>
    );
}
 
export default LoginForm;