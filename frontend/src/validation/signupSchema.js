import * as Yup from 'yup';

const signupSchema = (userNameLength, 
    passwordLength, 
    requaredField, 
    passwordMatching) => Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .min(3, userNameLength)
    .max(20, userNameLength)
    .required(requaredField),
  password: Yup
    .string()
    .trim()
    .min(6, passwordLength)
    .required(requaredField),
  passwordConfirmation: Yup
    .string()
    .oneOf([Yup.ref('password')], passwordMatching),
});

export default signupSchema;
