import * as Yup from "yup";

const channelNameShema = (channelsNames, lengthError, requiredError) => Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .min(3, lengthError)
        .max(20, lengthError)
        .required(requiredError)
        .notOneOf(channelsNames),
});

export default channelNameShema;