import * as Yup from 'yup';

const channelNameSсhema = (channelsNames, channelNameLength, requaredField) => Yup.object().shape({
  name: Yup
    .string()
    .trim()
    .min(3, channelNameLength)
    .max(20, channelNameLength)
    .required(requaredField)
    .notOneOf(channelsNames),
});

export default channelNameSсhema;
