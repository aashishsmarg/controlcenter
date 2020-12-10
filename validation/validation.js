const db = require("../models");

exports.checkKeyValue = (req, keyArray) => {
  let absentKeyInRequest = '';
  keyArray.forEach(key => { 
    if(key in req){
   }else{
        absentKeyInRequest+= key+", ";
    }
  });
 if(absentKeyInRequest.length>0){
    return "Values for following keys are required:"+absentKeyInRequest;
 }else{
    let absentValueInRequest='';
    keyArray.forEach(key => { 
       if(req[key] == '' || req[key] == null || req[key] == "")
        {
        absentValueInRequest+= key+", ";
        }
    });		
   if(absentValueInRequest.length>0){	
        // If absentKeyInRequest variable length is greater then 0 then return error.
        return "Values for following keys are required:"+absentValueInRequest;
   }else{
        // If absentKeyInRequest variable length is 0 then return true.
        return true;		
    }
 }
  return absentKeyInRequest;
      
}
function requestValueCheck(requestArray,keyCompareArray) {
   
		

}

