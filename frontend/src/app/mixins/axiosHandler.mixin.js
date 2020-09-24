export default {
    methods: {
        axiosErrorHandler(error, msg401 = null) {
            switch (error.response.status) {
            case 400:
                this.$alertify.error(error.response.data.message[0]);
                break;
            case 401:
                if (!msg401) {
                    break;
                }
                this.$refs.form.reset();
                this.$alertify.error('Invalid Email or Password');
                break;
            default:
                this.$alertify.error(error.response.data.message);
            }
        }
    }
};
