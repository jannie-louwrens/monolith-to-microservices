import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInfo } from 'src/app/models/category-info';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from '../../services/category.service';

// https://betterfullstack.com/how-to-use-async-pipe-in-angular/
// https://levelup.gitconnected.com/angular-and-rxjs-patterns-use-reactive-programming-to-compose-and-manage-data-in-angular-apps-2e0c4ce7a39c

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit {

  categoryInformation$: Observable<CategoryInfo>;
  user$: Observable<User>;

  constructor(private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.categoryInformation$ = this.categoryService.categoryInformation$;
    this.user$ = this.userService.userAction$;
  }

}
