import { Component, OnInit } from '@angular/core';
import {User} from "../user.interface";

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    confirm: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    this.user = value;
  }
}
