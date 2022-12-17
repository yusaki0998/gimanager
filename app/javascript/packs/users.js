var table;
var divParent;
$(document).on('turbolinks:load', function() {
    if(typeof Notification !== 'undefined'){
    try {
      Notification.requestPermission()
          .then( function(result){})                                                                                                                                               
      } catch (error) {
          // Safari doesn't return a promise for requestPermissions and it                                                                                                                                       
          // throws a TypeError. It takes a callback as the first argument                                                                                                                                       
          // instead.
          if (error instanceof TypeError) {
              Notification.requestPermission().then(function(result){})
          } 
         // else {
          //     throw error;                                                                                                                                                                                       
          // }                                                                                                                                                                                                      
      }      
    }
  // Notification.requestPermission().then(function (result) {})
   $("#file_staff").change(function() {
     
    window.$("#loadMe").modal({
      backdrop: "static", //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      show: true //Display loader!
    });
    setTimeout(function() {
      $("#close_loading").click();
    }, 100000);

    var elem = document.getElementById('form_staff') // or $('#myform')[0] with jQuery
    Rails.fire(elem, 'submit');
   });


//modal personal seal
  $('body').delegate('#btnPreviewStamp', 'click', function() {
    var idDiv = document.getElementById("draftPersonalStamp");
    idDiv.innerHTML = '';

    var textValue = $('#name_staff').val();
    var fontsize=document.getElementById("personal_size").value;
    DrawStamp(textValue,'','',idDiv,"draft_img_personal_stamp" +  Math.random(),1,fontsize);
  });

  $('body').delegate("#btnSaveStampSeal", 'click', function() {
    draftPersonalStamp();
    // $("#modal-addUser").css("opacity", "");
  });

  // $("body").delegate('#close_modal_seal', 'click', function() {
  //   window.$('#modal-addPersonalSeal').modal('hide');
  //   $("#modal-addUser").css("opacity", "");
  // });

//modal edit personal stamp
  // $("body").delegate('#close_modal_editSeal', 'click', function() {
  //   window.$('#modalEdit-addPersonalSeal').modal('hide');
  //   $("#modal-user-edit").css("opacity", "");
  // });

  $('body').delegate("#btnEditSaveStampSeal", 'click', function() {
    editDraftPersonalStamp ();
    // $("#modal-user-edit").css("opacity", "");
  });

  $('body').delegate('#btnPreviewStampEdit', 'click', function() {
    var idDiv = document.getElementById("draftEdit_personalStamp");
    idDiv.innerHTML = '';
    var textValue = $('#name_staff_edit').val();
    var fontsize=document.getElementById("personal_size_edit").value;
    DrawStamp(textValue,'','',idDiv,"edit_draft_img_personalStamp" +  Math.random(),1,fontsize);
  });

//modal job seal
  $("body").delegate('#btnPreviewJobSeal', 'click', function() {
    var idDiv_jobStamp = document.getElementById("draftJobStamp");
    idDiv_jobStamp.innerHTML = '';
    var txtPosition = $('#position_staff').val();
    var txtName = $('#name_staff_jobStamp').val();
    var valSquare = document.querySelector('input[name = seals]:checked').value;
    var shape = "false";
    if(valSquare == 'square') shape = "true";
    // var str = txtName +';'+ txtPosition +';'+ shape;
    var name_sz = document.getElementById("manager_name_size").value;
    var position_sz = document.getElementById("manager_position_size").value;
    var has_date = document.getElementById("manageseal_has_date").checked;
    DrawStamp(txtName,txtPosition,shape, idDiv_jobStamp, "draftImg_jobStamp" +  Math.random(), 2,NaN,name_sz,position_sz,has_date);
  });

  // $("body").delegate('#close_modal_jobSeal', 'click', function() {
  //   window.$('#modal-addJobSeal').modal('hide');
  //   $("#modal-addUser").css("opacity", "");
  // });

  $('body').delegate("#btnSaveJobSeal", 'click', function() {
    $("#modal-addUser").css("opacity", "");
    var has_date = document.getElementById("manageseal_has_date").checked;
    if(has_date){
      draftJobStampNodate("img_jobSeal");
    }
    else{
      draftJobStamp("img_jobSeal");
    }
  });

//modal edit job stamp
  $("body").delegate('#btnPreviewJobSealEdit', 'click', function() {
    var idDiv_jobStamp = document.getElementById("editDraft_jobStamp");
    idDiv_jobStamp.innerHTML = '';
    var txtPosition = $('#position_staff_edit').val();
    var txtName = $('#name_staff_jobStamp_edit').val();
    var valSquare = document.querySelector('input[name = seal]:checked').value;
    var manager_name_size = $('#manager_name_size_edit').val();
    var manager_position_size = $('#manager_position_size_edit').val();
    var shape = "false";
    if(valSquare == 'square') shape = "true";
    var has_date = document.getElementById("edit_has_date").checked;
    DrawStamp(txtName,txtPosition,shape, idDiv_jobStamp, "edit_draftImg_jobStamp" +  Math.random(), 2,NaN,manager_name_size,manager_position_size,has_date);
  });

  $('body').delegate("#btnSaveJobSealEdit", 'click', function() {
    $("#modal-user-edit").css("opacity", "");
    var has_date = document.getElementById("edit_has_date").checked;
    if(has_date){
      editDraftJobStampNoDate();
    }
    else{
      editDraftJobStamp();
    }
    
  });
  $('body').delegate("#btnSaveJobSealEditNodate", 'click', function() {
    editDraftJobStamp();
  });
  // $("body").delegate('#close_modal_editJobSeal', 'click', function() {
  //   $("#modal-user-edit").css("opacity", "");
  //   window.$('#modalEdit-addJobSeal').modal('hide');
  // });
  
 
  
// Edit user
	$("#btnEditUser").click(function() {
    var emailSelected;
    var lstSelected = []
    $.each($('.tbl_user tbody tr'), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) 
      {
        emailSelected = row.cells[5].innerHTML;
        lstSelected.push(emailSelected);
        // idSelected = parseInt($("input[type='checkbox']:checked")[0].value);
        return;                
      }   
    });
    if (lstSelected.length == 1) {
      $.ajax({
        type: 'GET',
        url: "update_user",
        dataType: 'script',
        data: {
          email_user: emailSelected
        },
        success: function(data, textStatus, jqXHR){
          
        },
        error:function(jqXHR, textStatus, errorThrown){
          console.log("AJAX Error: #{textStatus}")
        }
      });
    }
  });

  //preview image                
   $('#file').change(handleFileSelect);
   $('#preview').on('click', '.remove_img_preview', function () {
        $("#preview").empty()
        $("#file").val("");
   });

   $("#file").change(function() {
		$(".image_avatar").remove();
   });
   $('#mess-avatar').fadeIn(1000);
    setTimeout(function() { 
        $('#mess-avatar').fadeOut(1000); 
    }, 3000);
   $("#icon_remove").click(()=>{
      $.ajax
        ({
            type: 'GET',
            url: "delete_avatar",
            dataType: 'script',
            data: {
                id: $('.edit_user').attr('id')
            },
            success: function(data, textStatus, jqXHR){
               // console.log(data);
                // 
            },
            error:function(jqXHR, textStatus, errorThrown){
                console.log("AJAX Error: #{textStatus}")
            }
        })
   })
   if($('.avatar:visible').length==0){
      $('.image_avatar').css('display','none');
   }
