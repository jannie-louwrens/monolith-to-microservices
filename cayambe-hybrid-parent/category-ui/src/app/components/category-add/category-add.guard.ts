import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoryAddComponent } from './category-add.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryAddGuard implements CanDeactivate<CategoryAddComponent> {

  constructor(private modalService: NgbModal) {}

  canDeactivate(
    component: CategoryAddComponent,
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
