type MaltName = {
  name: string;
  label: string;
  color: number;
  potential: number;
  yield: number;
};

type Argument = {
  name: MaltName;
  quantity: string;
};

const lbs: number = 2.20462;

export const ogCalculator = (malts: Argument[]) => {
  const maltsPerKg: number[] = malts.map((el) => {
    let potential = (el.name.potential - 1) * 1000;
    if (isNaN(potential)) potential = 0;
    return potential * (Number(el.quantity) * lbs);
  });

  const sumMaltsPerKg: number = maltsPerKg.reduce((acc, a) => acc + a, 0);
  return sumMaltsPerKg;
};

export const srmCalculator = (malts: Argument[], batch_size: number) => {
  const mcu: number[] = malts.map((el) => {
    let color = Number(el.quantity) * lbs * el.name.color;
    if (isNaN(color)) color = 0;
    return color / (batch_size * 0.2641722);
  });
  const sumMcu: number = mcu.reduce((acc, a) => acc + a, 0);
  return sumMcu;
};

export const srmToHex = (srm: string) => {
  const color: string = Math.round(Number(srm)).toString();
  return color;
};

export const getOg = (ogPoints: number, eff: number, batch_size: number) => {
  const originalGravity: number = Number(
    ((ogPoints * eff) / 100 / (batch_size * 0.2641722)).toFixed(0)
  );

  if (originalGravity <= 0) {
    return "0";
  }
  if (originalGravity >= 100) {
    return "1." + originalGravity;
  }
  if (originalGravity >= 10) {
    return "1.0" + originalGravity;
  }
  if (originalGravity < 10) {
    return "1.00" + originalGravity;
  }
};

export const getFg = (oG: string, yeastAtt: number) => {
  let finalG: number = Number(
    (Number(oG) - (Number(oG) - 1) * (yeastAtt / 100)).toFixed(3)
  );

  if (Number(oG) === 0) {
    finalG = 0;
    return String(finalG);
  }
  return String(finalG);
};

export const getAbv = (oG: string, Fg: string) => {
  return ((Number(oG) - Number(Fg)) * 131.25).toFixed(2);
};
