// validators/contactRules.js
const contactRules = [
    // FIRST NAME: > 3 ký tự
    {
        field: 'firstName',
        method: 'isLength',
        args: [{ min: 3 }],
        validWhen: true,
        message: 'First name must be at least 3 characters'
    },

    // LAST NAME: > 3 ký tự
    {
        field: 'lastName',
        method: 'isLength',
        args: [{ min: 3 }],
        validWhen: true,
        message: 'Last name must be at least 3 characters'
    },

    // PHONE: đúng 10 chữ số
    {
        field: 'phone',
        method: 'isLength',
        args: [{ min: 10, max: 10 }],
        validWhen: true,
        message: 'Phone number must be exactly 10 digits'
    },
    {
        field: 'phone',
        method: 'isNumeric',
        validWhen: true,
        message: 'Phone number must contain only digits'
    },

    // EMAIL: đúng format
    {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Invalid email format'
    },

    // MESSAGE: không rỗng
    {
        field: 'message',
        method: 'isEmpty',
        validWhen: false,
        message: 'Message is required'
    }
]

export default contactRules
