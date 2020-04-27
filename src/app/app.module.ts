import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { ResizableGridDirective } from './resizable-grid.directive';



@NgModule({
  imports:      [ BrowserModule, FormsModule, IonicModule.forRoot() ],
  declarations: [ AppComponent, ResizableGridDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
