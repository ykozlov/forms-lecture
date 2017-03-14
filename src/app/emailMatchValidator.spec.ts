import {FormGroup, FormBuilder, ValidatorFn} from "@angular/forms";
import {emailMatchValidator} from "./emailMatchValidator";
describe('emailMatchValidator',() => {

  let formBuilder: FormBuilder;
  let formGroup: FormGroup;
  let validatorFn: ValidatorFn;

  beforeAll(() => {
    formBuilder = new FormBuilder();
    validatorFn = emailMatchValidator('email','confirm');
  });

  it('should return null if some control is not defined', () => {
    formGroup = formBuilder.group({
      email: '',
      name: ''
    });

    expect(validatorFn(formGroup)).toBeNull();
  });

  it('should return null if values aren`t defined', () => {
    formGroup = formBuilder.group({
      email: 'test',
      confirm: 'test'
    });
    expect(validatorFn(formGroup)).toBeNull();
  });

  it('should return null if values are equal',() => {
    formGroup = formBuilder.group({
      email: 'test',
      confirm: 'test'
    });
    expect(validatorFn(formGroup)).toBeNull();
  });

  it('should return null if values are not equal',() => {
    formGroup = formBuilder.group({
      email: 'test1',
      confirm: 'test'
    });
    expect(validatorFn(formGroup)).toEqual({
      nomatch: true
    });
  });
});
