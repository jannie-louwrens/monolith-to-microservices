import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

import { CategoryInfo } from '../models/category-info';

// https://betterfullstack.com/an-explanation-of-hot-and-cold-observable/
// https://alligator.io/rxjs/hot-cold-observables/
// https://betterfullstack.com/how-to-use-async-pipe-in-angular/

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private REST_API_SERVER = '/api/categories';

  private categorySelectedAction = new BehaviorSubject<CategoryInfo>(null);
  categorySelectedAction$ = this.categorySelectedAction.asObservable();

  // All categories
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  categoryTree$ = this.httpClient.get<CategoryInfo>(`${this.REST_API_SERVER}/tree`);

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  categoryInformation$ = this.categorySelectedAction$
    .pipe(
      // Handle the case of no selection
      filter(category => Boolean(category)),
      // Get the parent category given the category parentId
      switchMap(category => {
        if (!!category.parent) {
          return this.httpClient.get<CategoryInfo>(`${this.REST_API_SERVER}/${category.parent}`)
            .pipe(
                map(parentCategory => ({
                  ...category,
                  categoryParent: parentCategory
                }) )
            )
        } else {
          return of({
            ...category,
            categoryParent: null
          })
        }
      }),
    );

  constructor(private httpClient: HttpClient) {}

  // Change the selected category
  changeSelectedCategory(category: CategoryInfo | null): void {
    this.categorySelectedAction.next(category);
  }

  getCategory(id: number): Observable<CategoryInfo> {
    return this.httpClient.get<CategoryInfo>(`${this.REST_API_SERVER}/${id}`);
  }

  getCategories(): Observable<CategoryInfo[]> {
    return this.httpClient.get<CategoryInfo[]>(this.REST_API_SERVER);
  }

  createCategory(category: CategoryInfo): Observable<CategoryInfo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<CategoryInfo>(this.REST_API_SERVER, category, { headers });
  }

  updateCategory(category: CategoryInfo): Observable<CategoryInfo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const categoryId = category.id;
    return this.httpClient.put<CategoryInfo>(`${this.REST_API_SERVER}/${categoryId}`, category, { headers });
  }

}
