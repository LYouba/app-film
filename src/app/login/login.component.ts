import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../services/dialog.service';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  dialogLoginOpen: boolean = false;

  constructor(
    public dialogLogin: MatDialog,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  // ngOnInit(){
  //   console.log(this.serviceDialogLogin.getDialogLoginState());

  //   if(this.serviceDialogLogin.getDialogLoginState() === false){
  //     console.log(this.serviceDialogLogin.getDialogLoginState());

  //     this.dialogLogin.open(DialogLoginComponent);
  //   }
  // }

    // ngOnInit(){
    //   console.log(this.router.routerState.snapshot.url,  this.route.parent);
     
    //   this.dialogLogin.open(DialogLoginComponent, {
    //   data: decodeURI(this.router.routerState.snapshot.url),
    // });
  // }
}
