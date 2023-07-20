import * as Yup from "yup";

const logInSchema = Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .required('Обязательное поле'),
    password: Yup
        .string()
        .trim()
        .required('Обязательное поле'),
});

export default logInSchema;
