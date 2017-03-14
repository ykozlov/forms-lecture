import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactiveComponent} from './reactive.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, AbstractControl, FormControl} from "@angular/forms";
import {User} from "../user.interface";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('ReactiveComponent', () => {
  let component: ReactiveComponent;
  let fixture: ComponentFixture<ReactiveComponent>;
  let validFormValue: User;
  let errorElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    validFormValue = {
      name: 'Yegor',
      email: 'yegor@gmail.com',
      confirm: 'yegor@gmail.com',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('user form testing', () => {
    it('should have userGroup', () => {
      expect(component.userForm).not.toBeNull();
    });

    it('should has valid form if value is true', () => {
      component.userForm.setValue(validFormValue);
      fixture.detectChanges();

      expect(component.userForm.invalid).toBeFalsy();
    });

    it('should not display any error if form is valid',() => {

      component.userForm.setValue(validFormValue);
      fixture.detectChanges();
    });

    it('should not display any error if form is valid',() => {
      component.userForm.setValue(validFormValue);
      markAllDirty(component.userForm);
      markAllTouched(component.userForm);
      fixture.detectChanges();
      errorElement = fixture.debugElement.query(By.css('.error'));
      expect(errorElement).toBeNull();
    });


    describe('name field testing', () => {
      it('should be display name required error if name isn`t set',() => {
        const errorMsg = 'Name is required';
        validFormValue.name = '';
        component.userForm.setValue(validFormValue);
        component.userForm.get('name').markAsTouched();
        fixture.detectChanges();
        errorElement = fixture.debugElement.query(By.css('.error'));

        expect(errorElement.nativeElement.textContent).toContain(errorMsg);
      });

      it('should be display name min length error if name length less than 2',() => {
        const errorMsg = 'Minimum of 2 characters';

        validFormValue.name = 'Y';
        component.userForm.setValue(validFormValue);
        component.userForm.get('name').markAsDirty();
        fixture.detectChanges();

        errorElement = fixture.debugElement.query(By.css('.error'));

        expect(errorElement.nativeElement.textContent).toContain(errorMsg);
      });
    });

    describe('email field testing', () => {
      it('should be invalid if email isn`t set',() => {
        const errorMsg = 'Email is required';

        validFormValue.email = '';
        component.userForm.setValue(validFormValue);
        component.userForm.get('email').markAsTouched();
        fixture.detectChanges();
        errorElement = fixture.debugElement.query(By.css('.error'));

        expect(errorElement.nativeElement.textContent).toContain(errorMsg);
      });

      it('should be invalid if value is not correct',() => {
        const errorMsg = 'Email value is wrong';

        validFormValue.email = 'test';

        component.userForm.setValue(validFormValue);
        component.userForm.get('email').markAsDirty();
        fixture.detectChanges();
        errorElement = fixture.debugElement.query(By.css('.error'));

        expect(errorElement.nativeElement.textContent).toContain(errorMsg);
      });

    });

    describe('confirm field testing',() => {
      // it('should be invalid if confirm isn`t set',() => {
      //   validFormValue.confirm = '';
      //   component.userForm.setValue(validFormValue);
      //   fixture.detectChanges();
      //
      //   expect(component.userForm.invalid).toBeTruthy();
      // });
      //
      // it('should be invalid email and confirm fields are not equal',() => {
      //   validFormValue.email = 'test@gmail.com';
      //   validFormValue.confirm = 'yegor@gmail.com';
      //
      //   component.userForm.setValue(validFormValue);
      //   fixture.detectChanges();
      //
      //   expect(component.userForm.invalid).toBeTruthy();
      // });
    });


  });

});

function markAllDirty(control: AbstractControl) {
  if(control.hasOwnProperty('controls')) {
    control.markAsDirty(true);
    let ctrl = <any>control;
    for (let inner in ctrl.controls) {
      markAllDirty(ctrl.controls[inner] as AbstractControl);
    }
  }
  else {
    (<FormControl>(control)).markAsDirty(true);
  }
}

function markAllTouched(control: AbstractControl) {
  if(control.hasOwnProperty('controls')) {
    control.markAsTouched(true);
    let ctrl = <any>control;
    for (let inner in ctrl.controls) {
      markAllTouched(ctrl.controls[inner] as AbstractControl);
    }
  }
  else {
    (<FormControl>(control)).markAsTouched(true);
  }
}
