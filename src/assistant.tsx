import { createAssistant,createSmartappDebugger } from '@sberdevices/assistant-client';
let assistant:any;
let assistantState = {};

const initializeAssistant = (getState: any) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: '',
            initPhrase: 'запусти workshop canvas',
            // Текущее состояние смартапа
            getState
        });
    }
    return createAssistant({getState});
}

export const initAssistant = (dispatch: any) => {
    assistant = initializeAssistant(() => assistantState);
    assistant.on('data', ({ navigation, action }: any) => {
        if (navigation) {
            switch (navigation.command) {
                case 'UP':
                    window.scrollTo(0, window.scrollY - 500);
                    break;
                case 'DOWN':
                    window.scrollTo(0, window.scrollY + 500);
                    break;
            }
        }
        console.log('action', action);

        if (action) {
            dispatch(action);
            switch (action.type){
                case 'exit_page':
                    assistant.close();
                    break;
            }
        }
    });


    return assistant;
}

export const sendData = (data:any) => {
    assistant.sendData(data);
}