// Display company stamp for modal new user
  // $("body").delegate('#btn_add_stamp', 'click', function() {
  //   var x = document.getElementById('img_company_stamp');
  //   var rdStamp = document.querySelector('input[name = stamp]:checked').value;
  //   if (rdStamp == 'company_seal') {
  //     document.getElementById('has_compay_stamp').value = true;
  //     x.className = x.className.replace(/\bd-none\b/g, 'd-flex');
  //   }
  // });
// Delete company stamp for modal new user
  $("body").delegate('#delete_img_company', 'click', function() {
    var x = document.getElementById('img_company_stamp');
    document.getElementById('has_compay_stamp').value = false;
    x.className = x.className.replace(/\bd-flex\b/g, 'd-none');
  });

// Display company stamp in modal edit user
  // $("body").delegate('#btn_add_stamp_edit', 'click', function() {
  //   var x = document.getElementById('edit_img_company_stamp');
  //   var rdStamp = document.querySelector('input[name = temp]:checked').value;
  //   if (rdStamp == 'company_seal') {
  //     document.getElementById('edit_has_compay_stamp').value = true;
  //     x.className = x.className.replace(/\bd-none\b/g, 'd-flex');
  //   }
  // });
// Delete company stamp for modal edit user
  $("body").delegate('#edit_delete_img_company', 'click', function() {
    var x = document.getElementById('edit_img_company_stamp');
      document.getElementById('edit_has_compay_stamp').value = false;
      x.className = x.className.replace(/\bd-flex\b/g, 'd-none');
  });
// Send mail for user selected
  $("#btnSendMailUser").click(function() {
    var emailSelected;
    var lstSelected = []
    $.each($('.tbl_user tbody tr'), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) 
      {
        emailSelected = row.cells[5].innerHTML;
        lstSelected.push(emailSelected);
        // idSelected = parseInt($("input[type='checkbox']:checked")[0].value);
        return;                
      }   
    });
    if(lstSelected.length==0) return;

    window.$("#loadMe").modal({
      backdrop: "static", //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      show: true //Display loader!
    });
    
    $.ajax({
      type: 'GET',
      url: "send_mail_user",
      dataType: 'script',
      data: {
        mail_user: lstSelected
      },
      success: function(data, textStatus, jqXHR){
        window.$("#loadMe").modal('hide');
        // console.log(data);
        

      },
      error:function(jqXHR, textStatus, errorThrown){
        window.$("#loadMe").modal('hide');
        console.log("AJAX Error: #{textStatus}")
      }
    });
  });

  $("body").delegate('#btn_sendMail', 'click', function() { 
    var email = document.getElementById('email_field_elem').innerHTML;
    window.$("#loadMe").modal({
      backdrop: "static", //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      show: true //Display loader!
    });
    $.ajax({
      type: 'GET',
      url: "send_mail",
      dataType: 'script',
      data: {
        email: email
      },
      success: function(data, textStatus, jqXHR){
        window.$("#loadMe").modal('hide');
        // console.log(data);
        
      },
      error:function(jqXHR, textStatus, errorThrown){
        window.$("#loadMe").modal('hide');
        console.log("AJAX Error: #{textStatus}")
      }
    });
  });
// Disabled/enable button add preview personal stamp in modal add user
  $('body').delegate('#name_staff', 'input', function() {
    var valInput = document.getElementById('name_staff').value;
    var divImg = document.getElementById("draftPersonalStamp");
    
    if (valInput == "") {
      document.getElementById('btnPreviewStamp').disabled = true;
      document.getElementById('btnSaveStampSeal').disabled = true;
      divImg.innerHTML = '';
    } 
    else {
      document.getElementById('btnPreviewStamp').disabled = false;
      if(valInput.length == 1 || (valInput.includes("_") && valInput.length == 3)){
        document.getElementById("personal_size").value=40;
      }
      else if(valInput.length == 2){
        document.getElementById("personal_size").value=30;
      }
      else if(valInput.length == 3){
        document.getElementById("personal_size").value=20;
      }
      else if(valInput.length == 4){
        document.getElementById("personal_size").value=18;
      }
      else{
        document.getElementById("personal_size").value=14;
      }
    }
  });
  $('body').delegate('#name_stamp', 'input', function() {
    var valInput = document.getElementById('name_stamp').value;
    var divImg = document.getElementById("draft_personal_seal");
    
    if (valInput == "") {
      document.getElementById('btnPreview_personalSeal').disabled = true;
      document.getElementById('btnSave_personalSeal').disabled = true;
      divImg.innerHTML = '';
    } 
    else {
      document.getElementById('btnPreview_personalSeal').disabled = false;
      if(valInput.length == 1 || (valInput.includes("_") && valInput.length == 3)){
        document.getElementById("size_personal_stamp").value=40;
      }
      else if(valInput.length == 2){
        document.getElementById("size_personal_stamp").value=30;
      }
      else if(valInput.length == 3){
        document.getElementById("size_personal_stamp").value=20;
      }
      else{
        document.getElementById("size_personal_stamp").value=20;
      }
    }
  });
  $('body').delegate('#btnPreview_personalSeal', 'click', function() {
    document.getElementById('btnSave_personalSeal').disabled = false;
  });

  $('body').delegate('#name_temp', 'input', function() {
    var valInput = document.getElementById('name_temp').value;
    var divImg = document.getElementById("draft_personal_temp");
    
    if (valInput == "") {
      document.getElementById('btnPreview_personalTemp').disabled = true;
      document.getElementById('btnSave_personalTemp').disabled = true;
      divImg.innerHTML = '';
    } 
    else {
      document.getElementById('btnPreview_personalTemp').disabled = false;
      if(valInput.length == 1){
        document.getElementById("size_personal_temp").value=40;
      }
      else if(valInput.length == 2){
        document.getElementById("size_personal_temp").value=30;
      }
      else if(valInput.length == 3){
        document.getElementById("size_personal_temp").value=20;
      }
      else{
        document.getElementById("size_personal_temp").value=20;
      }
    }
  });
  $('body').delegate('#btnPreview_personalTemp', 'click', function() {
    document.getElementById('btnSave_personalTemp').disabled = false;
  });
// Disabled/enable button add personal stamp in modal add user
  $('body').delegate('#btnPreviewStamp', 'click', function() {
    document.getElementById('btnSaveStampSeal').disabled = false;
  });
