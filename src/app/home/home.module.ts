import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ResumeComponent } from './resume/resume.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule,
    ResumeComponent
  ],
  providers: [UserService],
  declarations: [HomePage]
})
export class HomePageModule {}
