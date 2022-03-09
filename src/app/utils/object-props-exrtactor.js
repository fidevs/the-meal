export function getIngredients(meal) {
    let ingredients = [];
    for (let index = 1; index < 21; index++) {
        const ingredient = meal['strIngredient' + index];
        if (ingredient !== null) {
            const measure = meal['strMeasure' + index];
            ingredients.push({ ingredient, measure });
        }
    }
    return ingredients;
}