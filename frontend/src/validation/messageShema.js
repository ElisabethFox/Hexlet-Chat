import * as Yup from "yup";

const messageShema = (requaredField) => Yup.object().shape({
    text: Yup
        .string()
        .trim()
        .required(requaredField)
});

export default messageShema;