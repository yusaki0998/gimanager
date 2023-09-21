var borderWidth = 2,color = 'red';
function DrawStamp(txtName,txtPosition,isSquare,parent,idChild,typeofStamp,fontSizePersonal,fontSizemanagerName,fontSizemanagerPosition,has_date)
{
	if(typeofStamp==1) {
		var textResult = txtName;
		var size = 70;
		var canvas = document.createElement("canvas");
		canvas.id=idChild;   
		canvas.className="c_stamp_personal";
		canvas.width = canvas.height =size;

		var context = canvas.getContext('2d');
	 	context.lineWidth = borderWidth;
   	context.strokeStyle = color;
  	context.font = fontSizePersonal+'pt HG正楷書体-PRO';
		
		parent.appendChild(canvas);
    if(textResult.includes("(") && textResult.includes(")"))
    {
      DrawPersonalStamp_SpecialQuote(size,textResult,context);
    }
    else{
      if(textResult.includes("_"))
      {
        DrawThree_TextDrawPersonalStamp(size, textResult, context);
      }
      else{
        if(textResult.length == 1){
          DrawOneCharacterDrawPersonalStamp(size,textResult,context);
        }
        else if(textResult.length == 2){
          canvas=DrawTwoCharacterDrawPersonalStamp(size, textResult, context);
        }
        else if(textResult.length == 3){
          DrawThreeCharacterDrawPersonalStamp(size, textResult, context);
        }
        else if(textResult.length == 4){
          DrawPersonalStamp4Characters(size, textResult, context);
        }
        else if(textResult.length == 5){
          DrawPersonalStamp5Characters(size, textResult, context);
        }
        else if(textResult.length == 6){
          DrawPersonalStamp6Characters(size, textResult, context);
        }
      }
     
    }

		
	}

	if(typeofStamp==2) {
    var size = 100;
    if(has_date) size = 70;
		var c = document.createElement("canvas");
		c.id=idChild;   
		c.className="c_stamp_manager";
		c.width = c.height =size;

		var context = c.getContext('2d');
		context.lineWidth = borderWidth;
   	context.strokeStyle = color;
  	//context.font = '25pt HG正楷書体-PRO';
		
		parent.appendChild(c);

  	var centerX = c.width / 2;
  	var centerY = c.width / 2;
  	var r = c.width / 2 - context.lineWidth - 5;
    
    context.clearRect(centerX - r - context.lineWidth, 
      centerY - r - context.lineWidth, 
      r * 2 + (context.lineWidth*2), 
      r * 2 + (context.lineWidth*2));		
    if(has_date)
    {
      if(isSquare == 'true'){
        DrawTextDrawTitleStamp_NoDate_square(size, txtPosition, txtName, context,fontSizemanagerName,fontSizemanagerPosition);
      }
      else{
        DrawTextDrawTitleStamp_NoDate(size, txtPosition, txtName, context,fontSizemanagerName,fontSizemanagerPosition);
      }
      
    }
    else
    {
      if(isSquare == 'true'){
        DrawTextDrawManagementStamp(size, txtPosition, txtName, context,fontSizemanagerName,fontSizemanagerPosition);
      }
      else{
        DrawTextDrawTitleStamp(size,txtPosition, txtName,context,fontSizemanagerName,fontSizemanagerPosition);
      }
      DrawDateForManagerStamp(size,context);
    }

    }
		
}

