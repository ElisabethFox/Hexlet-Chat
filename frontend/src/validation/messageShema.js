import * as Yup from "yup";

const messageShema = Yup.object().shape({
    text: Yup
        .string()
        .trim()
        .required('Обязательное поле')
});

export default messageShema;