import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../../services/category.service';
import { ITreeOptions } from '@circlon/angular-tree-component';
import { CategoryInfo } from '../../models/category-info';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

// https://betterfullstack.com/how-to-use-async-pipe-in-angular/
// https://levelup.gitconnected.com/angular-and-rxjs-patterns-use-reactive-programming-to-compose-and-manage-data-in-angular-apps-2e0c4ce7a39c

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTreeComponent implements OnInit {

  @ViewChild('tree') tree;

  categoryTree$: Observable<CategoryInfo>;
  user$: Observable<User>;

  options: ITreeOptions;

  constructor(private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.categoryTree$ = this.categoryService.categoryTree$;
    this.user$ = this.userService.userAction$;
  }

  onSelected($event): void {
    this.categoryService.changeSelectedCategory($event.node.data);
  }

}
