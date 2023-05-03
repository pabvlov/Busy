import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-goto',
  templateUrl: './btn-goto.component.html',
  styleUrls: ['./btn-goto.component.scss']
})
export class BtnGotoComponent {
  @Input() label: string = '';
}
