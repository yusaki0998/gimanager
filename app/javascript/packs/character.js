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