// Disabled/enable button add preview job stamp in modal add user
  $('body').delegate('#position_staff', 'input', function() {
    var valInputPosition = document.getElementById('position_staff').value;
    var valInputStaff = document.getElementById('name_staff_jobStamp').value;
    var divImg = document.getElementById("draftJobStamp");
    
    if (valInputPosition != "" & valInputStaff != "") {
      document.getElementById('btnPreviewJobSeal').disabled = false;
    } 
    else {
      document.getElementById('btnPreviewJobSeal').disabled = true;
      document.getElementById('btnSaveJobSeal').disabled = true;
      divImg.innerHTML = '';
    }
  });

  $('body').delegate('#name_staff_jobStamp', 'input', function() {
    var valInputPosition = document.getElementById('position_staff').value;
    var valInputStaff = document.getElementById('name_staff_jobStamp').value;
    var divImg = document.getElementById("draftJobStamp");
    
    if (valInputPosition != "" & valInputStaff != "") {
      document.getElementById('btnPreviewJobSeal').disabled = false;
    } 
    else {
      document.getElementById('btnPreviewJobSeal').disabled = true;
      document.getElementById('btnSaveJobSeal').disabled = true;
      divImg.innerHTML = '';
    }
  });
// Disabled/enable button add job stamp in modal add user
  $('body').delegate('#btnPreviewJobSeal', 'click', function() {
    document.getElementById('btnSaveJobSeal').disabled = false;
  });

// Disabled/enable button preview and save add personal stamp in modal edit user
  $('body').delegate('#name_staff_edit', 'input', function() {
    var valInput = document.getElementById('name_staff_edit').value;
    var divImgStamp = document.getElementById("draftEdit_personalStamp");
    if (valInput == "") {
      document.getElementById('btnPreviewStampEdit').disabled = true;
      document.getElementById('btnEditSaveStampSeal').disabled = true;
      divImgStamp.innerHTML = '';
    } 
    else {
      document.getElementById('btnPreviewStampEdit').disabled = false;
    
      if(valInput.length == 1 || (valInput.includes("_") && valInput.length == 3)){
        document.getElementById("personal_size_edit").value=40;
      }
      else if(valInput.length == 2){
        document.getElementById("personal_size_edit").value=30;
      }
      else if(valInput.length == 3){
        document.getElementById("personal_size_edit").value=20;
      }
      else if(valInput.length == 4){
        document.getElementById("personal_size_edit").value=18;
      }
      else{
        document.getElementById("personal_size_edit").value=14;
      }
    }
  });
// Disabled/enable button add personal stamp in modal edit user
  $('body').delegate('#btnPreviewStampEdit', 'click', function() {
    document.getElementById('btnEditSaveStampSeal').disabled = false;
  });
// Disabled/enable button add job stamp in modal edit user
  $('body').delegate('#position_staff_edit', 'input', function() {
    var valInputPosition = document.getElementById('position_staff_edit').value;
    var valInputStaff = document.getElementById('name_staff_jobStamp_edit').value;
    var divImg = document.getElementById("editDraft_jobStamp");
    
    if (valInputPosition != "" & valInputStaff != "") {
      document.getElementById('btnPreviewJobSealEdit').disabled = false;
    } 
    else {
      document.getElementById('btnPreviewJobSealEdit').disabled = true;
      document.getElementById('btnSaveJobSealEdit').disabled = true;
      divImg.innerHTML = '';
    }
  });

  $('body').delegate('#name_staff_jobStamp_edit', 'input', function() {
    var valInputPosition = document.getElementById('position_staff_edit').value;
    var valInputStaff = document.getElementById('name_staff_jobStamp_edit').value;
    var divImg = document.getElementById("editDraft_jobStamp");
    
    if (valInputPosition != "" & valInputStaff != "") {
      document.getElementById('btnPreviewJobSealEdit').disabled = false;
    } 
    else {
      document.getElementById('btnPreviewJobSealEdit').disabled = true;
      document.getElementById('btnSaveJobSealEdit').disabled = true;
      divImg.innerHTML = '';
    }
  });
// Disabled/enable button add personal stamp in modal edit user
  $('body').delegate('#btnPreviewJobSealEdit', 'click', function() {
    document.getElementById('btnSaveJobSealEdit').disabled = false;
  });
// Show loading for add user
  // $("body").delegate('#btnSaveUser', 'click', function() {
    
  //   window.$("#loadMe").modal({
  //     backdrop: "static", //remove ability to close modal with click
  //     keyboard: false, //remove option to close with keyboard
  //     show: true //Display loader!
  //   });
  //   setTimeout(function() {
  //     window.$("#loadMe").modal('hide');
  //   }, 60000);
  //   $('#new_user').submit();
  // });
// Click button remove stamp
  $("body").delegate('.btn_remove_stamp', 'click', function() {
    $(this).parent().removeClass('d-flex');
  });

// double click show modal edit stamp
  $('body').delegate('canvas', 'dblclick', function() {
    divParent = this.parentElement;
    if(divParent.children.length<5) return;
    var nameStamp = divParent.firstElementChild.value;
    var type_seal = divParent.children[2].value;
    // modal edit personal stamp in modal edit user
    if (type_seal == 1) {
      var idUser = divParent.children[4].value;
      var size_stamp = divParent.children[3].value;
      if (idUser != "") {
        $.ajax({
          type: 'GET',
          url: "edit_personal_seal",
          dataType: 'script',
          data: {
            type_stamp: type_seal,
            id: idUser,
            name_user: nameStamp,
            size_stamp: size_stamp
          },
          success: function(data, textStatus, jqXHR){
            
          },
          error:function(jqXHR, textStatus, errorThrown){
            console.log("AJAX Error: #{textStatus}")
          }
        });
      } 
      else {
        $.ajax({
          type: 'GET',
          url: "edit_personal_temp",
          dataType: 'script',
          data: {
            type_stamp: type_seal,
            name_user: nameStamp,
            size_stamp: size_stamp
          },
          success: function(data, textStatus, jqXHR){
            
          },
          error:function(jqXHR, textStatus, errorThrown){
            console.log("Error")
          }
        });
      }
    }
    
    // edit job stamp 
    if (type_seal == 2) {
      var idUser = divParent.children[8].value;
      var position = divParent.children[1].value;
      var square = divParent.children[3].value;
      var size_of_name_for_manager_stamp = divParent.children[4].value;
      var size_of_posision_for_manager_stamp = divParent.children[5].value;
      var has_date = divParent.children[7].checked;
      // edit job stamp in modal edit user
      if (idUser != "") {
        // double click edit job stamp no date
        if (has_date == true) {
          $.ajax({
            type: 'GET',
            url: "edit_job_seal_nodate",
            dataType: 'script',
            data: {
              name: nameStamp,
              position: position,
              typestamp: type_seal,
              square: square,
              size_of_name_for_manager_stamp: size_of_name_for_manager_stamp,
              size_of_posision_for_manager_stamp: size_of_posision_for_manager_stamp,
              has_date: has_date
            },
            success: function(data, textStatus, jqXHR){
              
            },
            error:function(jqXHR, textStatus, errorThrown){
              console.log("Error")
            }
          });
        }
        // double click edit job stamp has date
        else {
          $.ajax({
            type: 'GET',
            url: "edit_job_seal",
            dataType: 'script',
            data: {
              name: nameStamp,
              position: position,
              typestamp: type_seal,
              square: square,
              size_of_name_for_manager_stamp: size_of_name_for_manager_stamp,
              size_of_posision_for_manager_stamp: size_of_posision_for_manager_stamp,
              has_date: has_date
            },
            success: function(data, textStatus, jqXHR){
              
            },
            error:function(jqXHR, textStatus, errorThrown){
              console.log("Error")
            }
          });
        }
      }
      // edit job stamp in modal add user
      else {
        // double click edit stamp no date
        if (has_date == true) {
          $.ajax({
            type: 'GET',
            url: "edit_job_temp_nodate",
            dataType: 'script',
            data: {
              name: nameStamp,
              position: position,
              typestamp: type_seal,
              square: square,
              size_of_name_for_manager_stamp: size_of_name_for_manager_stamp,
              size_of_posision_for_manager_stamp: size_of_posision_for_manager_stamp,
              has_date: has_date
            },
            success: function(data, textStatus, jqXHR){
              
            },
            error:function(jqXHR, textStatus, errorThrown){
              console.log("Error")
            }
          });
        }
        // double click edit stamp has date
        else {
          $.ajax({
            type: 'GET',
            url: "edit_job_temp",
            dataType: 'script',
            data: {
              name: nameStamp,
              position: position,
              typestamp: type_seal,
              square: square,
              size_of_name_for_manager_stamp: size_of_name_for_manager_stamp,
              size_of_posision_for_manager_stamp: size_of_posision_for_manager_stamp,
              has_date: has_date
            },
            success: function(data, textStatus, jqXHR){
              
            },
            error:function(jqXHR, textStatus, errorThrown){
              console.log("Error")
            }
          });
        }
      }
    }
  });
