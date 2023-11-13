/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function ($, PATH, Helpers) {

    masks = function(){
        Helpers.moneyMask($('#valor-unitario'));
    }
   

    $(document).ready(function () {
       masks();
    });

})($, PATH, Helpers);