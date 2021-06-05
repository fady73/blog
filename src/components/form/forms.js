const emailValidator = (value, message) => {
  const emailExp = /^\S+@\S+\.\S+$/;

  if (!value || emailExp.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(message);
};

export const emailRule = (message) => ({
  validator: (_, value) => emailValidator(value, message),
});
