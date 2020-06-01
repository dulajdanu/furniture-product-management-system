import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { HomeComponent } from '../home/home.component';
import * as firebase from 'firebase';

@Component({
  selector: 'ngx-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  usremail: string = "";
  phoneNum: string = "0776396993";
  description: string = ""; //this is used if the user selected the other option


  constructor(private fb: FormBuilder, private uService: UserService) {
    this.usremail = localStorage.getItem('email');
    console.log(this.usremail);
  }


  requestForm = new FormGroup({
    email: new FormControl({ value: localStorage.getItem('email'), disabled: true }, [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,]),
    methodOfContact: new FormControl('', Validators.required),
    checkTypes: this.fb.array([], Validators.required),
    descriptionOfOrder: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  onCheckboxChange(e) {
    const checkArray: FormArray = this.requestForm.get('checkTypes') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  checkOtherType(): boolean {
    let typesArr: Array<string> = this.requestForm.get('checkTypes').value;
    let flag: number = 0;
    typesArr.forEach(element => {
      if (element == '7') {
        flag = 1;
      }

    });

    if (flag == 0) {
      return false;
    } else {
      return true;
    }
  }

  options = [
    { value: 0, label: 'Phone' },
    { value: 1, label: 'E mail' },];


  types: Array<any> = [
    { name: 'Gate', value: 0 },
    { name: 'Door', value: 1 },
    { name: 'Hand-Rail', value: 2 },
    { name: 'Table', value: 3 },
    { name: 'Chair', value: 4 },
    { name: 'Wall-Art', value: 5 },
    { name: 'Window Grill', value: 6 },
    { name: 'Other', value: 7 },







  ];

  get email() {
    return this.requestForm.get('email');
  }

  get methodOfContact() {
    return this.requestForm.get('methodOfContact');
  }

  get descriptionOfOrder() {
    return this.requestForm.get('descriptionOfOrder');
  }
  get address() {
    return this.requestForm.get('address');
  }

  ngOnInit(): void {
  }
  onSubmit(val) {
    // console.log(val['email']);

    let date: Date = val['date'];
    let pipe = new DatePipe('en-US'); // Use your own locale

    let formatDate = pipe.transform(date, 'MM-dd-y');
    // console.log(formatDate);

    val['email'] = localStorage.getItem('email');
    // val['phone'] = "0776396993"; //change this to phone number of the user
    val['date'] = formatDate; //change the date to a readable format
    val['status'] = 0 //0 is used to show the status of the appointment is pending
    val['dateAdded'] = firebase.firestore.FieldValue.serverTimestamp(); //this is used to find in which time the document was added
    if ((this.checkOtherType() == true) && (this.description != '')) {
      val['desOfOtherType'] = this.description;

      this.uService.addewAppointment(val);



    }
    else {
      this.uService.addewAppointment(val);

    }




  }

}
