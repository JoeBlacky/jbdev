var app = {
    init : function() {
        this.timerCountdown();
    },
    timerCountdown : function() {
        var launchTime = new Date(2015, 11, 29, 23, 59, 00, 00);

        $('#timer').countdown({timestamp : launchTime});
    },
    formRequest : function(form) {
        var url = "/forms.php";

        form.addClass('loading');

        $.ajax({
            type: 'POST',
            url: url,
            data: form.serialize(),
            success: function(data) {
                form.removeClass('loading');
            },
            error: function(xhr, status, error) {
                form.removeClass('loading');
            }
        });
    },
    validateForm : function(form) {
        var emailField = form.find($('input[name="email"]'));
        var emailValid = emailField.val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if (emailValid) {
            app.formRequest(form);
            emailField.val('');
        }
    }
}
jQuery(function($){
    app.init();
    $('input[type="submit"]').click(function(e){
        var form = $(this).closest('form');

        app.validateForm(form);
        e.preventDefault();
    });
    $(window).load(function(){
        $('body').addClass('animate');
    });
});