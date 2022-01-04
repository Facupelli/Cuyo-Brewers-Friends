type Argument = {
  name: string;
  quantity: string;
};

const lbs : number = 2.20462;

export const ogCalculator = (malts: Argument[]) => {
  const maltsPerKg : number[] = malts.map((el) => {
    let number = Number(el.name.split("-")[1]?.split("1.0")[1]);
    if (isNaN(number)) number = 0;
    return number * (Number(el.quantity) * lbs);
  });

  const sumMaltsPerKg : number = maltsPerKg.reduce((acc, a) => acc + a, 0);
  return sumMaltsPerKg;
};

export const srmCalculator = (malts: Argument[], batch_size: number) => {
  const mcu : number[] = malts.map((el) => {
    let number = Number(el.quantity) * lbs * Number(el.name.split("-")[2]);
    if (isNaN(number)) number = 0;
    return number / (batch_size * 0.2641722);
  });
  const sumMcu : number = mcu.reduce((acc, a) => acc + a, 0);
  return sumMcu;
};

export const srmToHex = (srm: string) => {
  const color: string = Math.round(Number(srm)).toString();
  return color;
};
