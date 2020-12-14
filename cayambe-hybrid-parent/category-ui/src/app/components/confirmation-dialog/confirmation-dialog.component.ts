import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [
  ]
})
export class ConfirmationDialogComponent {

  subject: Subject<boolean>;
  modalRef: NgbModalRef;

  action(value: boolean) {
    this.modalRef.close();
    this.subject.next(value);
    this.subject.complete();
  }

}
