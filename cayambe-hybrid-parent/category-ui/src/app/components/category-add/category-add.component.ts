import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryInfo } from '../../models/category-info';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styles: [],
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  categories: CategoryInfo[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Reset the selected category.
    this.categoryService.changeSelectedCategory(null);

    this.categoryService.getCategories()
      .subscribe({
        next: categories => {
          this.categories = categories;
          this.displayForm();
        }
      });
  }

  displayForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      parent: new FormControl('', {validators: [Validators.required]})
    });
  }

  saveCategory(): void {
    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return;
    }
    let category = <CategoryInfo>this.categoryForm.getRawValue();
    category.created = new Date();
    this.categoryService.createCategory(category)
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
