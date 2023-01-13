$(document).on('turbolinks:load', function () {

    $('body').delegate('#add_account', 'click', function(){
        updatevalueWork();
        return true; // return false to cancel form action
    });
})
function updatevalueWork(){	
	var listOption = $('.character-select');
    var result = $('.character-select').next().find('.select2-selection__choice__display');
    var field = $('.character-select').closest("div").find('.hidden-list-characters');
    if(result.length>0){
        for (let ind = 0; ind < result.length; ind++) {
            const elem = result[ind];
            var arrStrId = elem.id.split('-');
            if(ind ==0){
                field.value =  arrStrId[arrStrId.length-1];
            }
            else{
                field.value = field.value + ',' +arrStrId[arrStrId.length-1];
            }			
        }			
    } else {
        field.value = "";
    }		
    $("#gi_account_list_character").val(field.value);
    var result_1 = $('.weapon-select').next().find('.select2-selection__choice__display');
    var field_1 = $('.weapon-select').closest("div").find('.hidden-list-weapons');
    if(result_1.length>0){
        for (let ind = 0; ind < result_1.length; ind++) {
            const elem_1 = result_1[ind];
            var arrStrId = elem_1.id.split('-');
            if(ind ==0){
                field_1.value =  arrStrId[arrStrId.length-1];
            }
            else{
                field_1.value = field_1.value + ',' +arrStrId[arrStrId.length-1];
            }			
        }			
    } else {
        field_1.value = "";
    }		
    $("#gi_account_list_weapon").val(field_1.value);

}



function loadSelected(){		
	var listOption = document.querySelectorAll('.character-select');

		const element = listOption;
		var field = element.parentElement.querySelector('.hidden-list-characters');
		var values = field.value;
		if(values){
			$.each(values.split(","), function(i,e){
				element.querySelectorAll("option[value='" + e + "']").prop("selected", true);
			});
		}
		

}