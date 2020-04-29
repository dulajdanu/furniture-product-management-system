import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'ngx-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  usremail: string = "";
  phoneNum: string = "0776396993";

  constructor(private fb: FormBuilder) {
    this.usremail = localStorage.getItem('email');
    console.log(this.usremail);
  }


  requestForm = new FormGroup({
    email: new FormControl({ value: localStorage.getItem('email'), disabled: true }, [Validators.required, Validators.email]),
    phone: new FormControl({ value: "077639690", disabled: true }, Validators.required),
    methodOfContact: new FormControl('', Validators.required),
    checkTypes: this.fb.array([], Validators.required)
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

  options = [
    { value: 0, label: 'Phone' },
    { value: 1, label: 'E mail' },];


  types: Array<any> = [
    { name: 'Gate', value: 0 },
    { name: 'Door', value: 1 },
    { name: 'Hand-Rail', value: 2 },


  ];
  get methodOfContact() {
    return this.requestForm.get('methodOfContact');
  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.requestForm.value);
  }

}
