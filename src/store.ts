type State = {
    currentState: string,
    mainMessage?: string,
    errors?: boolean,
    printMessage?: string,
    guessedWords?: []
};

type Action =
    | {
    type: 'index',
    errors: boolean
}
    | {
    mainMessage: string;
    type: "MAIN_MESSAGE"
}
    | {
    type: 'GO_GAME_PAGE',
    printMessage: string,
    errors: boolean,
    guessedWords: []
}

export const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'index':
            return {
                ...state,
                currentState: 'index',
                errorsNumber: action.errors
            };
        case 'MAIN_MESSAGE':
            return {
                ...state,
                currentState: 'index',
                mainMessage: action.mainMessage
            }
            break;
        case 'GO_GAME_PAGE':
            return {
                ...state,
                currentState: 'game_page',
                printMessage: action.printMessage,
                errorsWord: action.errors,
                guessedWords: action.guessedWords
            }
            break;
        default:
            return {...state}
    }

};