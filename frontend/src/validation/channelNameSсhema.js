import * as Yup from 'yup';

const channelNameSсhema = (
  channelsNames,
  channelNameLength,
  requaredField,
  uniqueNameError,
) => Yup.object().shape({
  name: Yup
    .string()
    .trim()
    .min(3, channelNameLength)
    .max(20, channelNameLength)
    .required(requaredField)
    .notOneOf(channelsNames, uniqueNameError),
});

export default channelNameSсhema;
