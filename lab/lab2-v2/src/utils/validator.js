import methods from 'validator'

export default class Validator {
    constructor(rules) {
        this.rules = rules;
        this.initiate();
    }
    initiate() {
        this.isValid = true;
        this.errors = {};
    }


    validate(state) {
        this.initiate();
        this.rules.forEach((rule) => {
            if(this.errors[rule.field])             return;
            const fieldValue = state[rule.field] + '';
            const args = rule.args || [];
            const validationMethod = typeof rule.method === 'string' ? methods[rule.method] : rule.method;
            if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
                this.isValid = false;
                this.errors[rule.field] = rule.message;
            }
        });
        return this.errors;



    }

    // Validate only a single field. Returns the error message string when invalid, or null when valid.
    validateField(fieldName, state) {
        const rulesForField = this.rules.filter(r => r.field === fieldName);
        for (let i = 0; i < rulesForField.length; i++) {
            const rule = rulesForField[i];
            const fieldValue = (state[rule.field] + '');
            const args = rule.args || [];
            const validationMethod = typeof rule.method === 'string' ? methods[rule.method] : rule.method;
            if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
                return rule.message;
            }
        }
        return null;
    }
}