import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3, 'мин 3 симв')
        .max(20, 'макс 20 симв')
        .trim()
        .required('Обязательное поле')
        .typeError('Это обязательное поле'),
    password: Yup
        .string()
        .min(6)
        .trim()
        .required('Обязательное поле')
        .typeError('Это обязательное поле'),
    passwordConfirmation: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .typeError('Это обязательное поле'),
});

export default signupSchema;
