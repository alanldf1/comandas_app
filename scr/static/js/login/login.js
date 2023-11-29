/**
*
* Script do login de admin
*
* @author Emprezaz
*
**/
(function($, PATH, Helpers){

    // Validação dos campos
    var validateFields = async () => {

        var email = $('input[name="email"]').val().trim();
        var password = $('input[name="password"]').val().trim();

        if(email == ''){
            $("#loader-overlay").fadeOut();
            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Preencha o nome de usuário',
            });
            return false;

        }

        if(password == ''){
            $("#loader-overlay").fadeOut();
            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Preencha sua senha'
            });
            return false;

        }

        var checkEmail = await checkEmailInDatabase(email);
        if (!checkEmail) {
            $("#loader-overlay").fadeOut();
            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Email ou senha incorretos',
            });
            return false;

        }
        var checkPassword = await checkPasswordInDatabase(email, password);

        if(!checkPassword){
            $("#loader-overlay").fadeOut();
            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Email ou senha incorretos',
            });
            return false;

        }

        return true;

    }

    // Função parar executar o login
    var login = async () => {
        var email = $('input[name="email"]').val();
        $('#loader-overlay').fadeIn(300, async function(){
            if(await validateFields()){

                $.ajax({
                    url: PATH + '/saveLogin',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        email: email,
                    },
                    complete: function(response){

                        if(response.responseJSON.result){
                            $("#loader-overlay").fadeOut();
                            window.location.replace(PATH + '/dashboard');
                            return true;

                        } else{
                            $("#loader-overlay").fadeOut();
                            swal({
                                type: 'error',
                                title: 'Erro - Login',
                                text: 'Algo deu errado, tente novamente mais tarde.'
                            }).then(function() {
                                // window.location.reload();
                                return false;
                            });

                        }

                    }
                });

            }
        })

    }

    var revealPass = function(){
        $('body').on('click', '.reveal-pass', function () {
			let icon = $(this).children();

			if (icon.hasClass('fa-eye')) {

				icon.addClass('fa-eye-slash');
				icon.removeClass('fa-eye');

				$('#password').prop('type', 'text');
			} else {
				icon.removeClass('fa-eye-slash');
				icon.addClass('fa-eye');
				$('#password').prop('type', 'password');

			}
		})
    }

	$( document ).ready(function(){
        revealPass();
        // $(document).on('keydown', function (event) {
        //     if (event.keyCode === 13) {
        //         event.preventDefault();
        //         login();
        //     }
        // });
        // $('body').on('click', '.btn-login', function () {
        //     login();
        // })
    });

})($, PATH, Helpers);