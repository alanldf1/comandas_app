/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function ($, PATH, Helpers) {

    masks = function(){
        Helpers.phoneMask($('#telefone'));
        Helpers.cpfMask($('#cpf'));
    }
   

    $(document).ready(function () {
       masks();
    });

})($, PATH, Helpers);