function VacancyValidator(){
}
VacancyValidator.prototype = validateObject;
VacancyValidator.prototype.validateVacancyDescription = function(value, inputAttributes){
    if(value && value.trim()){
        this.hideLabel(inputAttributes);
        return true;
    }
    this.showLabel(inputAttributes, "Поле не заполнено");
    return false;
};
