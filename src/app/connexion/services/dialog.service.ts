import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogLoginOpen: boolean = false;

  constructor() { }

  setDialogLoginState(isOpen : boolean) : void {
    this.dialogLoginOpen = isOpen;
  }

  getDialogLoginState(): boolean{
    return this.dialogLoginOpen;
  }
}
