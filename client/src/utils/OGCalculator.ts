type Argument = {
  name: string;
  quantity: string;
};

const lbs = 2.20462;

export const ogCalculator = (malts: Argument[]) => {
  const maltsPerKg = malts.map(
    (el) =>
      Number(el.name.split("-")[1]?.split("1.0")[1]) *
      (Number(el.quantity) * lbs)
  );
  const sumMaltsPerKg = maltsPerKg.reduce((acc, a) => acc + a, 0);
  return sumMaltsPerKg;
};

export const srmCalculator = (malts: Argument[], batch_size: number) => {
  const mcu = malts.map(
    (el) =>
      (Number(el.quantity) * lbs * Number(el.name.split("-")[2])) /
      (batch_size * 0.2641722)
  );
  const sumMcu = mcu.reduce((acc, a) => acc + a, 0);
  return sumMcu;
};
