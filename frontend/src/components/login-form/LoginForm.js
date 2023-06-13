import { Formik, Form, Field } from 'formik';
import './style.css';

const LoginForm = () => {
    return ( 
        <Formik initialValues={{ email: "", password: "" }} >
            {() => (
                <div className="container">
                    <div className="form-card">
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                type="email"
                                name="email"
                                className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                type="password"
                                name="password"
                                className="form-control"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}
 
export default LoginForm;