// draw stamp when double click edit personal stamp in modal edit user
  $('body').delegate('#btnPreview_personalSeal', 'click', function() {
    var idDiv = document.getElementById("draft_personal_seal");
    idDiv.innerHTML = '';

    var textValue = $('#name_stamp').val();
    var fontsize=document.getElementById("size_personal_stamp").value;
    DrawStamp(textValue,'','',idDiv,"draft_img_personal_stamp" +  Math.random(),1,fontsize);
  });

  $('body').delegate("#btnSave_personalSeal", 'click', function() {
    draftPersonalSeal();
  });

// draw stamp when double click edit personal stamp in modal add user
  $('body').delegate('#btnPreview_personalTemp', 'click', function() {
    var idDiv = document.getElementById("draft_personal_temp");
    idDiv.innerHTML = '';

    var textValue = $('#name_temp').val();
    var fontsize=document.getElementById("size_personal_temp").value;
    DrawStamp(textValue,'','',idDiv,"draft_img_personal_temp" +  Math.random(),1,fontsize);
  });

  $('body').delegate("#btnSave_personalTemp", 'click', function() {
    draftPersonalTemp();
  });

// draw job stamp when double click job stamp no date in modal add user
  $('body').delegate('#btnPreviewJobTempNodate', 'click', function() {
    var idDiv_jobStamp = document.getElementById("draftJobTempNodate");
    idDiv_jobStamp.innerHTML = '';
    var txtPosition = $('#position_jobTemp_nodate').val();
    var txtName = $('#name_jobTemp_nodate').val();
    var valSquare = document.querySelector('input[name = square_nodate]:checked').value;
    var manager_name_size = $('#name_size_jobTemp_nodate').val();
    var manager_position_size = $('#position_size_jobTemp_nodate').val();
    var has_date = document.getElementById("has_date_job_temp_nodate").checked;
    DrawStamp(txtName,txtPosition,valSquare, idDiv_jobStamp, "draftImg_jobTemp" +  Math.random(), 2,NaN,manager_name_size,manager_position_size,has_date);
  });

  $('body').delegate("#btnSaveJobTemp_nodate", 'click', function() {
    var has_date = document.getElementById("has_date_job_temp_nodate").checked;
    if(has_date){
      draftJobTempNodate();
    }
    else{
      draftJobTempHasDate();
    }
  });

// draw job stamp when double click job stamp has date in modal add user
  $('body').delegate('#btnPreviewJobTemp', 'click', function() {
    var idDiv_jobStamp = document.getElementById("draftJobTemp");
    idDiv_jobStamp.innerHTML = '';
    var txtPosition = $('#position_jobTemp').val();
    var txtName = $('#name_jobTemp').val();
    var valSquare = document.querySelector('input[name = square_hasdate]:checked').value;
    var manager_name_size = $('#name_size_jobTemp').val();
    var manager_position_size = $('#position_size_jobTemp').val();
    var has_date = document.getElementById("has_date_job_temp").checked;
    DrawStamp(txtName,txtPosition,valSquare, idDiv_jobStamp, "draftImg_jobTemp" +  Math.random(), 2,NaN,manager_name_size,manager_position_size,has_date);
  });

  $('body').delegate("#btnSaveJobTemp", 'click', function() {
    var has_date = document.getElementById("has_date_job_temp").checked;
    if(has_date){
      drawJobTempNodate();
    }
    else{
      drawJobTempHasDate();
    }
  });

// draw job stamp when double click job stamp no date in modal edit user
  $('body').delegate('#btnPreviewJobSealNodate', 'click', function() {
    var idDiv_job_seal = document.getElementById("draftJobSealNodate");
    idDiv_job_seal.innerHTML = '';
    var txtPosition = $('#position_jobSeal_nodate').val();
    var txtName = $('#name_jobSeal_nodate').val();
    var valSquare = document.querySelector('input[name = square_nodate_jobSeal]:checked').value;
    var manager_name_size = $('#name_size_jobSeal_nodate').val();
    var manager_position_size = $('#position_size_jobSeal_nodate').val();
    var has_date = document.getElementById("has_date_job_seal_nodate").checked;
    DrawStamp(txtName,txtPosition,valSquare, idDiv_job_seal, "draftImg_jobSeal" +  Math.random(), 2,NaN,manager_name_size,manager_position_size,has_date);
  });

  $('body').delegate("#btnSaveJobSeal_nodate", 'click', function() {
    var has_date = document.getElementById("has_date_job_seal_nodate").checked;
    if(has_date){
      draftJobSealNodate();
    }
    else{
      draftJobSealHasDate();
    }
  });

