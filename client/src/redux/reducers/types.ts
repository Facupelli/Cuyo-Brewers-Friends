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

interface Ingredients {
  fermentables: [];
  hops: [];
  yeast: [];
  water_profile: WaterProfile;
}

export interface Recipe {
  _id: number;
  title: string;
  style: string;
  brewery: string;
  parameters: string;
  characteristics: Characteristics;
  ingredients: Ingredients;
  photos: [];
}


