import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Meal {
  dateModified: string,
  idMeal: string,
  strArea: string,
  strCategory: string,
  strCreativeCommonsConfirmed: string,
  strDrinkAlternate: string,
  strImageSource: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strIngredient16: string,
  strIngredient17: string,
  strIngredient18: string,
  strIngredient19: string,
  strIngredient20: string,
  strInstructions: string,
  strMeal: string,
  strMealThumb: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strMeasure16: string,
  strMeasure17: string,
  strMeasure18: string,
  strMeasure19: string,
  strMeasure20: string,
  strSource: string,
  strTags: string,
  strYoutube: string,
};

export interface Meals {
  meals: Meal[],
};

export interface MealItem {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
}

export interface Items {
  meals: MealItem[],
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
  mexicanMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican';
  mealByIdUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  constructor(private http: HttpClient) { }

  getRandomMeal(): Observable<Meals> {
    return this.http.get<Meals>(this.randomMealUrl);
  }

  consultMexicanMeals(): Observable<Items> {
    return this.http.get<Items>(this.mexicanMealUrl);
  }

  searchMealById(id: string): Observable<Meals> {
    return this.http.get<Meals>(this.mealByIdUrl + id);
  }
}
