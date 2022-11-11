import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsAppPageRoutingModule } from './forms-app-routing.module';

import { FormsAppPage } from './forms-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsAppPageRoutingModule
  ],
  declarations: [FormsAppPage]
})
export class FormsAppPageModule {}
