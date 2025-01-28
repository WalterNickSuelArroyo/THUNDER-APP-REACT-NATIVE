const PhoneValidator = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(phone);
}

export default PhoneValidator;