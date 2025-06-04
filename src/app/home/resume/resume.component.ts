import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonContent, IonItem, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-summary',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ResumeComponent {
  @Input() userInfo: any;
}
