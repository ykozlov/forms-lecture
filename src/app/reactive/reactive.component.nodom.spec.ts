import {ReactiveComponent} from "./reactive.component";
import {FormBuilder} from "@angular/forms";
import {User} from "../user.interface";

describe('testing reactive form without DOM', () => {
  let reactiveComponent: ReactiveComponent;
  let formBuilder: FormBuilder;
  let validFormValue: User;

  beforeAll(() => {
    formBuilder = new FormBuilder();
  });

  beforeEach(() => {
    reactiveComponent = new ReactiveComponent(formBuilder);
    validFormValue = {
      name: 'Yegor',
      email: 'yegor@gmail.com',
      confirm: 'yegor@gmail.com',
    };
    reactiveComponent.ngOnInit();
  });

  it('should have user form', () => {
    expect(reactiveComponent.userForm).not.toBeNull();
  });

  it('should have invalid initial form state', () => {
    expect(reactiveComponent.userForm.invalid).toBeTruthy();
  });

  it('should have valid form if value is valid', () => {
    reactiveComponent.userForm.setValue(validFormValue);
    expect(reactiveComponent.userForm.valid).toBeTruthy();
  });

  describe('name field testing', () => {
    it('should be invalid if name isn`t set', () => {
      validFormValue.name = '';
      reactiveComponent.userForm.setValue(validFormValue);

      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });

    it('should be invalid if name has length less than 2', () => {
      validFormValue.name = 'Y';
      reactiveComponent.userForm.setValue(validFormValue);

      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });
  });

  describe('email field testing', () => {
    it('should be invalid if email isn`t set', () => {
      validFormValue.email = '';
      reactiveComponent.userForm.setValue(validFormValue);

      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });

    it('should be invalid if value is not correct', () => {
      validFormValue.email = 'test';
      validFormValue.confirm = 'test';

      reactiveComponent.userForm.setValue(validFormValue);

      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });

  });

  describe('confirm field testing', () => {
    it('should be invalid if confirm isn`t set', () => {
      validFormValue.confirm = '';
      reactiveComponent.userForm.setValue(validFormValue);

      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });

    it('should be invalid email and confirm fields are not equal', () => {
      validFormValue.email = 'test@gmail.com';
      validFormValue.confirm = 'yegor@gmail.com';

      reactiveComponent.userForm.setValue(validFormValue);
      expect(reactiveComponent.userForm.invalid).toBeTruthy();
    });
  });

});
