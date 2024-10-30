export const useAccountValidation = () => {
  const validateEmail = (email) => {
    const forbiddenCharactersPattern = /[^a-zA-Z0-9@._-]/;
    if (forbiddenCharactersPattern.test(email)) return 'Email contains forbidden characters.';
    if (!email.includes('@')) return 'Email must contain an "@" symbol.';
    const [localPart, domain] = email.split('@');
    if (!localPart) return 'Email must have a local part before the "@" symbol.';
    if (!domain) return 'Email is missing the domain part after the "@" symbol.';
    if (!domain.includes('.') || domain.endsWith('.') || domain.split('.').length < 2) {
      return 'Domain must include a valid TLD (e.g., .com, .net).';
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Email is not valid.';
  };

  const validateSignInPassword = (password) => {
    return password ? '' : 'Password cannot be empty.';
  };

  const validateSignUpPassword = (password) => {
    if (!password) {
      return 'Password cannot be empty.';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    return '';
  };

  return { validateEmail, validateSignInPassword, validateSignUpPassword };
};
