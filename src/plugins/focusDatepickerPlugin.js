export default {
    install(app) {
        app.directive('focus-datepicker', {
            mounted(el) {
                const dateInputs = el.querySelectorAll('input[type="datetime-local"]');
                dateInputs.forEach(input => {
                    input.addEventListener('focus', function() {
                        this.showPicker();
                    });
                });
            }
        });
    }
};
