import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {User} from "../user.interface";
import {emailMatchValidator} from "../emailMatchValidator";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  userForm: FormGroup;
  user: User;

  ngOnInit() {
    // this.userForm = new FormGroup({
    //   name: new FormControl(''),
    //   email: new FormControl(''),
    //   confirm: new FormControl('')
    // });
    // this.userForm = this.formBuilder.group({
    //   name: [''],
    //   email: [''],
    //   confirm: ['']
    // })
    this.user = {
      name: '',
      email: '',
      confirm: ''
    };

    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.pattern(emailRegex)]],
      confirm: [this.user.confirm, [Validators.required, Validators.pattern(emailRegex)]]
    }, {validator: emailMatchValidator('email','confirm')});
  }


  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    this.user = value;
  }

}
