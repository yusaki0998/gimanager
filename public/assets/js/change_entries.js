$(document).ready(function(){
   var table = $("#table_log").DataTable({
      "autoWidth": false,
      columnDefs: [{
            targets: 0,
            width:"10%",
            render: function ( data, type, row ) {
               return type === 'display' && data.length > 10 ?
                   data.substr( 0, 30 ) +'…' :
                   data;
           }
         },
         {
            targets: 1,
            width:"10%",
            render: function ( data, type, row ) {
               return type === 'display' && data.length > 10 ?
                   data.substr( 0, 30 ) +'…' :
                   data;
           }
         },
         {
            targets: 2,
            width:"10%",
            render: function ( data, type, row ) {
               return type === 'display' && data.length > 10 ?
                   data.substr( 0, 30 ) +'…' :
                   data;
           }
         },
         {
            targets: 3,
            width:"10%",
         },
        {
         targets: 4,
         width:"30%",
         render: function ( data, type, row ) {
            return type === 'display' && data.length > 10 ?
                data.substr( 0, 30 ) +'…' :
                data;
        }
      },
      {
         targets: 5,
         width:"30%",
         render: function ( data, type, row ) {
            return type === 'display' && data.length > 10 ?
                data.substr( 0, 20 ) +'…' :
                data;
        }
      }],
       "bPaginate": false,
       "searching": false,
       destroy:true,
  });
   $('#tbl_manager').dataTable({
      initComplete : function() {
         var input = $('.dataTables_filter input').unbind(),
             self = this.api(),
             $searchButton = $('<button class="btn btn-info btnSearchManager">')
                        .text('検索')
                        .append('<i class="uil uil-search text-success"></i>')
                        .click(function() {
                           self.search(input.val()).draw();
                        })
         $('.dataTables_filter').append($searchButton);
     } ,
      "pagingType": "simple_numbers",
      language: {
         paginate: {
            next: '<i class="mdi mdi-chevron-right"></i>',
            previous: '<i class="mdi mdi-chevron-left"></i>'
         },
         search: '',
         searchPlaceholder: ""
      },
      "oLanguage": {
          "sLengthMenu": "表示 _MENU_ 行",
      }
   });

   $('#tbl_draff').dataTable({
      initComplete : function() {
         var input = $('.dataTables_filter input').unbind(),
             self = this.api(),
             $searchButton = $('<button class="btn btn-info btnSearchManager">')
                        .text('検索')
                        .append('<i class="uil uil-search text-success"></i>')
                        .click(function() {
                           self.search(input.val()).draw();
                        })
         $('.dataTables_filter').append($searchButton);
      } ,
      "pagingType": "simple_numbers",
      language: {
         paginate: {
            next: '<i class="mdi mdi-chevron-right"></i>',
            previous: '<i class="mdi mdi-chevron-left"></i>'
         },
         search: '',
         searchPlaceholder: ""
      },
      "oLanguage": {
          "sLengthMenu": "表示 _MENU_ 行",
      }
   });

   $('#tbl_confirmed').dataTable({
      initComplete : function() {
         var input = $('.dataTables_filter input').unbind(),
             self = this.api(),
             $searchButton = $('<button class="btn btn-info btnSearchManager">')
                        .text('検索')
                        .append('<i class="uil uil-search text-success"></i>')
                        .click(function() {
                           self.search(input.val()).draw();
                        })
         $('.dataTables_filter').append($searchButton);
      } ,
      "pagingType": "simple_numbers",
      language: {
         paginate: {
            next: '<i class="mdi mdi-chevron-right"></i>',
            previous: '<i class="mdi mdi-chevron-left"></i>'
         },
         search: '',
         searchPlaceholder: ""
      },
      "oLanguage": {
          "sLengthMenu": "表示 _MENU_ 行",
      }
   });
   $('.tbl_log_admin').dataTable({
      "searching": false,
      "scrollX": false,
      "autoWidth" : false,
      "pagingType": "simple_numbers",
      "bPaginate": false,
      columnDefs: [
               { targets: 0,
                  width: '7%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 1,
                  width: '7%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 2,
                  width: '10%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 3,
                  width: '15%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 4,
                  width: '10%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 5,
                  width: '6%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 10 ) +'…' :
                         data;
                 }
               },
               { targets: 6,
                  width: '10%',
               },
               { targets: 7,
                  width: '20%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 20 ) +'…' :
                         data;
                 }
               },
               { targets: 8,
                  width: '20%',
                  render: function ( data, type, row ) {
                     return type === 'display' && data.length > 10 ?
                         data.substr( 0, 7 ) +'…' :
                         data;
                 }
               }
     ],
     destroy:true
   });
     $('.tbl_depart').dataTable({
        stateSave: true,
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