// draw job stamp when double click job stamp has date in modal edit user
  $('body').delegate('#btnPreview_jobSeal', 'click', function() {
    var idDiv_job_seal = document.getElementById("draft_jobSeal");
    idDiv_job_seal.innerHTML = '';
    var txtPosition = $('#position_job_seal').val();
    var txtName = $('#name_job_seal').val();
    var valSquare = document.querySelector('input[name = square_hasdate_seal]:checked').value;
    var manager_name_size = $('#name_size_job_seal').val();
    var manager_position_size = $('#position_size_job_seal').val();
    var has_date = document.getElementById("has_date_job_seal").checked;
    DrawStamp(txtName,txtPosition,valSquare, idDiv_job_seal, "draft_img_jobSeal" +  Math.random(), 2,NaN,manager_name_size,manager_position_size,has_date);
  });

  $('body').delegate("#btnSave_jobSeal", 'click', function() {
    var has_date = document.getElementById("has_date_job_seal").checked;
    if(has_date){
      draw_jobSealNodate();
    }
    else{
      draw_jobSealHasDate();
    }
  });

  // add spinner when sign up
  $("#btn_signUp").click(function() {
    $("#btn_signUp").addClass("d-none");
    $("#btn_loading").removeClass("d-none");
  });

  $('body').delegate('#background_color_theme0', 'click', function() {
    change_theme('#background_color_theme0');
  });

  $('body').delegate('#background_color_theme1', 'click', function() {
    change_theme('#background_color_theme1');
  });

  $('body').delegate('#background_color_theme2', 'click', function() {
    change_theme('#background_color_theme2');
  });

  $('body').delegate('#background_color_theme3', 'click', function() {
    change_theme('#background_color_theme3');
  });

  $('body').delegate('#background_color_theme4', 'click', function() {
    change_theme('#background_color_theme4');
  });

  $('body').delegate('#background_color_theme5', 'click', function() {
    change_theme('#background_color_theme5');
  });

});
// function draw job stamp no date in modal edit user when click save draft in modal edit job stamp
function draw_jobSealNodate() {
  var btn_remove_seal = divParent.querySelector('.btn_remove_stamp');
  btn_remove_seal.click();
  document.getElementById('btnAddJobStampEditNodate').click();

  var txtPosition = $('#position_job_seal').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_job_seal').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = square_hasdate_seal]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = valSquare; 
    }   
  });

  var lstNestedJobStamp = []
  $('#edit_jobStamp_all_Nodate > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#name_size_job_seal').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#position_size_job_seal').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("has_date_job_seal").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;

    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
}
// function draw job stamp has date in modal edit user when click save draft in modal edit job stamp
function draw_jobSealHasDate() {
  var position_temp = document.getElementById('position_job_seal').value;
  var size_position = document.getElementById('position_size_job_seal').value;
  var name_temp = document.getElementById('name_job_seal').value;
  var size_name = document.getElementById('name_size_job_seal').value;
  var val_square = document.querySelector('input[name = square_hasdate_seal]:checked').value;
  var has_date = document.getElementById("has_date_job_seal").checked;

  divParent.firstElementChild.value = name_temp;
  divParent.children[1].value = position_temp;
  divParent.children[3].value = val_square;
  divParent.children[4].value = size_name;
  divParent.children[5].value = size_position;
  divParent.children[7].value = has_date;
  divParent.lastChild.remove();

  DrawStamp(name_temp, position_temp, val_square, divParent, "img-temp-position" +  Math.random(),2
    , NaN, size_name, size_position, has_date);
}

// function draw job stamp has date in modal edit user when edit stamp no date
function draftJobSealHasDate() {
  var btn_remove_seal = divParent.querySelector('.btn_remove_stamp');
  btn_remove_seal.click();
  document.getElementById('btnAddJobStampEdit').click();

  var txtPosition = $('#position_jobSeal_nodate').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_jobSeal_nodate').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = square_nodate_jobSeal]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = valSquare;
    }   
  });

  var lstNestedJobStamp = []
  $('#edit_jobStamp_all > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#name_size_jobSeal_nodate').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#position_size_jobSeal_nodate').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("has_date_job_seal_nodate").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;

    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
}

// function draw job stamp no date in modal edit user when edit stamp no date
function draftJobSealNodate() {
  var position_temp_nodate = document.getElementById('position_jobSeal_nodate').value;
  var size_position_nodate = document.getElementById('position_size_jobSeal_nodate').value;
  var name_temp_nodate = document.getElementById('name_jobSeal_nodate').value;
  var size_name_nodate = document.getElementById('name_size_jobSeal_nodate').value;
  var val_square = document.querySelector('input[name = square_nodate_jobSeal]:checked').value;
  var has_date = document.getElementById("has_date_job_seal_nodate").checked;

  divParent.firstElementChild.value = name_temp_nodate;
  divParent.children[1].value = position_temp_nodate;
  divParent.children[3].value = val_square;
  divParent.children[4].value = size_name_nodate;
  divParent.children[5].value = size_position_nodate;
  divParent.children[7].value = has_date;
  divParent.lastChild.remove();

  DrawStamp(name_temp_nodate, position_temp_nodate, val_square, divParent, "img-seal-position-nodate" +  Math.random(),2
    , NaN, size_name_nodate, size_position_nodate, has_date);
}

// function draw job stamp no date in modal add user when edit job stamp has date
function drawJobTempNodate() {
  var btn_remove_seal = divParent.querySelector('.btn_remove_stamp');
  btn_remove_seal.click();
  document.getElementById('btnAddJobStampNodate').click();

  var txtPosition = $('#position_jobTemp').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_jobTemp').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = square_hasdate]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = valSquare;
    }   
  });

  var lstNestedJobStamp = []
  $('#jobStamp_allNodate > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#name_size_jobTemp').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#position_size_jobTemp').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("has_date_job_temp").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;

    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
}

// function edit job stamp no date in modal add user
function drawJobTempHasDate() {
  var position_temp = document.getElementById('position_jobTemp').value;
  var size_position = document.getElementById('position_size_jobTemp').value;
  var name_temp = document.getElementById('name_jobTemp').value;
  var size_name = document.getElementById('name_size_jobTemp').value;
  var val_square = document.querySelector('input[name = square_hasdate]:checked').value;
  var has_date = document.getElementById("has_date_job_temp").checked;

  divParent.firstElementChild.value = name_temp;
  divParent.children[1].value = position_temp;
  divParent.children[3].value = val_square;
  divParent.children[4].value = size_name;
  divParent.children[5].value = size_position;
  divParent.children[7].value = has_date;
  divParent.lastChild.remove();

  DrawStamp(name_temp, position_temp, val_square, divParent, "img-temp-position" +  Math.random(),2
    , NaN, size_name, size_position, has_date);
}

// function draw job stamp has date in modal add user when edit job stamp no date
function draftJobTempHasDate() {
  var btn_remove_seal = divParent.querySelector('.btn_remove_stamp');
  btn_remove_seal.click();
  document.getElementById('btnAddJobStamp').click();

  var txtPosition = $('#position_jobTemp_nodate').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_jobTemp_nodate').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = square_nodate]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = valSquare;
    }   
  });

  var lstNestedJobStamp = []
  $('#jobStamp_all > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#name_size_jobTemp_nodate').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#position_size_jobTemp_nodate').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("has_date_job_temp_nodate").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;

    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
}

