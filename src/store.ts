type State = {
    currentState: string
};

type Action =
    | {
    type: 'index'
}
    | {
    type: 'gortenzia'
}
    | {
    type: 'hrizantema'
}
    | {
    type: 'alstromeria'
}
    | {
    type: 'gvozdika'
}
    | {
    type: 'gipsafila'
}
    | {
    type: 'eustoma'
}
    | {
    type: 'roza'
}

export const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'index':
            return {
                ...state,
                currentState: 'index'
            };
        break;
        case 'gortenzia':
            return {
                ...state,
                currentState: 'gortenzia'
            }
            break;
        case 'hrizantema':
            return {
                ...state,
                currentState: 'hrizantema'
            }
            break;
        case 'alstromeria':
            return {
                ...state,
                currentState: 'alstromeria'
            }
            break;
        case 'gvozdika':
            return {
                ...state,
                currentState: 'gvozdika'
            }
            break;
        case 'gipsafila':
            return {
                ...state,
                currentState: 'gipsafila'
            }
            break;
        case 'eustoma':
            return {
                ...state,
                currentState: 'eustoma'
            }
            break;
        case 'roza':
            return {
                ...state,
                currentState: 'roza'
            }
            break;
        default:
            return {...state}
    }

};