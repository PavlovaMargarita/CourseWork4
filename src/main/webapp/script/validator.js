var validateObject = {
    showLabel: function(label, text){
        if (label){
            $(label).text(text);
            $(label).showStandardPhotoAndFiredButton();
        }
    },

    hideLabel: function(label){
        if (label) {
            $(label).hide();
        }
    },

    validateUsername: function (value, inputAttributes) {
        if (value.length < 5) {
            this.showLabel(inputAttributes,"Логин должен содержать не менее 5 знаков");
            return false;
        }
        if (value.length > 20) {
            this.showLabel(inputAttributes,"Логин должен содержать не более 20 знаков");
            return false;
        }
        this.hideLabel(inputAttributes);
        return true;
    },

    validatePassword: function (value, inputAttributes) {
        if (value.length < 6) {
            this.showLabel(inputAttributes, "Пароль должен содержать не менее 6 знаков");
            return false;
        }
        this.hideLabel(inputAttributes);
        return true;
    },

    validateEmail: function(value, inputAttributes){
        var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexp.test(value)){
            this.showLabel(inputAttributes, "Некорректный email");
            return false;
        }
        this.hideLabel(inputAttributes);
        return true;
    },

    validateAccountNumber: function(value, inputAttributes){
        //var regexp = /(([0-9]){3}){1}\/(([0-9]){8}){1}$/;
        var regexp = /((([0-9]){3}){1}\/(19|20)?[0-9]{2}(0?[1-9]|[12][0-9]|3[01]){2}(0?[1-9]|1[012]){2})$/;
        if(regexp.test(value)){

                this.hideLabel(inputAttributes);
                return true;

        }
        this.showLabel(inputAttributes, "Некорректный номер платежного счета");
        return false;
    },

    validateFirstName: function(value, inputAttributes){
        var regexp =  /^[A-Za-zА-Яа-яЁё]+$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректное имя");
        return false;
    },

    validateSecondName: function(value, inputAttributes){
        var regexp =  /^[A-Za-zА-Яа-яЁё -]+$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректная фамилия");
        return false;
    },

    validateDate: function(value, inputAttributes){
        if(value == ""){
            this.showLabel(inputAttributes, "Введите дату");
            return false;
        }
        this.hideLabel(inputAttributes);
        return true;
    },

    validateCity: function(value, inputAttributes){
        var regexp =  /^[A-Za-zА-Яа-яЁё -]+$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректный город");
        return false;
    },

    validateStreet: function(value, inputAttributes){
        var regexp =  /^[A-Za-zА-Яа-яЁё0-9 -]+$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректная улица");
        return false;
    },

    validateHouse: function(value, inputAttributes){
        var regexp =  /^\d+/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректный номер дом");
        return false;
    },

    validateFlat: function(value, inputAttributes){
        var regexp =  /^[0-9]+[A-Za-zА-Яа-я]*$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректный номер помещения");
        return false;
    },

    validateCompanyName: function(value, inputAttributes){
        var regexp =  /^[A-Za-zА-Яа-яЁё0-9 -]+$/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректное название компании");
        return false;
    },

    validateProgramCost: function(value, inputAttributes){
        var regexp =  /^\d+/;
        if(regexp.test(value)){
            this.hideLabel(inputAttributes);
            return true;
        }
        this.showLabel(inputAttributes, "Некорректная стоимость");
        return false;
    },

    validate: function (formSelector) {
        var instance = this;
        var correct = true;

        $(formSelector + ' [validate]').each(function () {
            var fn = instance[$(this).attr('validate')];
            if (typeof fn === "function")
                correct = fn.call(instance, $(this).val(), $(this).attr('errorLabel')) && correct;
        });
        return correct;
    },
    
    validateAndSubmit: function (formSelector) {
        if (validateObject.validate(formSelector)) {
            $(formSelector).submit();
        }
    }
};
