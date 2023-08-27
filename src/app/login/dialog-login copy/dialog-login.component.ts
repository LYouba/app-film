import {
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css'],
})
export class DialogLoginComponent {

  dialogLogin: boolean = true;

  @ViewChildren('formLoginMatError', { read: ElementRef })
  elDivMatError!: QueryList<ElementRef>;

  private subscriptionDialogRefLoginAfterClosed!: Subscription;
  // private subscriptionDialogRefLoginAfterOpen!: Subscription;

  constructor(
    private route: Router,
    public dialogRefLogin: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) private url: string // private serviceDialogLogin : DialogService,
  ) {}

  ngOnInit() {
    this.subscriptionDialogRefLoginAfterClosed = this.dialogRefLogin
      .afterClosed()
      .subscribe((_) => {
        this.route.navigate([this.url]);
        this.subscriptionDialogRefLoginAfterClosed.unsubscribe();
        //     this.serviceDialogLogin.setDialogLoginState(false)
        //     this.subscriptionDialogRefLoginAfterOpen.unsubscribe();
      });
    //   this.subscriptionDialogRefLoginAfterOpen = this.dialogRefLogin.afterOpened().subscribe(_ => this.serviceDialogLogin.setDialogLoginState(true));
  }

  changeContentDialog() { 
    if (this.dialogLogin) {
      this.formLogin.controls.passWord.disable()
      this.dialogLogin =false
    }else{
      this.dialogLogin = true;
      this.formLogin.controls.passWord.enable()
    }
  }

  getErrorMessage(champ: string) {
    switch (champ) {
      case 'email':
        const email = this.formLogin.controls.email;
        if (email.hasError('required')) return 'Le champ est obligatoire !';
        if (email.hasError('email')) return "Le format n'est pas correct !";
        break;

      case 'passWord':
        const passWord = this.formLogin.controls.passWord;
        if (
          passWord.hasError('maxLength') ||
          passWord.hasError('minLength') ||
          passWord.hasError('pattern')
        )
          return 'Doit contenir une lettre miniscule et majuscule, un caractère spéciale sauf < > \' " :, un chiffre, longueur 4-8';
        if (passWord.hasError('required')) return 'Le champ est obligatoire !';
        break;
    }
    return '';
  }

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.pattern(new RegExp('^.+[^\\s<>\'":]$')),
    ]),
    passWord: new FormControl('', [
      Validators.maxLength(8),
      Validators.minLength(4),
      Validators.pattern(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s<>\'"]){4,8}$'
        )
      ),
      Validators.required,
    ]),
  });

  // permet de changer le style position absolut du parent de mat error pour s'adapter au respencive
  ngAfterViewChecked() {
    this.elDivMatError.forEach((el) => {
      if (el.nativeElement.parentElement)
        el.nativeElement.parentElement.style.position = 'relative';
    });
  }

  onSubmit(e: Event) {
    // const passWord = this.formLogin.controls.passWord;
    // console.log(
    //   passWord,
    //   passWord.hasError('minLength'),
    //   passWord.hasError('pattern')
    // );
    // console.log(this.formLogin.hasError('email'));
    // console.log(this.formLogin.hasError('passWord'));
    // console.log(this.formLogin.pristine);
    // console.log(this.formLogin.dirty);
    // console.log(this.formLogin.touched);
  }

  /* une uatre methode qui permet d'envoyer la derniere valeur de this.dialogRefLogin.afterOpened().subscribe(_ => this.serviceDialogLogin.setDialogLoginState(true));
  avant la distruction*/

  // ngOnInitt(){
  // this.subscriptionDialogRefLoginAfterOpen = this.dialogRefLogin.afterOpened().pipe(takeUntil(this.ngUnsubscribe)).subscribe(_ => this.serviceDialogLogin.setDialogLoginState(true));
  // }
  // private ngUnsubscribe = new Subject<void>();

  // ngOnDestroy(){
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }
}








//// tests
// interface Hero {
//   id: number;
//   name: string;
// }
//  onSubmita(f: NgForm) {
//     console.log(f.value); // { first: '', last: '' }
//     console.log(f.valid); // false
//   }

//   hero: Hero = {
//     id: 1,
//     name: 'Windstorm',
//   };
// myGroup = new FormGroup({
//   eemail: new FormControl('', [
//     Validators.email,
//     Validators.required
//   ])
// });
// eemail:FormControl= new FormControl('', [
// Validators.email,
// Validators.required
// ]);
