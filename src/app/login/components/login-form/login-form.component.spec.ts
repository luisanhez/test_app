import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let emailInput: AbstractControl;
  let passwordInput: AbstractControl;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      emailInput = component.email;
      passwordInput = component.email;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email should match with the regular expression', () => {
    emailInput.setValue('email@gmail.com');

    expect(emailInput.errors).toBeFalsy();
  });

  it('should show error if email does not match with the regular expression on submit', () => {
    emailInput.setValue('email@gmail');

    submitForm();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.queryAll(
      By.css('.error-message')
    )[0].nativeNode.innerText;

    expect(emailInput.errors).toBeTruthy();
    expect(errorMessage).toEqual(component.ERROR_MESSAGES.email);
  });

  it('should show error if password does not match with the min length on submit', () => {
    passwordInput.setValue('pass');

    submitForm();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.queryAll(
      By.css('.error-message')
    )[1].nativeNode.innerText;

    expect(passwordInput.errors).toBeTruthy();
    expect(errorMessage).toEqual(component.ERROR_MESSAGES.password);
  });

  function submitForm() {
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', {});
  }
});
