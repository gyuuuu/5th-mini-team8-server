const ingredientDao = require('../dao/ingredientDao');

async function postIngredientIfNotExist(ingredients){
    // ingredients 리스트에서 없는 것만 DB에 넣어줌
    for(var i=0; i<ingredients.length; i++){
        // 재료가 있는지 찾아본다.
        const ingredientData = await ingredientDao.selectIngredient(ingredients[i]);

        if(ingredientData.length == 0){ // 없으면
            const ingredient = await ingredientDao.insertIngredient(ingredients[i]); // 디비에 넣는다
            console.log(ingredient);
        }
    }
}

async function searchIngredients(ingredient){
    //console.log(ingredient);
    let queryIngredient = '%' + ingredient + '%';
    const ingredientData = await ingredientDao.selectIngredientWhereContain(queryIngredient);
    console.log(ingredientData);
    if(ingredientData.length == 0){
        return -1;
    }
    else{
        return ingredientData;
    }
}

// ingredients 재료들의 배열
async function insertIngredient(ingredients){
    //console.log(ingredients);
    var cnt; //실제 넣어진 재료의 수

    for(var i=0; i<ingredients.length; i++){
        const ingredientList = ingredients[i];
        var name = '';
        ingredientList.forEach(element => {
            name += element;
            name += ' ';
        });
        //console.log(name);
        // 공백 처리
        if(name == ''){
            continue;
        }
        const match = await ingredientDao.selectIngredient(name.trim());
        // 여기서 match가 있으면 count++해주는 식으로 
        
        //console.log(match.length);
        if(match.length == 0){ // Ingredients 테이블에 없으면
            await ingredientDao.insertIngredient(name.trim());
            cnt++;
        }
    }
    return cnt;
}

module.exports = {
    postIngredientIfNotExist,
    searchIngredients,
    insertIngredient
}