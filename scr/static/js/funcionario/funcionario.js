/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function ($, PATH, Helpers) {

    masks = function(){
        Helpers.numberMask($('#matriculation'));
        Helpers.phoneMask($('#phone'));
        Helpers.cpfMask($('#cpf'));
    }
   

    $(document).ready(function () {
       masks();
    });

})($, PATH, Helpers);