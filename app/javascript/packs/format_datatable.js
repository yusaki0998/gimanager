
var table;
$(document).on('turbolinks:load', function () {
    formatDataTable();
})

window.formatDataTable = function inItDatatable(){
    $('.dataTables_length').parent().parent().remove();
    $('.dataTables_paginate').parent().remove();
    $('.dataTables_info').parent().remove();
    formatTableUser();
    formatTableDepartment();
    formatTableCharacter();
    formatTableWeapon();
    formatTableAccount();
}

function formatTableUser(){
    var tblUser = document.getElementsByClassName("tbl_user");
    
    if (tblUser.length > 0  ) {
        tblUser = window.$('.tbl_user').DataTable({
            'stateSave': false,
            "processing": false,
            "serverSide": false,
            'destroy': true,
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "6%", "targets": 1 },
            { "width": "9%", "targets": 2 },
            { "width": "9%", "targets": 3 },
            { "width": "10%", "targets": 4 },
            { "width": "20%", "targets": 5 },
            { "width": "10%", "targets": 6 },
            { "width": "9%", "targets": 7 },
            { "width": "8.5%", "targets": 8 },
            { "width": "6%", "targets": 9 },
            { "width": "9%", "targets": 10 }
            ],
            'select': {
            'style': 'multi'
            },
            'order': [1, 'asc'],
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    }
}
function formatTableDepartment(){
    var tbl_depart = document.getElementsByClassName("tbl_depart");
    if (tbl_depart.length > 0) {
        tbl_depart = window.$('.tbl_depart').DataTable({
            'stateSave': false,
            'destroy': true,
            "lengthMenu": [5,10,15,20],
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "6%", "targets": 1 },
            { "width": "30%", "targets": 2 }                
            ],
            'select': {
            'style': 'multi'
            },
            'order': [1, 'asc'],
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    };
    $("#btn_edit_department").click(function() {
        var mydata = [],id;

        $.each(tbl_depart.rows({ 'search': 'applied' }).nodes(), function (i, row) {
            var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
            if (checkBox) 
            {
                id =row.querySelector('.col_checkbox').getAttribute('data-item');
                mydata.push(id);
                return;                
            }   
        });

        if(mydata.length!=1) 
        {return;}
        $.ajax
        ({
            type: 'GET',
            url: "update_department",
            dataType: 'script',
            data: {
                    id: mydata[0]
            },
            success: function(data, textStatus, jqXHR){
            },
            error:function(jqXHR, textStatus, errorThrown){
                    console.log("AJAX Error: #{textStatus}")
            }
        })
    });

    $("#btn_delete_department").click(function() {
        var mydata = [],id;

        $.each(tbl_depart.rows({ 'search': 'applied' }).nodes(), function (i, row) {
            var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
            if (checkBox) 
            {
                id =row.querySelector('.col_checkbox').getAttribute('data-item');
                mydata.push(id);
                       
            }   
        });

        if(mydata.length==0) 
        {return;}
        $.ajax
        ({
            type: 'GET',
            url: "delete_department",
            dataType: 'script',
            data: {
                    data: {ids:mydata},
            },
            success: function(data, textStatus, jqXHR){
                console.log("AJAX OK!")
            },
            error:function(jqXHR, textStatus, errorThrown){
                console.log("AJAX Error: #{textStatus}")
            }
        })
    });
  

    $('a[href="#profile"]').on('click', function(event){
        formatTablePosition();
    });
    
}  

