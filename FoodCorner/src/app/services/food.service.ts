import { Injectable } from '@angular/core';
import { Food } from '../shared/model/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/model/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}
  getAll(): Food[] {
    return sample_foods;
  }
  // search food
  getAllFoodBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  // get all tags
  getAllTags(): Tag[] {
    return sample_tags;
  }
  // get food by Tags
  getAllFoodByTags(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }

  // Get Food By Id
  getFoodById(foodId: string) {
    return this.getAll().find((food) => food.id) ?? new Food();
  }
}
