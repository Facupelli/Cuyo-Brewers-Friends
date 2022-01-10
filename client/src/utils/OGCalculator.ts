type Name = {
  name: string,
  label: string,
  color: number,
  potential: number,
  yield: number,
}

type Argument = {
  name: Name;
  quantity: string;
};

const lbs : number = 2.20462;

export const ogCalculator = (malts: Argument[]) => {
  const maltsPerKg : number[] = malts.map((el) => {
    let potential = (el.name.potential - 1) * 1000
    if (isNaN(potential)) potential = 0;
    return potential * (Number(el.quantity) * lbs);
  });

  const sumMaltsPerKg : number = maltsPerKg.reduce((acc, a) => acc + a, 0);
  return sumMaltsPerKg;
};

export const srmCalculator = (malts: Argument[], batch_size: number) => {
  const mcu : number[] = malts.map((el) => {
    let color = Number(el.quantity) * lbs * el.name.color;
    if (isNaN(color)) color = 0;
    return color / (batch_size * 0.2641722);
  });
  const sumMcu : number = mcu.reduce((acc, a) => acc + a, 0);
  return sumMcu;
};

export const srmToHex = (srm: string) => {
  const color: string = Math.round(Number(srm)).toString();
  return color;
};