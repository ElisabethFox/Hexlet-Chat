import { Formik, Form, Field } from 'formik';
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
                <div className="container">
                    <div className="form-card">
                        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                            <div className="form-floating mb-3">
                                <label htmlFor="name" className="form-label">Ваш ник</label>
                                <Field
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Ваш ник"
                                    autocomplete="username"
                                    required
                                />
                            </div>
                            <div className="form-floating mb-4">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <Field
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Ваш пароль"
                                    autocomplete="current-password"
                                    required
                                />
                            </div>
                            <Button title="Войти" />
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}
 
export default LoginForm;