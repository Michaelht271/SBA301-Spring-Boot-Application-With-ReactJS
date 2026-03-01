/**
 * Customer Data Structure & Default Values based on Java Entity
 */

export const INITIAL_CUSTOMER_STATE = {
    customerID: undefined,
    customerFullName: '',
    telephone: '',
    emailAddress: '',
    customerBirthday: '',
    customerStatus: 1, // 1 for Active, 0 for Inactive
    password: '',
    roles: 'CUSTOMER'
};

export const CUSTOMER_STATUS_OPTIONS = [
    { label: 'Active', value: 1, color: 'green' },
    { label: 'Inactive', value: 0, color: 'red' },
];

export const MAP_CUSTOMER_TO_FORM = (customer) => ({
    customerID: customer.customerID,
    customerFullName: customer.customerFullName,
    telephone: customer.telephone,
    emailAddress: customer.emailAddress,
    customerBirthday: customer.customerBirthday,
    customerStatus: customer.customerStatus,
    roles: customer.roles
});

export const MAP_FORM_TO_CUSTOMER = (values) => ({
    customerID: values.customerID,
    customerFullName: values.customerFullName,
    telephone: values.telephone,
    emailAddress: values.emailAddress,
    customerBirthday: values.customerBirthday,
    customerStatus: values.customerStatus,
    password: values.password,
    roles: values.roles
});
