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

    formatMoney = function(){
        var valor = $('#valor-unitario').val().trim();
        if(valor != "" && valor != null){
            valor = parseFloat(valor);
            var novoValor = 'R$' + valor.toFixed(2).replace('.', ',');
            $('#valor-unitario').val(novoValor);
        }
    }
   

    $(document).ready(function () {
       masks();
       setTimeout(function(){
            formatMoney();
       }, 1000)
    });

})($, PATH, Helpers);