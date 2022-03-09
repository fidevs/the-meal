import { Component, Inject, OnInit } from '@angular/core';
import { ApiService, Items, Meal, MealItem, Meals } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  meal: Meal | null = null;
  meals: MealItem[] = [];
  loading = true;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Search mexican meal list
    this.api.consultMexicanMeals().subscribe((data: Items) => {
      this.meals = data.meals;
      this.loading = false;
    });

    // Consult random meal
    this.api.getRandomMeal().subscribe((data: Meals) => {
      this.meal = data.meals[0];
      this.dialog.open(RandomMealDialog, {
        data: this.meal
      });
    });
  }

  showMoreDetails() {}

}


// MODAL COMPONENT
@Component({
  selector: 'random-meal-dialog',
  templateUrl: './random-meal-dialog.html',
  styleUrls: ['./random-meal-dialog.css']
})
export class RandomMealDialog {

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Meal,
    private ref: MatDialogRef<RandomMealDialog>
  ) {}

  showMoreDetails() {
    this.router.navigate(
      ['/home/details'],
      { queryParams: { id: this.data.idMeal } }
    );
    this.ref.close();
  }

}
