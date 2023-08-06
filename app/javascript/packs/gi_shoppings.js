$(document).on('turbolinks:load', function () {
  $('.class_tags').on('click', function() {
      $(this).find('.choice-btn').toggleClass('check-active');
  });

  $('body').delegate('.show-more-button', 'click', function() {
     var show_other_item = $(this).closest('.choice-row').find('.show-other-item ');
     show_other_item.hasClass("d-none") ? show_other_item.removeClass("d-none") : show_other_item.addClass("d-none");
  });

  $('body').delegate('#searching_account', 'click', function() {
    var character_array = [];

    $('#mode1, #mode2').find('.check-active').each(function() {
        character_array.push($(this).data('val'));
    });

    var weapon_array = [];

    $('#mode3, #mode4').find('.check-active').each(function() {
        weapon_array.push($(this).data('val'));
    });

    var vien_hong = $("#vien_hong_so_luong").val();
    var vien_xanh = $("#vien_xanh_so_luong").val();
    var ar_search = $("#ar_search").val();
    $.ajax
        ({
            type: 'GET',
            url: "show_result_searching",
            dataType: 'script',
            data: {
                character_array: character_array,
                weapon_array: weapon_array,
                vien_hong: vien_hong,
                vien_xanh: vien_xanh,
                ar_search: ar_search
            },
            success: function(data, textStatus, jqXHR){
            },
            error:function(jqXHR, textStatus, errorThrown){
                    console.log("AJAX Error: #{textStatus}")
            }
        })
 });
})