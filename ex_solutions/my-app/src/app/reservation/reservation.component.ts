import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Reservation } from '../common/data/reservation';

@Component({
  selector: 'app-reservation',
  imports:[ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  resaForm: FormGroup; //NB: formGroup require ReactiveFormsModule in app.module.ts
  reservation = new Reservation(); //(default) data to display and to retreive from form
  message : string ="";
  
  constructor(private _formBuilder: FormBuilder) {
    this.resaForm = this._formBuilder.group({
      firstName: [this.reservation.firstName, Validators.required],
      lastName: [this.reservation.lastName, [Validators.required,Validators.pattern('[A-Z].+')]],
      telephone: [this.reservation.telephone, [Validators.required , Validators.minLength(10)]],
      email: [this.reservation.email, [Validators.required, Validators.email]],
      date:[ /*'2024-09-01' */this.dateAsString(this.reservation.dateTime), [Validators.required , Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
      time: [ /*'14:30' */ this.localTimeAsString(this.reservation.dateTime), [Validators.required , Validators.pattern('[0-9]{2}:[0-9]{2}.*')]]
      //dateTime[ /*'2024-09-01T14:30' */ ((new Date()).toISOString()).substring(0,16), [Validators.required , Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}.*')]]: [ /*'2024-09-01T14:30' */ ((new Date()).toISOString()).substring(0,16), [Validators.required , Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}.*')]]
      });
  }

  myFieldErrorMessage(fieldName:string,fieldExpectation:string=""){
    const myForm= this.resaForm;
    //myForm.controls[fieldName].invalid && (myForm.controls[fieldName].dirty || myForm.controls[fieldName].touched)
    let errMsg="";
    const vErrors : ValidationErrors | null = myForm.controls[fieldName].errors;
    if(vErrors!=null){
       console.log(JSON.stringify(vErrors));
       if(vErrors['required']===true) 
           errMsg=`${fieldName} is required`;
      else if(vErrors['minlength']) 
        errMsg=`${fieldName}.minLength=${vErrors['minlength'].requiredLength}`;
      else if(vErrors['email']===true) 
        errMsg=`${fieldName} should be a valid email with ...@...`;
      else 
           errMsg=`${fieldName} ${fieldExpectation}`;
    }
    return errMsg;
  }

  localTimeAsString(d:Date){
    return  d.toTimeString().split(' ')[0].substring(0,5);
  }

  dateAsString(d:Date){
    return  d.toISOString().split('T')[0];
  }


  dateTimeFromDateAndLocalTime(sDate:string , sLocalTime:string):Date{
     let [HH,MM] = sLocalTime.split(':')
     return new Date(`${sDate}T${HH}:${MM}`)
  }
  
  onReservation(){
    const r = this.resaForm.value; //rawFormValuesObject
    this.reservation = new Reservation(r.firstName , r.lastName , r.telephone , 
                                        r.email , this.dateTimeFromDateAndLocalTime(r.date,r.time) ); 
    this.message="résa effectuée=" + JSON.stringify(this.reservation);
  }

}
