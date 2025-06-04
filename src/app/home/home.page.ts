import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { ResumeComponent } from './resume/resume.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private userService = inject(UserService);
  private modalCtrl = inject(ModalController);

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
      name:     ['', Validators.required],
      lastName: ['', Validators.required],
      country:  ['', Validators.required],
      city:     ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d+\s\d+$/)]],
      email:    ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]]
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
      // this.userService.saveUser({ userInfo: this.form.value }).subscribe();
      this.showResume();


    } else {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
    }
  }

  // onPhoneInput(event: any): void {
  //   const input = event.target as HTMLInputElement;
  //   const digitsOnly = input.value.replace(/\D/g, '');
  //   input.value = digitsOnly;
  //   this.form.get('phoneNumber')?.setValue(('+'+digitsOnly), { emitEvent: false });
  // }

  async showResume() {
    const modal = await this.modalCtrl.create({
    component: ResumeComponent,
      componentProps: {
        userInfo: this.form.value
      },
      cssClass: 'summary-modal'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.close) {
      this.form.reset();
      this.step = 0;
    }
  }
}

