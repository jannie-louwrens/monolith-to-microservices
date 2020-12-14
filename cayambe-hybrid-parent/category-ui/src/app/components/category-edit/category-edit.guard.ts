import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoryEditComponent } from './category-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryEditGuard implements CanDeactivate<CategoryEditComponent> {

  constructor(private modalService: NgbModal) {}

  canDeactivate(
    component: CategoryEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!!component.categoryForm && component.categoryForm.dirty) {
        const subject = new Subject<boolean>();

        const modalRef = this.modalService.open(ConfirmationDialogComponent, {backdrop: 'static'});
        modalRef.componentInstance.subject = subject;
        modalRef.componentInstance.modalRef = modalRef;

        return subject.asObservable();
      }

      return true;
  }

}
