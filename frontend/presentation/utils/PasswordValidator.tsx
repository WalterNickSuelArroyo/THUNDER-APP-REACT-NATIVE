const PasswordValidator = (password: string): boolean => {
    return password.length >= 6;
}

export default PasswordValidator;