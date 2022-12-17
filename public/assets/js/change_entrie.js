$(document).ready(function(){
   $('.tbl_log_admin').dataTable({
      "scrollY":        '38vh',
      "scrollX": false,
      "searching": false,
      "pagingType": "simple_numbers",
      language: {
         paginate: {
            next: '<i class="mdi mdi-chevron-right"></i>',
            previous: '<i class="mdi mdi-chevron-left"></i>'
         }
      }
   });
     $('.tbl_depart').dataTable({
        "lengthMenu": [5,10,15,20],
        "pagingType": "simple_numbers",
        language: {
            paginate: {
              next: '<i class="mdi mdi-chevron-right"></i>',
              previous: '<i class="mdi mdi-chevron-left"></i>'
            }
        },
        'columnDefs': [
            {
               'targets': 0,
               'checkboxes': {
                  'selectRow': true
               }
            }
         ],
         'select': {
            'style': 'multi'
         },
         'order': [[1, 'asc']]
    });

    // // var DepartPages = tableDepart.fnGetNodes();

    // // $('body').on('click', '.selectAll_depart', function () {
    //     if ($(this).hasClass('allChecked')) {
    //         $('input[type="checkbox"]', DepartPages).prop('checked', false);
    //     } else {
    //         $('input[type="checkbox"]', DepartPages).prop('checked', true);
    //     }
    //     $(this).toggleClass('allChecked');
    // })


    $('.tbl_position').dataTable({
        stateSave: true,
        'destroy': true,
        "lengthMenu": [5,10,15,20],
        "pagingType": "simple_numbers",
        language: {
            paginate: {
              next: '<i class="mdi mdi-chevron-right"></i>',
              previous: '<i class="mdi mdi-chevron-left"></i>'
            }
        },
        'columnDefs': [
            {
               'targets': 0,
               'checkboxes': {
                  'selectRow': true
               }
            }
         ],
         'select': {
            'style': 'multi'
         },
         'order': [[1, 'asc']]
    });

    $('.tbl_group').dataTable({
        stateSave: true,
        'destroy': true,
        "lengthMenu": [5,10,15,20],
        "pagingType": "simple_numbers",
        language: {
            paginate: {
              next: '<i class="mdi mdi-chevron-right"></i>',
              previous: '<i class="mdi mdi-chevron-left"></i>'
            }
        },
        'columnDefs': [
            {
               'targets': 0,
               'checkboxes': {
                  'selectRow': true
               }
            }
         ],
         'select': {
            'style': 'multi'
         },
         'order': [[1, 'asc']]
    });
});




