import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogLoginComponent } from '../../login/dialog-login/dialog-login.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.scss'],
})
export class DialogRegisterComponent {
  hide: boolean = true;

  @ViewChildren('formRegisterMatError', { read: ElementRef })
  elDivMatError!: QueryList<ElementRef>;

  private subscriptionDialogRefRegisterAfterClosed!: Subscription;
  // private subscriptionDialogRefRegisterAfterOpen!: Subscription;

  /**
   * @param route
   * @param dialogRefRegister
   * @param url
   */
  constructor(
    private router: Router,
    public dialogLogin: MatDialog,
    public dialogRefRegister: MatDialogRef<DialogRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private url: string,
    private auth: AuthService
  ) {}

  /**
   * Hosts listener
   * pour gérer la taille du dialog en fonction du width du screen
   */
  @HostListener('window:resize', ['$event']) onWindowResize() {
    if (window.screen.width < 768) this.dialogRefRegister.updateSize('90%');
    else this.dialogRefRegister.updateSize('50%');
  }

  formRegister = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(new RegExp('^.+[^\\s<>\'":]$')),
    ]),
    passWord: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      Validators.pattern(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s<>\'"]){4,8}$'
        )
      ),
    ]),
    cgu: new FormControl('', [Validators.required, Validators.requiredTrue]),
  });

  ngOnInit() {
    if (window.screen.width < 640) this.dialogRefRegister.updateSize('90%');

    this.subscriptionDialogRefRegisterAfterClosed = this.dialogRefRegister
      .afterClosed()
      .subscribe((_) => {
        this.router.navigate([this.url]);
        this.subscriptionDialogRefRegisterAfterClosed.unsubscribe();
        //     this.serviceDialogRegister.setDialogRegisterState(false)
        //     this.subscriptionDialogRefRegisterAfterOpen.unsubscribe();
      });
    //   this.subscriptionDialogRefRegisterAfterOpen = this.dialogRefRegister.afterOpened().subscribe(_ => this.serviceDialogRegister.setDialogRegisterState(true));
  }

  // permet de changer le style position absolut du parent de mat error pour s'adapter au respensive
  ngAfterViewChecked() {
    this.elDivMatError.forEach((el) => {
      if (el.nativeElement.parentElement)
        el.nativeElement.parentElement.style.position = 'relative';
    });
  }

  getErrorMessage(champ: string) {
    switch (champ) {
      case 'email':
        const email = this.formRegister.controls.email;
        if (email.hasError('required')) return 'Le champ est obligatoire !';
        if (email.hasError('email'))
          return "Le format n'est pas correct !. Caractères non autorisés <, >, ', \", :";
        break;
      case 'passWord':
        const passWord = this.formRegister.controls.passWord;
        if (passWord.hasError('maxlength') || passWord.hasError('minlength'))
          return ' longueur entre 4 et 8';
        if (passWord.hasError('pattern'))
          return 'Doit contenir une lettre miniscule et majuscule, un caractère spéciale sauf < > \' " :, un chiffre';
        if (passWord.hasError('required')) return 'Le champ est obligatoire !';
        break;
      case 'nom':
        const nom = this.formRegister.get('nom');
        if (nom!.hasError('maxlength') || nom!.hasError('minLength'))
          return '1 à 10 lettre';
        if (nom!.hasError('required')) return 'Le champ est obligatoire !';
        break;
      case 'prenom':
        const prenom = this.formRegister.controls.prenom;
        if (prenom.hasError('maxlength') || prenom.hasError('minLength'))
          return '1 à 10 lettre';
        if (prenom.hasError('required')) return 'Le champ est obligatoire !';
        break;
      case 'cgu':
        const cgu = this.formRegister.controls.cgu;
        if (cgu.hasError('required')) return 'Le champ est obligatoire !';
        break;
    }
    return '';
  }

  onSubmit(e: Event) {
    let user = new User(
      this.formRegister.value.nom!,
      this.formRegister.value.prenom!,
      this.formRegister.value.email!,
      this.formRegister.value.passWord!
    );
    // this.auth.registerUser(user)
    //.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //     error: (err)=>{
  //       console.log(err);
  //     }
  //   });
  }

  login() {
    const prevUrl = this.url;
    this.url = 'login';
    this.dialogRefRegister.close();
    this.dialogLogin.open(DialogLoginComponent, {
      data: decodeURI(prevUrl),
    });
  }
  openDialog() {}
}
