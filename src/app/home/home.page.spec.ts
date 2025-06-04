import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        IonicModule.forRoot()],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      name: '', lastName: '', country: '', city: '', phoneNumber: '', email: ''
    });
  });

  it('should patch phone number with country code on country change', () => {
    component.form.patchValue({ country: 'Argentina' });
    component.nextStep();
    component.nextStep();
    expect(component.form.get('phoneNumber')?.value).toBe('');
  });
});
