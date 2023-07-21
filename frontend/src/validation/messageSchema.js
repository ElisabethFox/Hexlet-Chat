import * as Yup from 'yup';

const messageSchema = (requaredField) => Yup.object().shape({
    text: Yup
        .string()
        .trim()
        .required(requaredField)
});

export default messageSchema;