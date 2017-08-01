export const testReducer = (state, action) => {
    switch (action.type) {
        case 'LOG':
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            return state;
            break;
        default :
            return state;
    }
}