// personal stamp ->start
//------------------------------------
function DrawPersonalStamp_SpecialQuote(h,txtStamp,context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;
  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0,2*Math.PI, false);
  context.fillStyle = color;
  //context.font = '20pt HG正楷書体-PRO';
  context.textAlign = 'center';  
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var firstText = txtStamp.split('(')[0];
  var lastText = txtStamp.split('(')[1].split(')')[0];
  context.fillText(firstText, centerX, centerY - 0.5*h/3 + context.lineWidth);
  var bracket = "（"+`${lastText}`+"）";
  context.font='10pt HG正楷書体-PRO';
  context.fillText(bracket, centerX, centerY + 0.5*2*h/3 - context.lineWidth);

  context.stroke(); 
}  
function DrawOneCharacterDrawPersonalStamp(h,oneCharacter,context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;
  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth , 0, 2 * Math.PI, false);
  //context.font = '35pt HG正楷書体-PRO';
  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';
  context.fillText(oneCharacter, centerX, centerY);
  context.stroke();   
}    
function DrawTwoCharacterDrawPersonalStamp(h,twoCharacter, context) {
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;
  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0,2*Math.PI, false);
  context.fillStyle = color;
  //context.font = '20pt HG正楷書体-PRO';
  context.textAlign = 'center';  
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var text = twoCharacter.split('').join('\n');
  var lines = text.split('\n');
  context.fillText(lines[0], centerX, centerY - 0.5*h/2 + context.lineWidth);
  
  context.fillText(lines[1], centerX, centerY + 0.5*h/2 - context.lineWidth);
  // for (var i = 0; i<lines.length; i++){
  //   context.fillText(lines[i], centerX, centerY - 0.4*radius + 0.8*radius*i);
  // }
  context.stroke();
}
function DrawThreeCharacterDrawPersonalStamp(h,threeCharacter, context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;

  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
  
  //context.font = '14pt HG正楷書体-PRO';
  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var text = threeCharacter.split('').join('\n');
  var lines = text.split('\n');
  context.fillText(lines[0], centerX, centerY - 0.6*radius - context.lineWidth);
  context.fillText(lines[1], centerX, centerY - 0.6*radius + 0.6*radius);
  context.fillText(lines[2], centerX, centerY - 0.6*radius + 0.6*radius*2 + context.lineWidth);
  // for (var i = 0; i<lines.length; i++){
  //  context.fillText(lines[i], centerX, centerY - 0.6*radius + 0.6*radius*i);
  // }
  context.stroke();
}
function DrawThree_TextDrawPersonalStamp(h, threeText, context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;
  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
  context.lineWidth = 2;

  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var replaceText = threeText.replace("_","");
  var result;
  // context.fillText(replaceText[0], centerX, 3/4*h * 1/2 *1/2  - context.lineWidth);
  // context.fillText(replaceText[1], centerX, 3/4*h * 1/2 + 1/2 * 3/4*h * 1/2);
  // var bracket = "（"+`${replaceText[2]}`+"）";
  //   result = replaceText[i].replace(replaceText[2], bracket);
  // context.font='10pt HG正楷書体-PRO';

  // context.fillText(result, centerX, 3/4*h +  1/2*h/4);
  var posY=0;
  for(var i=0; i<replaceText.length; i++){
    if(i==2){
      context.font='10pt HG正楷書体-PRO';
    }
    var bracket = "（"+`${replaceText[2]}`+"）";
    result = replaceText[i].replace(replaceText[2], bracket);
    
    if(i==0) posY = 3/4*h * 1/2 *1/2  + context.lineWidth;
    if(i==1) posY = 3/4*h * 1/2 + 1/2 * 3/4*h * 1/2;
    if(i==2) posY = 3/4*h +  1/2*h/4- context.lineWidth;
    context.fillText(result, centerX, posY);
  }
  context.stroke();
}
function DrawPersonalStamp4Characters(h,threeCharacter, context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;

  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
  
  //context.font = '14pt HG正楷書体-PRO';
  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var text = threeCharacter.split('').join('\n');
  var lines = text.split('\n');
  context.fillText(lines[0], centerX + centerX/2 - 6, centerY - 0.4*radius - context.lineWidth);
  context.fillText(lines[1], centerX + centerX/2 - 6, centerY + 0.3*radius + context.lineWidth + 2);
  context.fillText(lines[2], centerX - centerX/2 + context.lineWidth + 2, centerY - 0.4*radius - context.lineWidth);
  context.fillText(lines[3], centerX - centerX/2 + context.lineWidth + 2, centerY + 0.3*radius + context.lineWidth + 2);
 
  context.stroke();
}
function DrawPersonalStamp5Characters(h,threeCharacter, context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;

  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);

  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var text = threeCharacter.split('').join('\n');
  var lines = text.split('\n');
  context.fillText(lines[0], centerX + centerX/2 - 6, centerY - centerY/2 - context.lineWidth + 1);
  context.fillText(lines[1], centerX + centerX/2 - 6, centerY - context.lineWidth + 1);
  context.fillText(lines[2], centerX + centerX/2 - 6, centerY + centerY/2 + 1);

  context.fillText(lines[3], centerX - centerX/2 + context.lineWidth + 2, centerY - centerY/2 - context.lineWidth + 1);
  context.fillText(lines[4], centerX - centerX/2 + context.lineWidth + 2, centerY - context.lineWidth + 1);
  context.stroke();
}
function DrawPersonalStamp6Characters(h,threeCharacter, context){
  var centerX = h / 2;
  var centerY = h / 2;
  var radius = h / 2 - context.lineWidth - 2;

  context.beginPath();
  context.arc(centerX, centerY, radius + context.lineWidth, 0, 2*Math.PI, false);
  
  // context.font = '14pt HG正楷書体-PRO';
  context.textAlign = 'center';
  context.fillStyle = color;
  // Defining the `textBaseline`… 
  context.textBaseline = 'middle';

  var text = threeCharacter.split('').join('\n');
  var lines = text.split('\n');
  context.fillText(lines[0], centerX + centerX/2 - 6, centerY - centerY/2 - context.lineWidth + 1);
  context.fillText(lines[1], centerX + centerX/2 - 6, centerY - context.lineWidth + 1);
  context.fillText(lines[2], centerX + centerX/2 - 6, centerY + centerY/2 + 1);

  context.fillText(lines[3], centerX - centerX/2 + context.lineWidth + 2, centerY - centerY/2 - context.lineWidth + 1);
  context.fillText(lines[4], centerX - centerX/2 + context.lineWidth + 2, centerY - context.lineWidth + 1);
  context.fillText(lines[5], centerX - centerX/2 + context.lineWidth + 2, centerY + centerY/2 + 1);
  context.stroke();
}
//------------------------------------
// personal stamp -> end

