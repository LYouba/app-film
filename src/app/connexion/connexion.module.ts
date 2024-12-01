import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLoginComponent } from './login/dialog-login/dialog-login.component';
import { DialogRegisterComponent } from './register/dialog-register/dialog-register.component';
import { MaterialAngularModule } from '../material-modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogLoginComponent, DialogRegisterComponent],
  imports: [
    CommonModule,
    MaterialAngularModule,
    ReactiveFormsModule, // [formGroup]
  ],
  exports: [DialogLoginComponent, DialogRegisterComponent],
})
export class ConnexionModule {}
