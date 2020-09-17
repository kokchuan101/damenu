export default {
    methods: {
        required(field) {
            return (v) => !!v || `${field} is required`;
        },
        email() {
            return v => /.+@.+/.test(v) || 'Email must be valid';
        },
        max(val, field) {
            return v => (v && v.length <= val) || `${field} must be less than ${val} characters`;
        },
        min(val, field) {
            return v => (v && v.length >= val) || `${field} must be more than ${val} character(s)`;
        },
        numeric(field) {
            return v => !isNaN(v) || `${field} must be numeric`;
        }
    }
};
