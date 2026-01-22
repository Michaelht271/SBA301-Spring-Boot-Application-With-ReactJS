const loginRules = [
    // Email: required
    {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
    },
    // Email: valid email format
    {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
    },
    // Password: required
    {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
    },
    // Password: min 6 characters
    {
        field: 'password',
        method: 'isLength',
        args: [{ min: 6 }],
        validWhen: true,
        message: 'Password must be at least 6 characters.'
    }
];

export default loginRules;