// manager stamp ->start
//------------------------------------
function DrawTextDrawTitleStamp_NoDate_square(h ,idPosition, idNameStaff,context,szName,szPosition){
  var d = context.lineWidth;
  var scale = 0.5;
  var centerX = h / 2;
  context.beginPath();
  
  context.rect(d, d, h - 2*d , h - 2*d);
  
  context.moveTo(d,  h*scale -context.lineWidth);
  context.lineTo(h - d,  h*scale -context.lineWidth);

  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  var name_length = idPosition.length;
  context.font=szPosition+'pt HG正楷書体-PRO';
  context.fillText(idPosition, centerX,h*scale/2 - context.lineWidth+1);

  // var name_end = input_text.slice(0, 2);
  context.font=szName+'pt HG正楷書体-PRO';
  context.fillText(idNameStaff, centerX,h-h*scale/2 - context.lineWidth+1);

  context.stroke();
}
function DrawTextDrawManagementStamp(h ,idPosition, idNameStaff,context,szName,szPosition){
  var d = context.lineWidth;
  var scale = 0.36;
  var centerX = h / 2;
  context.beginPath();
  
  context.rect(d, d, h - 2*d , h - 2*d);
  
  context.moveTo(d,  h*scale -context.lineWidth);
  context.lineTo(h - d,  h*scale -context.lineWidth);

  context.moveTo(d, h -h*scale +context.lineWidth);
  context.lineTo(h - d, h - h*scale +context.lineWidth);

  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  var name_length = idPosition.length;
  context.font=szPosition+'pt HG正楷書体-PRO';
  context.fillText(idPosition, centerX,h*scale/2 - context.lineWidth+1);

  // var name_end = input_text.slice(0, 2);
  context.font=szName+'pt HG正楷書体-PRO';
  context.fillText(idNameStaff, centerX,h-h*scale/2 - context.lineWidth+1);

  context.stroke();
}
function DrawTextDrawTitleStamp(h, txtPosition, txtNameStaff,context,szName,szPosition){
 
  var centerX = h / 2;
  var centerY = h / 2;
  var r = h / 2 - context.lineWidth - 2;
  var scale = 0.36;
  context.beginPath();
  context.arc(centerX, centerY, r + context.lineWidth, 0, 2*Math.PI, false);
  
  context.moveTo(3 + (r - r*Math.sqrt(15)/4), h*scale -context.lineWidth);
  context.lineTo(5 + r + r*Math.sqrt(15)/4, h*scale -context.lineWidth);

  context.moveTo(context.lineWidth + (r - r*Math.sqrt(15)/4), h - h*scale +context.lineWidth);
  context.lineTo(5 + r + r*Math.sqrt(15)/4,  h - h*scale +context.lineWidth);  
  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  //var name_length = txtPosition.length;

  //changeSizeForMagerCircle(context, idNameStaff.length);
  context.font=szName+'pt HG正楷書体-PRO';
  context.fillText(txtNameStaff, centerX,h-h*scale/2 - context.lineWidth);
  context.font=szPosition+'pt HG正楷書体-PRO';
  if(txtPosition.includes("_")){
    var cut_text = txtPosition.split('_');
    
    for(var i = 0; i<cut_text.length; i++){
     // changeSizeForMagerCircle(context, name_length)
      
      if(i==0)
      {
        context.fillText(cut_text[i], centerX,r/5 + context.lineWidth + 5 + r/3*i - 4);
      }
      else
      {
        context.fillText(cut_text[i], centerX,r/5 + context.lineWidth + 5 + r/3*i - 7);
      }
      
    }
  }
  else{
    //changeSizeForMagerCircle(context, name_length)
    context.fillText(txtPosition, centerX, 2*r/3 * 1/2 +context.lineWidth+2);
  }
  context.stroke();
}
function DrawDateForManagerStamp(h, context)
{
  var centerX = h / 2;
  var centerY = h / 2;
  var r = h / 2 - context.lineWidth - 2;

  context.beginPath();  
  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
 
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  var month = String(m_date.month) ;
  if(m_date.month<10) month="0"+month;

  var day = String(m_date.day) ;
  if(m_date.day<10) day="0"+day;

  var date_string = "'" + m_date.year%2000 + '.' + month + '.' +  day ;

  context.font = '13pt HG正楷書体-PRO';
  context.fillText(date_string, centerX, centerY - context.lineWidth+1);  
  context.stroke();
}
//------------------------------------
// manager stamp ->start
function changeSizeForMagerCircle(context, n){
  if(n==1){
      context.font = '16pt HG正楷書体-PRO';
  }
  if(n==2){
      context.font = '16pt HG正楷書体-PRO';
  }
  if(n==3){
      context.font = '12pt HG正楷書体-PRO';
  }
  if(n==4){
      context.font = '10pt HG正楷書体-PRO';
  }
  if(n>=5){
      context.font = '8pt HG正楷書体-PRO';
  }
}
function changeSize(context, n){
  if(n==1){
      context.font = '18pt HG正楷書体-PRO';
  }
  if(n==2){
      context.font = '18pt HG正楷書体-PRO';
  }
  if(n==3){
      context.font = '16pt HG正楷書体-PRO';
  }
  if(n==4){
      context.font = '14pt HG正楷書体-PRO';
  }
  if(n>=5){
      context.font = '11pt HG正楷書体-PRO';
  }
}
function DrawTextDrawTitleStamp_NoDate(h, txtPosition, txtNameStaff,context,szName,szPosition){
 
  var centerX = h / 2;
  var centerY = h / 2;
  var r = h / 2 - context.lineWidth - 2;
  context.beginPath();
  context.arc(centerX, centerY, r + context.lineWidth, 0, 2*Math.PI, false);
  
  context.moveTo(context.lineWidth, r);
  context.lineTo(h-context.lineWidth, r);

  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  //var name_length = txtPosition.length;

  //changeSizeForMagerCircle(context, idNameStaff.length);
  context.font=szName+'pt HG正楷書体-PRO';
  context.fillText(txtNameStaff, centerX,h-h/4 - context.lineWidth - 4);
  context.font=szPosition+'pt HG正楷書体-PRO';
  if(txtPosition.includes("_")){
    var cut_text = txtPosition.split('_');
    
    for(var i = 0; i<cut_text.length; i++){
     // changeSizeForMagerCircle(context, name_length)
      
      if(i==0)
      {
        context.fillText(cut_text[i], centerX,h/6);
      }
      else
      {
        context.fillText(cut_text[i], centerX,h/3);
      }
      
    }
  }
  else{
    //changeSizeForMagerCircle(context, name_length)
    context.fillText(txtPosition, centerX, h/4 );
  }
  context.stroke();
}
function ShowHideMess() {
  $('#msg_id').fadeIn(1000);
  setTimeout(function() { 
      $('#msg_id').fadeOut(1000); 
  }, 5000);
}
