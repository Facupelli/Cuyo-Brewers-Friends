import { number } from "yup/lib/locale"

interface Parameters {
  boil_time: number;
  batch_size:number;
  pre_boil_size: number;
  pre_boil_gravity: number;
  mash_ph: number;
  efficiency: number;
}

interface Characteristics {
  original_gravity: number;
  final_gravity: number;
  alcohol_by_volume: number;
  ibu: number;
  srm: number;
}

  interface WaterProfile {
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
  boil_time: number;
}

interface Ingredients {
  fermentables: [];
  hops: Hops[];
  yeast: [];
  water_profile: WaterProfile;
}

export interface Recipe {
  _id: number;
  title: string;
  style: string;
  sub_category: string;
  brewery: string;
  parameters: Parameters;
  characteristics: Characteristics;
  ingredients: Ingredients;
  photos: [];
}

export interface RecipeList {
  recipe: Recipe;
  user_id: number;
  username: String;
  _id: Number;
}


