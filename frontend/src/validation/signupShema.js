import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3)
        .max(20)
        .trim()
        .required('Обязательное поле'),
    password: Yup
        .string()
        .min(6)
        .trim()
        .required('Обязательное поле'),
    passwordConfirmation: Yup
});

export default signupSchema;
