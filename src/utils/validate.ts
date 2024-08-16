export const validateUsername = (value: any) => {
  if (!value) return
  if (value.length > 11) {
    return 'Input is too long (max 11 characters)';
  }
};

export const validatePassword = (value: any) => {
  if (!value) return
  if (value.length < 6) {
    return 'Input is too long (min 6 characters)';
  }
  if (value.length > 16) {
    return 'Input is too long (max 16 characters)';
  }
};

export const validateEmail = (value: string) => {
  if (!value) return
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Invalid email format';
  }
};