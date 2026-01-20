// src/utils/loginRules.js

const loginRules = [
    // Username: required
    {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username is required.'
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
