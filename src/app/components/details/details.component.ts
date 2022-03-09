import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Meal, Meals } from 'src/app/services/api.service';

declare const getIngredients: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  loading = true;
  meal: Meal | null = null;
  ingredients: { ingredient: string, measure: string }[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.api.searchMealById(params['id']).subscribe((data: Meals) => {
          this.meal = data.meals[0];
          this.ingredients = getIngredients(this.meal);
          this.loading = false;
        })
      })
  }

}
