import { Component, Renderer2 } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(public renderer: Renderer2) {}
}
