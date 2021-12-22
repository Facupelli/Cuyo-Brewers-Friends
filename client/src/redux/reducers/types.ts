export interface Parameters {
  boil_time: number;
  batch_size:number;
  pre_boil_size: number;
  pre_boil_gravity: number;
  mash_ph: number;
  efficiency: number;
}

export interface Characteristics {
  original_gravity: number;
  final_gravity: number;
  alcohol_by_volume: number;
  ibu: number;
  srm: number;
}

  export interface WaterProfile {
    calcium: number;
    magnesium: number;
    sodium: number;
    chlorine: number;
    sulfate: number;
    bicarbonate: number;
  }

export interface Hops {
  name: string;
  quantity: number;
  use: string;
  time: number;
  temperature: number;
}

export interface Fermentables {
  name: string;
  quantity: number;
}

interface Ingredients {
  fermentables: Fermentables[];
  hops: Hops[];
  yeast: [];
  water_profile: WaterProfile;
}

export interface Review {
  _id: string;
  comment: string;
  score: number;
  username: string;
  date: string;
}

export interface Recipe {
  title: string;
  style: string;
  sub_category: string;
  brewery: string;
  parameters: Parameters;
  characteristics: Characteristics;
  ingredients: Ingredients;
  photos: string[];
}

export interface RecipeList {
  recipe: Recipe;
  username: string;
  author: string;
  _id: string;
  date: string;
  reviews: Review[];
}



// USER REDUCER ----------------------


export interface UserData {
  _id: string;
  username: string;
  ownRecipes: RecipeList[];
  ownReviews: string[];
}