// function edit job stamp no date in modal add user
function draftJobTempNodate () {
  var position_temp_nodate = document.getElementById('position_jobTemp_nodate').value;
  var size_position_nodate = document.getElementById('position_size_jobTemp_nodate').value;
  var name_temp_nodate = document.getElementById('name_jobTemp_nodate').value;
  var size_name_nodate = document.getElementById('name_size_jobTemp_nodate').value;
  var val_square = document.querySelector('input[name = square_nodate]:checked').value;
  var has_date = document.getElementById("has_date_job_temp_nodate").checked;

  divParent.firstElementChild.value = name_temp_nodate;
  divParent.children[1].value = position_temp_nodate;
  divParent.children[3].value = val_square;
  divParent.children[4].value = size_name_nodate;
  divParent.children[5].value = size_position_nodate;
  divParent.children[7].value = has_date;
  divParent.lastChild.remove();

  DrawStamp(name_temp_nodate, position_temp_nodate, val_square, divParent, "img-temp-position-nodate" +  Math.random(),2
    , NaN, size_name_nodate, size_position_nodate, has_date);
}

// function edit personal seal in modal add user
function draftPersonalTemp() {
  var name_seal = document.getElementById('name_temp').value;
  var size_name_seal = document.getElementById('size_personal_temp').value;
  divParent.firstElementChild.value = name_seal;
  divParent.children[3].value = size_name_seal;
  divParent.lastChild.remove();
  DrawStamp(name_seal,'','',divParent,"img-temp-personal" +  Math.random(),1, size_name_seal,NaN,NaN);
}

//function edit personal seal in modal edit user
function draftPersonalSeal() {
  var name_seal = document.getElementById('name_stamp').value;
  var size_name_seal = document.getElementById('size_personal_stamp').value;
  divParent.firstElementChild.value = name_seal;
  divParent.children[3].value = size_name_seal;
  divParent.lastChild.remove();
  DrawStamp(name_seal,'','',divParent,"img-stamp-personal" +  Math.random(),1, size_name_seal,NaN,NaN);
}
//load image stamp
function loadImg (idCanvasStamp) {
	var canvas = document.getElementById(idCanvasStamp);

	var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    var nameStaff = document.getElementById(current).value;
    var rsName = nameStaff.trim();

    if(canvas != null){
		      var context = canvas.getContext('2d');
		      var centerX = canvas.width / 2;
		      var centerY = canvas.width / 2;
		      var radius = canvas.width / 2 - context.lineWidth - 5;
		      context.clearRect(centerX - radius - context.lineWidth, 
		         centerY - radius - context.lineWidth, 
		         radius * 2 + (context.lineWidth*2), 
		         radius * 2 + (context.lineWidth*2));
		       
		      var size = 92;
		      if(rsName.length == 1){
		         getOneCharacterDrawPersonalStamp(size, rsName, 96, "img_stamp");
		      }
		      else if(rsName.length == 2){
		         getTwoCharacterDrawPersonalStamp(size, rsName, "img_stamp");
		      }
		      else if(rsName.length == 3){
		         getThreeCharacterDrawPersonalStamp(size, rsName, "img_stamp");
		      }
		      else{
		         getThree_TextDrawPersonalStamp(size, rsName, "img_stamp");
		      }
		      context.stroke();
    }
  });
}
//function for seal
function getOneCharacterDrawPersonalStamp(h, oneCharacter, dpi, canvasSeal){
   var canvas = document.getElementById(canvasSeal);
   canvas.width = canvas.height = h;
   var context = canvas.getContext('2d');
  
   var centerX = h / 2;
   var centerY = h / 2;
   var radius = h / 2 - context.lineWidth - 5;
   context.beginPath();
   context.arc(centerX, centerY, radius + context.lineWidth , 0, 2 * Math.PI, false);
   context.strokeStyle = 'red';
   context.lineWidth = 2;
   context.font = '50pt HG正楷書体-PRO';
   context.textAlign = 'center';
   context.fillStyle = 'red';
   // Defining the `textBaseline`… 
   context.textBaseline = 'middle';
   context.fillText(oneCharacter, centerX, centerY);
   context.stroke();

   var dataURL =  canvas.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
   // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}    
function getTwoCharacterDrawPersonalStamp(h, twoCharacter, canvasSeal){
   var canvas = document.getElementById(canvasSeal);
   canvas.width = canvas.height = h;
   var context = canvas.getContext('2d');
   var centerX = h / 2;
   var centerY = h / 2;
   var radius = h / 2 - context.lineWidth - 5;

   context.beginPath();
   context.arc(centerX, centerY, radius + context.lineWidth, 0,2*Math.PI, false);
   context.lineWidth = 2;
   context.strokeStyle = 'red';
   context.font = '25pt HG正楷書体-PRO';
   context.textAlign = 'center';
   context.fillStyle = 'red';
    // Defining the `textBaseline`… 
   context.textBaseline = 'middle';

   var text = twoCharacter.split('').join('\n');
   var lines = text.split('\n');
   for (var i = 0; i<lines.length; i++){
      context.fillText(lines[i], centerX, centerY - 0.4*radius + 0.8*radius*i);
   }
   context.stroke();

   var dataURL =  canvas.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
    // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}
function getThreeCharacterDrawPersonalStamp(h,threeCharacter, canvasSeal){
   var canvas = document.getElementById(canvasSeal);
   canvas.width = canvas.height = h;
   var context = canvas.getContext('2d');
   var centerX = h / 2;
   var centerY = h / 2;
   var radius = h / 2 - context.lineWidth - 5;

   context.beginPath();
   context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
   context.lineWidth = 2;
   context.strokeStyle = 'red';
   context.font = '25pt HG正楷書体-PRO';
   context.textAlign = 'center';
   context.fillStyle = 'red';
   // Defining the `textBaseline`… 
   context.textBaseline = 'middle';

   var text = threeCharacter.split('').join('\n');
   var lines = text.split('\n');
   for (var i = 0; i<lines.length; i++){
     context.fillText(lines[i], centerX, centerY - 0.6*radius + 0.6*radius*i);
   }
   context.stroke();

   var dataURL =  canvas.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
    // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}
function getThree_TextDrawPersonalStamp(h, threeText, canvasSeal){
   var canvas = document.getElementById(canvasSeal);
   canvas.width = canvas.height = h;
   var context = canvas.getContext('2d');
   var centerX = h / 2;
   var centerY = h / 2;
   var radius = h / 2 - context.lineWidth - 5;
   context.beginPath();
   context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
   context.lineWidth = 2;
   context.strokeStyle = 'red';
   context.textAlign = 'center';
   context.fillStyle = 'red';
   // Defining the `textBaseline`… 
   context.textBaseline = 'middle';

   var replaceText = threeText.replace("_","");
   var result;
   for(var i=0; i<replaceText.length; i++){
      if(i<=1){
         context.font='25pt HG正楷書体-PRO';
      }
      else{
         context.font='10pt HG正楷書体-PRO';
      }
      var bracket = "("+`${replaceText[2]}`+")";
      result = replaceText[i].replace(replaceText[2], bracket);
      context.fillText(result, centerX, centerY - 0.6*radius + 0.6*radius*i);
   }
   context.stroke();

   var dataURL =  canvas.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
   // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}
function draftPersonalStamp () {
  document.getElementById('btnAddPersonalStamp').click();

  var textValue = $('#name_staff').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = textValue
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 1
    }
  });

  var lstNestedPersonalSeal = []
  $('#user_stamps_person_all > div.nested-fields').each((index, elem) => {
    lstNestedPersonalSeal.push(elem);
  });

  var fontsize=document.getElementById("personal_size").value;
  var size_of_personal_stamp = 'input[id^="user_stamps_attributes_"][id$="_size_of_personal_stamp"]';
  $(size_of_personal_stamp).each(function(){

    var current = $(this).attr("id");
    var elem = document.getElementById(current);
    if (elem.value == "") {
      document.getElementById(current).value = fontsize;
    }   
  });

  if (lstNestedPersonalSeal.length > 0) {
    var first = lstNestedPersonalSeal[lstNestedPersonalSeal["length"]-1].firstElementChild; 
    DrawStamp(first.value,'','',lstNestedPersonalSeal[lstNestedPersonalSeal["length"]-1],"img-stamp-personal" +  Math.random(),1,fontsize,NaN,NaN);
  }
}
//function for edit seal
function editDraftPersonalStamp () {
  var textValue = $('#name_staff_edit').val();
  document.getElementById('btnAddPersonalStampEdit').click();

  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){

    var current = $(this).attr("id");
    var elem = document.getElementById(current);
    if (elem.value == "") {
      document.getElementById(current).value = textValue;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 1
    }
  });

  var lstNested = []
  $("#edit_user_stamps_person_all > div.nested-fields").each((index, elem) => {
    lstNested.push(elem);
  });
  var fontsize=document.getElementById("personal_size_edit").value;
  var size_of_personal_stamp = 'input[id^="user_stamps_attributes_"][id$="_size_of_personal_stamp"]';
  $(size_of_personal_stamp).each(function(){

    var current = $(this).attr("id");
    var elem = document.getElementById(current);
    if (elem.value == "") {
      document.getElementById(current).value = fontsize;
    }   
  });

  if(lstNested.length>0)  {
    var first_ele = lstNested[lstNested["length"]-1].firstElementChild; 
    DrawStamp(first_ele.value,'','',lstNested[lstNested["length"]-1],"img-stamp-personal" +  Math.random(),1,fontsize);    
  }     
}


