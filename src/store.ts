type State = {
    currentState: string
};

type Action =
    | {
    type: 'index'
}

export const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'index':
            return {
                ...state,
                currentState: 'index'
            };

        default:
            return {...state}
    }

};