import * as Yup from 'yup';

const channelNameShema = Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .min(3, 'мин 3 симв')
        .max(20, 'макс 20 симв')
        .required('Обязательное поле')
        // .notOneOf([]),
});

export default channelNameShema;