import { createAssistant,createSmartappDebugger } from '@sberdevices/assistant-client';
let assistant:any;
let assistantState = {};

const initializeAssistant = (getState: any) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNGQwN2IwNmMzMGVlYjc3YzRlNjMxNDcxMzA0YWM2ZTc3MTAxOWU3Nzk2YTQyYjg2M2ZkMWM3MmRhYWIwOTg5NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY0NTg1Nzk4MCwiaWF0IjoxNjQ1NzcxNTcwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNmY1OWU0YmYtZTcwMC00YzAwLWEyNDktMjk4NDRmODJlZWQxIiwic2lkIjoiYmRhZDUzNzItMjZjNi00MDZhLWE5ODMtYzk3NmZiZDIyZWJmIn0.KdgeH0ML_ZzgjRXzcoe1QNiY1c6rKStwa8URIK-cEjCc8dKrOAEuTlrrifhQtYukzSkvIP1cyOX18z7bVA9tePRqBiXRTdDheAfbfwGHrpiNqt4hLaLed24vofA4pfAcU0UGLwRgTqWZCLIuiQ6YrefdC_2DEXG7XHvFAozgQA3Dq_rL-YuVCj7X8roinpA9qWGDtKsBv4d-c1B-OILyZuT3S4spi7XhrCmQdfLbouhB-JkZvOv9MAMhmbxKofpiEbZBuuhqs70LwsOQyWh5r3iRJPNaM7ciYZ00Fk42SQOakHAdGqtgr3JYPgCTu4hPAeZmLEuauuTQF4RO64NwFOxxrHNr0G7Z2Yywst14QrABItV22-cZYaw0vWWfA9AIpHZ4rKxEyamdDn4wSXRz5FHO654NQ5cpZBzIhvt8b46c0X3lsyOIQHGXg5_3GgzDClWuErXZyBl_zj7oxm99ZN4cnORLEbVq9CPq17m1SksHcebBRYglP3OuiR1XEVNg30dyWMC1JfuJ2jsBUD3lqQOtVXmLSBns8RPZD189eaNlsBYOb---hZzEL_dkJZ5ansbtT4KP9d-uOXUVvwI2VdGGnLs1ZohcmF_FzWTAbGfVjG1MXhj3mnbEnomJA0_Ip-anu28--PVFMTepYzUv5VI_RxSAwjYv5vuiDdVlQMc',
            // Пример фразы для запуска смартапа
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
