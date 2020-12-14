import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.init();
    this.user$ = this.userService.userAction$;
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  async doLogout() {
    await this.router.navigate(['/']);
    await this.userService.logout();
  }

}