function dataURLtoBlob(dataURL) {
    // Decode the dataURL    
    var binary = atob(dataURL.split(',')[1]);
    // Create 8-bit unsigned array
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // Return our Blob object
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

// function for job seal
function getTextDrawTitleStamp(h, idPosition, idNameStaff, idImgJobSeal, btnSaveJobStamp){
   var c = document.getElementById(idImgJobSeal)
   c.width = c.height = h;
   var context = c.getContext('2d');
   var centerX = h / 2;
   var centerY = h / 2;
   var r = h / 2 - context.lineWidth - 5;

   context.beginPath();
   context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
   context.lineWidth = 3;
   context.moveTo(5 + (r - r*Math.sqrt(15)/4), 3*r/4 + 5);
   context.lineTo(5 + r + r*Math.sqrt(15)/4, 3*r/4 + 5);

   context.moveTo(5 + (r - r*Math.sqrt(15)/4), 5 + 5*r/4);
   context.lineTo(5 + r + r*Math.sqrt(15)/4, 5 + 5*r/4);
   context.strokeStyle = "red";
   context.fillStyle = 'red';
   context.textAlign = 'center';
   context.textBaseline = 'middle';
   var name_length = idPosition.length;

   changeSize(context, idNameStaff.length);
   context.fillText(idNameStaff, centerX, 13*r/8);

   if(idPosition.includes("ISO")){
      var text_iso = idPosition.replace('ISO','ISO_');
      var cut_text = text_iso.split('_').join('\n');
      var text_aline = cut_text.split('\n');
      for(var i = 0; i<text_aline.length; i++){
         changeSize(context, name_length)
         context.fillText(text_aline[i], centerX, r/5 + context.lineWidth + 5 + r/3*i);
      }
   }
   else{
      changeSize(context, name_length)
      context.fillText(idPosition, centerX, 4*r/9 + context.lineWidth + 5);
   }
   context.stroke();


   var dataURL =  c.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
   // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}
function getTextDrawManagementStamp(h ,idPosition, idNameStaff, idImgJobSeal, btnSaveJobStamp){
   var c = document.getElementById(idImgJobSeal)
   c.width = c.height = h;
   var context = c.getContext('2d');
   var centerX = h / 2;
   var centerY = h / 2;

   context.beginPath();
   context.strokeStyle = 'red';
   context.rect(10, 10, h - 20 , h - 20);

   context.lineWidth = 3;
   context.moveTo(10, 10 + 3*(h - 20)/10);
   context.lineTo(h - 10, 10 + 3*(h - 20)/10);

   context.moveTo(10, 10 + 7*(h - 20)/10);
   context.lineTo(h - 10, 10 + 7*(h - 20)/10);

   context.fillStyle = 'red';
   context.textAlign = 'center';
   context.textBaseline = 'middle';

   var name_length = idPosition.length;
   changeSize(context, name_length)
   context.fillText(idPosition, (h - 20)/2, 10 + 3*(h - 20)/20);

   // var name_end = input_text.slice(0, 2);
   changeSize(context, idNameStaff.length);
   context.fillText(idNameStaff, (h - 20)/2, 10 + 17*(h - 20)/20);

   context.stroke();

   var dataURL =  c.toDataURL('image/png');
   var file = dataURLtoBlob(dataURL);
   // Create new form data
   var fd = new FormData();
   fd.append("image", file, 'filename.png');
}
function draftJobStamp (idImgJobSeal) {
  document.getElementById('btnAddJobStamp').click();

  var txtPosition = $('#position_staff').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_staff_jobStamp').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName = current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = seals]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      if (valSquare == 'round') {
        document.getElementById(current).value = false;
      }
      else {
        document.getElementById(current).value = true;
      }
    }
  });
 var manager_name_size = $('#manager_name_size').val();
 var manager_position_size = $('#manager_position_size').val();
  // var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  // $(idTypeStamp).each(function(){
  //   var current = $(this).attr("id");
  //   if (document.getElementById(current).value == "") {
  //     document.getElementById(current).value = 2
  //   }   
  // });

  $('input[id^="name_staff_manager"]').each((index, element) => {
    if (element.value == "" || !element.value ) {
     
      
      //var txt = txtName +';'+ txtPosition +';'+ shape;
      element.value = txtName;
    }
  });
 
  var lstNestedJobSeal = []
  $('#jobStamp_all > div.nested-fields').each((index, elem) => {
    lstNestedJobSeal.push(elem);
  })

  var manager_name_size = $('#manager_name_size').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  
  var manager_position_size = $('#manager_position_size').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("manageseal_has_date").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  

  if (lstNestedJobSeal.length > 0) {
    var fstElem = lstNestedJobSeal[lstNestedJobSeal["length"]-1].firstElementChild; 

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

   
    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobSeal[lstNestedJobSeal["length"]-1],"img-stamp-personal" +  Math.random(),2,NaN,manager_name_size,manager_position_size,has_date);
  }
}
function draftJobStampNodate (idImgJobSeal) {
  document.getElementById('btnAddJobStampNodate').click();

  var txtPosition = $('#position_staff').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_staff_jobStamp').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName = current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = seals]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      if (valSquare == 'round') {
        document.getElementById(current).value = false;
      }
      else {
        document.getElementById(current).value = true;
      }
    }
  });
 var manager_name_size = $('#manager_name_size').val();
 var manager_position_size = $('#manager_position_size').val();
  // var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  // $(idTypeStamp).each(function(){
  //   var current = $(this).attr("id");
  //   if (document.getElementById(current).value == "") {
  //     document.getElementById(current).value = 2
  //   }   
  // });

  $('input[id^="name_staff_manager"]').each((index, element) => {
    if (element.value == "" || !element.value ) {
     
      
      //var txt = txtName +';'+ txtPosition +';'+ shape;
      element.value = txtName;
    }
  });
 
  var lstNestedJobSeal = []
  $('#jobStamp_allNodate > div.nested-fields').each((index, elem) => {
    lstNestedJobSeal.push(elem);
  })

  var manager_name_size = $('#manager_name_size').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  
  var manager_position_size = $('#manager_position_size').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("manageseal_has_date").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  

  if (lstNestedJobSeal.length > 0) {
    var fstElem = lstNestedJobSeal[lstNestedJobSeal["length"]-1].firstElementChild; 

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

   
    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobSeal[lstNestedJobSeal["length"]-1],"img-stamp-personal" +  Math.random(),2,NaN,manager_name_size,manager_position_size,has_date);
  }
}
//function for edit job seal
function editDraftJobStamp () {
  document.getElementById('btnAddJobStampEdit').click();

  var txtPosition = $('#position_staff_edit').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_staff_jobStamp_edit').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = seal]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      if (valSquare == 'round') {
        document.getElementById(current).value = false;
      }
      else {
        document.getElementById(current).value = true;
      }
    }   
  });

  $('input[class^="name_staff_manager"]').each((index, element) => {
    if (element.value == ";;" || !element.value ) {
      var shape = "false";
      if(valSquare == 'square') shape = "true";
      // var txt = txtName +';'+ txtPosition +';'+ shape;
      element.value = txtName;
    }
  });

  var lstNestedJobStamp = []
  $('#edit_jobStamp_all > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#manager_name_size_edit').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#manager_position_size_edit').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("edit_has_date").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;


    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
} 
function editDraftJobStampNoDate () {
  document.getElementById('btnAddJobStampEditNodate').click();

  var txtPosition = $('#position_staff_edit').val();
  var idPositionStamp = 'input[id^="user_stamps_attributes_"][id$="_position"]';
  $(idPositionStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
       document.getElementById(current).value = txtPosition
    }   
  });
  var currentIdName;
  var txtName = $('#name_staff_jobStamp_edit').val();
  var idNameStamp = 'input[id^="user_stamps_attributes_"][id$="_name"]';
  $(idNameStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = txtName;
      currentIdName=current;
    }   
  });

  var idTypeStamp = 'input[id^="user_stamps_attributes_"][id$="_typestamp"]';
  $(idTypeStamp).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = 2
    }   
  });

  var valSquare = document.querySelector('input[name = seal]:checked').value;
  var idSquare = 'input[id^="user_stamps_attributes_"][id$="_square"]';
  $(idSquare).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      if (valSquare == 'round') {
        document.getElementById(current).value = false;
      }
      else {
        document.getElementById(current).value = true;
      }
    }   
  });

  $('input[class^="name_staff_manager"]').each((index, element) => {
    if (element.value == ";;" || !element.value ) {
      var shape = "false";
      if(valSquare == 'square') shape = "true";
      // var txt = txtName +';'+ txtPosition +';'+ shape;
      element.value = txtName;
    }
  });

  var lstNestedJobStamp = []
  $('#edit_jobStamp_all_Nodate > div.nested-fields').each((index, elem) => {
    lstNestedJobStamp.push(elem);
  });
  var manager_name_size = $('#manager_name_size_edit').val();
  
  var idmanager_name_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_name_for_manager_stamp"]';
  $(idmanager_name_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_name_size
    }   
  });
  var manager_position_size = $('#manager_position_size_edit').val();
  var idmanager_position_size = 'input[id^="user_stamps_attributes_"][id$="_size_of_posision_for_manager_stamp"]';
  $(idmanager_position_size).each(function(){
    var current = $(this).attr("id");
    if (document.getElementById(current).value == "") {
      document.getElementById(current).value = manager_position_size
    }   
  });
  var has_date = document.getElementById("edit_has_date").checked;
  var idhas_date = currentIdName.replace("_name","_has_date");
  document.getElementById(idhas_date).checked = has_date;
  if (lstNestedJobStamp.length > 0) {
    var fstElem = lstNestedJobStamp[lstNestedJobStamp["length"]-1].firstElementChild;

    var spositionId = fstElem.id.replace("name","position");   
    var value_position = document.getElementById(spositionId).value;

    var squareId = fstElem.id.replace("name","square");   
    var value_square = document.getElementById(squareId).value;

    var size_of_name_for_manager_stamp = fstElem.id.replace("name","size_of_name_for_manager_stamp");   
    var value_size_of_name_for_manager_stamp = document.getElementById(size_of_name_for_manager_stamp).value;

    var size_of_posision_for_manager_stamp = fstElem.id.replace("name","size_of_posision_for_manager_stamp");   
    var value_size_of_posision_for_manager_stamp = document.getElementById(size_of_posision_for_manager_stamp).value;


    DrawStamp(fstElem.value,value_position,value_square,lstNestedJobStamp[lstNestedJobStamp["length"]-1],"img-stamp-position" +  Math.random(),2
    ,NaN,value_size_of_name_for_manager_stamp,value_size_of_posision_for_manager_stamp,has_date);
  }
} 
// function preview image
function handleFileSelect(event) {
   var input = this;
   if (input.files && input.files.length) {
       var reader = new FileReader();
       this.enabled = false
       reader.onload = (function (e) {
           $("#preview").html(['<img class="thumb" src="', e.target.result, '" title="', escape(e.name), '"/><span class="remove_img_preview"></span>'].join(''))
       });
       reader.readAsDataURL(input.files[0]);
   }
}

function ShowHideMess() {
  $('#msg_id').fadeIn(1000);
  setTimeout(function() { 
      $('#msg_id').fadeOut(1000); 
  }, 5000);
}

function change_theme(id){
  var color_theme = $(id).next().attr("data-item-id");
    $.ajax({
      type: 'GET',
      url: window.location.origin+"/update_theme",
      dataType: 'script',
      data: {
        color_theme: color_theme
      },
      success: function(data, textStatus, jqXHR){
        console.log("Dynamic group select OK!")
      },
      error:function(jqXHR, textStatus, errorThrown){
        console.log("Error")
      }
    });
}