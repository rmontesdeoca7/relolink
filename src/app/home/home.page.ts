import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
steps = ['A', 'B', 'C', 'D', 'E', 'F'];
  options = ['Option 1', 'Option 2', 'Option 3'];

  formValues: { [key: string]: string } = {};

  form: FormGroup;
  step = 0;

  countries = ['Argentina', 'Mexico'];
  citiesMap = {
    Argentina: ['Buenos Aires', 'Rosario'],
    Mexico: ['Ciudad de México', 'Juárez']
  };

  constructor(private fb: FormBuilder,
    // private userService: UserService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d+\s\d+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get currentCityOptions(): string[] {
    return this.citiesMap[this.form.value.country as keyof typeof this.citiesMap] || [];
  }

  nextStep(): void {
    if (this.step === 2) {
      this.form.patchValue({
        phoneNumber: this.form.value.country === 'Argentina' ? '+54 ' : '+52 '
      });
    }
    const control = this.getControlByStep(this.step);
    if (control && control.valid) {
      this.step++;
    } else if (control) {
      control.markAsTouched();
    }
  }

  prevStep(): void {
    if (this.step > 0) {
      this.step--;
    }
  }

  getControlByStep(step: number) {
    const controlMap = ['name', 'lastName', 'country', 'city', 'phoneNumber', 'email'];
    return this.form.get(controlMap[step]);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // this.userService.saveUser({ userInfo: this.form.value }).subscribe();
    } else {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
    }
  }
}

