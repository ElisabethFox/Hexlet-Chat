import * as Yup from 'yup';

const loginSchema = (requaredField) => Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .required(requaredField),
    password: Yup
        .string()
        .trim()
        .required(requaredField),
});

export default loginSchema;
