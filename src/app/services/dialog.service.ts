import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogLoginOpen: boolean = false;

  constructor() { }

  setDialogLoginState(isOpen : boolean) : void {
    console.log("appeler", isOpen);

    this.dialogLoginOpen = isOpen;
  }

  getDialogLoginState(): boolean{
    return this.dialogLoginOpen;
  }
}
