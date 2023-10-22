/**
 *
 * Script com funções utilizadas
 *
 * @author Emprezaz.com
 *
 **/
(function($, Helpers) {

    var searchTable = function() {

        $('input[name="search"]').keyup(function() {

            var search = $(this).val().toLowerCase();

            $('table tbody tr').hide();

            if (search == '') {
                $('table tbody tr').show();
                return;
            }

            $($('table tbody td')).each(function() {

                if ($(this).html() != '') {
                    if ($(this).html().toLowerCase().indexOf(search) != -1) {
                        $(this).parent().show();
                    } else if ($(this).html().indexOf(search) != -1) {
                        $(this).parent().show();
                    }
                }

            });

        })

    }

    var getPage = function() {

        var split = window.location.href.split('/');
        var last = split.length - 1;
        var page = split[last];

        if (isNaN(page)) {
            return page;
        }

        return split[last - 2] + '/' + split[last - 1];

    };

    var datepicker = function(input) {

        input.daterangepicker({
            singleDatePicker: true,
            locale: {
                format: 'DD/MM/YYYY',
            },
            minYear: 1900,
        });

    };

    var phoneMask = function (phone) {
		var phone = phone || $('#phone');
		var mask = '(00) 00000-0000';

		phone.mask(mask);
		phone.on('keyup', function () {

			var number = $(this).val()[5];

			if (number != 9) {
				phone.mask('(00) 0000-0000');
			} else {
				phone.mask(mask);
			}

		});

	};


    var dateMask = function(date) {
        var date = date || $('#birthdate');
        var mask = '00/00/0000';
        date.mask(mask);
    };

    var timeMask = function(time) {
        var time = time || $('.time');
        var mask = '000:00';
        time.mask(mask);
    };

    var cpfMask = function(cpf) {
        var cpf = cpf || $('#cpf');
        var mask = '000.000.000-00';
        cpf.mask(mask);
    };

    var loadCep = function(cep) {

        resetAddress();
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            dataType: 'JSON',

            complete: function(response) {
                if (response.status === 200) {

                    addAddress(response.responseJSON);

                }
            }
        });

    };

    var loadShippingCep = function(cep) {

        resetShippingAddress();
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            dataType: 'JSON',

            complete: function(response) {
                if (response.status === 200) {

                    addShippingAddress(response.responseJSON);

                }
            }
        });

    };

    var cnpjMask = function(cnpj) {

        var cnpj = cnpj || $('#cnpj');
        var mask = '00.000.000/0000-00';
        cnpj.mask(mask);

    };

    var birthDate = function(birthdate){
        birthdate.mask('00/00/0000', {
            translation: {
                '0': { pattern: /[0-9]/ },
            },
            onKeyPress: function(date, e, field, options) {
                var today = new Date();
                var currentDay = today.getDate();
                var currentMonth = today.getMonth() + 1;
                var currentYear = today.getFullYear();
                
                if(currentDay < 10){
                    currentDay = '0' + currentDay;
                }

                if(currentMonth < 10){
                    currentMonth = '0' + currentMonth;
                }
                
                var inputDate = $(field).val();
                var inputDay = parseInt(inputDate.substring(0, 2), 10);
                var inputMonth = parseInt(inputDate.substring(3, 5), 10);
                var inputYear = parseInt(inputDate.substring(6, 10), 10);
              

                if (inputDay > 31) {
                    inputDay = 31;
                    $(field).val(inputDay);
                }
                if(inputDay < 10){
                    inputDay = '0' + inputDay;
                }
                
                if (inputMonth > 12) {
                    inputMonth = 12;
                    $(field).val(inputDay + '/' + inputMonth);
                }
                if(inputMonth < 10){
                    inputMonth = '0' + inputMonth;
                }
                if (inputYear > currentYear) {
                    inputYear = currentYear;
                    $(field).val(inputDay + '/' + inputMonth + '/' + inputYear);
                }
                if(inputYear.toString().length == 4){
                    
                    if(inputMonth >= currentMonth){
                        inputMonth = currentMonth;
                        if(inputDay > currentDay){
                            inputDay = currentDay;
                        }    
                        $(field).val(inputDay + '/' + inputMonth + '/' + inputYear);
                    }
                
                }
            }
          });
    }

    var cpfcnpjMask = function(documentUser) {

        var documentUser = documentUser || $('#accountdocument');
        var mask = '000.000.000-000';
        documentUser.mask(mask);

        documentUser.on('keyup', function() {

            var number = $(this).val().length;

            if (number > 14) {
                documentUser.mask('00.000.000/0000-00');
            } else {
                documentUser.mask(mask);
            }

        });
    };

    var cepMask = function(cep) {

        var cep = cep || $('#cep');
        var mask = '00000-000';
        cep.mask(mask);

    };

    var creditMask = function(credit) {

        var credit = credit || $('#card-number');
        var mask = '0000 0000 0000 0000';
        credit.mask(mask);

    };

    var rgMask = function(rg) {

        var rg = rg || $('#rg');
        var mask = '0.000.0000';
        rg.mask(mask);

    };

    var numberMask = function(number) {

        var number = number || $('#number');
        var mask = '000000';
        number.mask(mask);

    };

    var heightMask = function(height) {

        var height = height || $('#height');
        var mask = '0.00 m';
        height.mask(mask);

    };

    var weightMask = function(weight) {

        var weight = weight || $('#weight');
        var mask = '00 Kg';
        weight.mask(mask);

    };

    var addAddress = function(address) {

        if (address.erro) {

            return;

        }

        $('input[name="uf"]').prop("value", address.uf);
        $('input[name="city"]').prop("value", address.localidade);
        $('input[name="neighborhood"]').prop("value", address.bairro);
        $('input[name="street"]').prop("value", address.logradouro);

    };

    var addShippingAddress = function(address) {

        if (address.erro) {

            return;

        }

        $('.shipping-uf').prop("value", address.uf);
        $('.shipping-city').prop("value", address.localidade);
        $('.shipping-neighborhood').prop("value", address.bairro);
        $('.shipping-street').prop("value", address.logradouro);

    };

    var moneyMask = function(value) {

        value.maskMoney({ prefix: "R$", decimal: ",", thousands: ".", allowZero: true });
    }

    var percentageMask = function (discount) {
		discount.maskMoney({
			prefix: '',
			suffix: '%',
			thousands: '',
			decimal: ',',
			precision: 0,
			allowZero: true,
			allowNegative: false
		});
        
        discount.on('keyup', function() {
            var valor = $(this).val();
            valor = valor.replace(/%/g, "");
            if (valor > 100) {
            $(this).val("100%");
            }
        });
	};

    var resetAddress = function() {

        $('.address-input').val('');

    };

    var resetShippingAddress = function() {

        $('.shipping-address-input').val('');

    };

    var isValidEmailAddress = function(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    var isValidPhone = function(Phone) {

        var pattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return pattern.test(Phone);

    }

    var isValidCPF = function(cpf) {

        var pattern = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;
        return pattern.test(cpf);

    }

    var CPFValidator = function(cpf) {

        if (cpf) {

            CPFValue = cpf;

            $return = true;

            var invalidos = [
                '111.111.111-11',
                '222.222.222-22',
                '333.333.333-33',
                '444.444.444-44',
                '555.555.555-55',
                '666.666.666-66',
                '777.777.777-77',
                '888.888.888-88',
                '999.999.999-99',
                '000.000.000-00'
            ];
            for (i = 0; i < invalidos.length; i++) {

                if (invalidos[i] == CPFValue) {

                    $return = false;

                }

            }

            CPFValue = CPFValue.replace("-", "");
            CPFValue = CPFValue.replace(/\./g, "");

            add = 0;

            for (i = 0; i < 9; i++) {

                add += parseInt(CPFValue.charAt(i), 10) * (10 - i);

            }

            rev = 11 - (add % 11);

            if (rev == 10 || rev == 11) {

                rev = 0;

            }

            if (rev != parseInt(CPFValue.charAt(9), 10)) {

                $return = false;

            }

            add = 0;

            for (i = 0; i < 10; i++) {

                add += parseInt(CPFValue.charAt(i), 10) * (11 - i);

            }

            rev = 11 - (add % 11);

            if (rev == 10 || rev == 11) {

                rev = 0;

            }
            if (rev != parseInt(CPFValue.charAt(10), 10)) {

                $return = false;

            }

            return $return;

        } else {

            return false;

        }

    };

    var ValidateCPNJ = function(cnpj) {

        CNPJValue = cnpj;

        $return = true;

        var invalidos = [
            '00.000.000/0000-00',
            '11.111.111/1111-11',
            '22.222.222/2222-22',
            '33.333.333/3333-33',
            '44.444.444/4444-44',
            '55.555.555/5555-55',
            '66.666.666/6666-66',
            '77.777.777/7777-77',
            '88.888.888/8888-88',
            '99.999.999/9999-99'
        ];

        for (i = 0; i < invalidos.length; i++) {

            if (invalidos[i] == CNPJValue) {

                $return = false;

            }

        }

        CNPJValue = CNPJValue.replace("-", "");
        CNPJValue = CNPJValue.replace(/\./g, "");
        CNPJValue = CNPJValue.replace(/\//g, "");


        // Valida DVs
        tamanho = CNPJValue.length - 2
        numeros = CNPJValue.substring(0, tamanho);
        digitos = CNPJValue.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = CNPJValue.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    };

    var isValidCNPJ = function(cnpj) {

        // 00.000.000/0000-00

        var pattern = /^([0-9]){2}\.([0-9]){3}\.([0-9]){3}\/([0-9]){4}\-([0-9]){2}$/;
        return pattern.test(cnpj);

    };

    var numberOfChilds = function(numberofchildren) {

        var numberofchildren = numberofchildren || $('#numberofchildren');
        var mask = '000';
        numberofchildren.mask(mask);

    }

    var ageOfChilds = function(ageofchildren) {

        var ageofchildren = ageofchildren || $('#ageofchildren');
        var points = points || $('#points');
        var mask = '000';
        ageofchildren.mask(mask);

    }



    Helpers.getPage = getPage;
    Helpers.datepicker = datepicker;
    Helpers.phoneMask = phoneMask;
    Helpers.dateMask = dateMask;
    Helpers.birthDate = birthDate;
    Helpers.timeMask = timeMask;
    Helpers.numberMask = numberMask;
    Helpers.cnpjMask = cnpjMask;
    Helpers.cpfMask = cpfMask;
    Helpers.cpfcnpjMask = cpfcnpjMask;
    Helpers.cepMask = cepMask;
    Helpers.loadCep = loadCep;
    Helpers.loadShippingCep = loadShippingCep;
    Helpers.moneyMask = moneyMask;
    Helpers.percentageMask = percentageMask;
    Helpers.rgMask = rgMask;
    Helpers.heightMask = heightMask;
    Helpers.weightMask = weightMask;
    Helpers.searchTable = searchTable;
    Helpers.isValidEmailAddress = isValidEmailAddress;
    Helpers.isValidCPF = isValidCPF;
    Helpers.isValidPhone = isValidPhone;
    Helpers.CPFValidator = CPFValidator;
    Helpers.isValidCNPJ = isValidCNPJ;
    Helpers.ValidateCPNJ = ValidateCPNJ;
    Helpers.numberOfChilds = numberOfChilds;
    Helpers.ageOfChilds = ageOfChilds;
    Helpers.creditMask = creditMask;

})($, Helpers);