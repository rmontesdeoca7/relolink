import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ResumeComponent {
  @Input() userInfo: any;

  constructor(private ModalController: ModalController) {}

  close():void {
    this.ModalController.dismiss({close: true});
  }
}
