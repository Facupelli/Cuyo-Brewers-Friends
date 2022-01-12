export interface Parameters {
  boil_time: number;
  batch_size: number;
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

export interface HopsName {
  id: number;
  label: string;
  name: string;
}
export interface Hops {
  name: HopsName;
  quantity: number;
  use: string;
  time: number;
  temperature: number;
}

export interface FermentablesName {
  name: string;
  label: string;
  color: number;
  potential: number;
  yield: number;
}

export interface Fermentables {
  name: FermentablesName;
  quantity: number;
}

export interface Yeast {
  name: string;
  attenuation: number;
  quantity: number;
}

interface Ingredients {
  fermentables: Fermentables[];
  hops: Hops[];
  yeast: Yeast;
  water_profile: WaterProfile;
}

export interface Review {
  _id: string;
  comment: string;
  score: number;
  username: string;
  date: string;
}

export interface Style {
  label: string;
  value: string;
}

export interface Recipe {
  title: string;
  style: Style;
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
interface OwnBLogs {
  blog_title: string;
  blog_body: string;
  date: string;
  _id: string;
}
export interface UserData {
  _id: string;
  username: string;
  ownRecipes: RecipeList[];
  ownReviews: string[];
  ownBlogs: OwnBLogs[];
}

// BLOG REDUCER --------------------

export interface Blog{
  _id: string;
  blog_author: string;
  blog_username: string;
  blog_title: string;
  blog_body: string;
  date: string;
}
export interface BlogData {
  blog: Blog;
}