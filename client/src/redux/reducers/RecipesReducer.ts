interface DefaultStateI {
    user: string[],
    recipes: string[],
}

const defaultState: DefaultStateI = {
    user: [],
    recipes: [],
}

export const recipesReducer = (state: DefaultStateI = defaultState, action: any) : DefaultStateI=> {
    return state
};

export default recipesReducer;