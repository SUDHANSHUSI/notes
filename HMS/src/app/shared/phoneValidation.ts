import { AbstractControl } from '@angular/forms';

const PHONE_REGEX = /^[0-9]*$/;

export function phoneValidator(phoneNum:string){

return function(form:AbstractControl){
  const phoneNumValue=form.get(phoneNum)?.value;

  const valid=PHONE_REGEX.test(phoneNumValue);
  if(PHONE_REGEX.test(phoneNumValue)){
    return null 
  }else{
   return { 'invalidPhone': true };
  }
}

    // return (control: AbstractControl): {[key: string]: any} | null => {
    //   const valid = PHONE_REGEX.test(control.value);
    //   return valid ? null : { 'invalidPhone': true };
    // };
  }


//   import { AbstractControl} from "@angular/forms";

// export function matchPasswordValidator(password:string,confirmPassword:string) {

//     return function(form:AbstractControl){
//         const passwordValue=form.get(password)?.value
//         const confirmPasswordValue=form.get(confirmPassword)?.value

//         if(passwordValue === confirmPasswordValue){
//             return null;
//         }
//         return { passwordMismatch: true}
//     }
//   }
  