window.formatTablePosition = function (){
    var tbl_position = document.getElementsByClassName("tbl_position");
    if (tbl_position.length > 0) {
        tbl_position = window.$('.tbl_position').DataTable({
            'stateSave': false,
            'destroy': true,
            "lengthMenu": [5,10,15,20],
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "6%", "targets": 1 },
            { "width": "30%", "targets": 2 }                
            ],
            'select': {
            'style': 'multi'
            },
            'order': [1, 'asc'],
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    };

    $("#btnEditPosition").click(function() {
        var mydata = [],id;

        $.each(tbl_position.rows({ 'search': 'applied' }).nodes(), function (i, row) {
            var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
            if (checkBox) 
            {
                id =row.querySelector('.col_checkbox').getAttribute('data-item');
                mydata.push(id);
                return;                
            }
        });

        if(mydata.length!=1) 
        {return;}
        $.ajax
        ({
            type: 'GET',
            url: "update_position",
            dataType: 'script',
            data: {
                    id: mydata[0]
            },
            success: function(data, textStatus, jqXHR){
            },
            error:function(jqXHR, textStatus, errorThrown){
                    console.log("AJAX Error: #{textStatus}")
            }
        })
    });

    $("#btnDeletePosition").click(function() {
        var mydata = [],id;

        $.each(tbl_position.rows({ 'search': 'applied' }).nodes(), function (i, row) {
            var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
            if (checkBox) 
            {
                id =row.querySelector('.col_checkbox').getAttribute('data-item');
                mydata.push(id);
                       
            }   
        });

        if(mydata.length==0) 
        {return;}
        $.ajax
        ({
            type: 'GET',
            url: "delete_positions",
            dataType: 'script',
            data: {
                    data: {ids:mydata},
            },
            success: function(data, textStatus, jqXHR){
                console.log("AJAX OK!")
            },
            error:function(jqXHR, textStatus, errorThrown){
                console.log("AJAX Error: #{textStatus}")
            }
        })
    });
    
}

function formatTableCharacter(){
    var tbl_character = document.getElementsByClassName("tbl_character");
    if (tbl_character.length > 0) {
        tbl_character = window.$('.tbl_character').DataTable({
            'stateSave': false,
            'destroy': true,
            "lengthMenu": [5,10,15,20],
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "15%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "16%", "targets": 4 },
            { "width": "30%", "targets": 5 },
            { "width": "10%", "targets": 6},     
            ],
            'select': {
            'style': 'multi'
            },
            'order': [1, 'asc'],
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    };
}

function formatTableWeapon(){
    var tbl_weapon = document.getElementsByClassName("tbl_weapon");
    if (tbl_weapon.length > 0) {
        tbl_weapon = window.$('.tbl_weapon').DataTable({
            'stateSave': false,
            'destroy': true,
            "lengthMenu": [5,10,15,20],
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "17%", "targets": 1 },
            { "width": "16%", "targets": 2 },
            { "width": "16%", "targets": 3 },
            { "width": "10%", "targets": 4 },
            { "width": "26%", "targets": 5 },     
            { "width": "11%", "targets": 6 },          
            ],
            'select': {
            'style': 'multi'
            },
            'order': [1, 'asc'],
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    };
}
window.formatTableAccount = function (){
    var tbl_account = document.getElementsByClassName("tbl_account");
    if (tbl_account.length > 0) {
        tbl_account = window.$('.tbl_account').DataTable({
            'stateSave': false,
            'destroy': true,
            "lengthMenu": [5,10,15,20],
            'columnDefs': [
            {
                'targets': 0,
                'width': "4%",
                'checkboxes': {
                'selectRow': true
                }
            },
            { "width": "4%", "targets": 1 },
            { "width": "6%", "targets": 2 },
            { "width": "16%", "targets": 3 },
            { "width": "40%", "targets": 4 },
            { "width": "20%", "targets": 5 },
            { "width": "10%", "targets": 6 },    
            ],
            'select': {
            'style': 'multi'
            },
            drawCallback: function() {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            language:{paginate:{
            previous:"<i class='mdi mdi-chevron-left'>",
            next:"<i class='mdi mdi-chevron-right'>"}},
        });
    };

    $("#delete_selected_account").click(function() {
        var mydata = [],id;

        $.each($('.tbl_account tbody tr'), function (i, row) {
                var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
                if (checkBox) 
                {
                        id = row.querySelector('.col_checkbox').getAttribute('data-item-id');
                        mydata.push(id);
                                     
                }   
        });

        if(mydata.length==0) 
        {return;}
        $.ajax
        ({
                type: 'GET',
                url: "delete_accounts",
                dataType: 'script',
                data: {
                                data: {ids:mydata},
                },
                success: function(data, textStatus, jqXHR){
                        console.log("AJAX OK!")
                },
                error:function(jqXHR, textStatus, errorThrown){
                        console.log("AJAX Error: #{textStatus}")
                }
        })

    
});
}