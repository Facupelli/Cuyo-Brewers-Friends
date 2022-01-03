type Argument = {
    name: string,
    quantity: string
}

export const ogCalculator = (malts: Argument[]) => {

    const lbs = 2.20462;

    const maltsPerKg = malts.map(el => Number(el.name.split('1.0')[1]) * (Number(el.quantity) * lbs))
    console.log('maltsPerKgMA',maltsPerKg)
    const sumMaltsPerKg = maltsPerKg.reduce((acc, a) => acc + a, 0);
    console.log('SUMA',sumMaltsPerKg)
    return sumMaltsPerKg.toFixed(2)

}