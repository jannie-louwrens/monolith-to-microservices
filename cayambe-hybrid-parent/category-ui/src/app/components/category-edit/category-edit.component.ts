import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoryInfo } from '../../models/category-info';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styles: [],
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category: CategoryInfo;
  categories: CategoryInfo[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    // Read the parameter from the route
    const id = +this.route.snapshot.paramMap.get('id');
    const category$ = this.categoryService.getCategory(id);
    const categories$ = this.categoryService.getCategories();

    // get the category and list of categories data in parallel
    forkJoin([category$, categories$])
      .subscribe({
        next: ([category, categories]) => {
          this.category = category;
          this.categories = categories;
          this.displayCategory();
        }
      });
  }

  displayCategory(): void {
    if (this.category) {
      // Define the form
      this.categoryForm = this.formBuilder.group({
        name: new FormControl(this.category.name, {validators: [Validators.required, Validators.minLength(3)]}),
        parent: new FormControl(this.category.parent, {validators: [Validators.required]})
      });
    }
  }

  saveCategory(): void {
    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return;
    }
    // stop here if form is untouched
    if (this.categoryForm.untouched) {
      return;
    }
    // stop here if form values was not changed
    if (!this.categoryForm.dirty) {
      return;
    }

    let category = { ...this.category, ...this.categoryForm.value };
    category.updated = new Date();
    this.categoryService.updateCategory(category)
      .subscribe({
        next: () => this.onSaveComplete()
      });
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }
}
