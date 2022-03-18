import { createAssistant,createSmartappDebugger } from '@sberdevices/assistant-client';
let assistant:any;
let assistantState = {};

const initializeAssistant = (getState: any) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNGQwN2IwNmMzMGVlYjc3YzRlNjMxNDcxMzA0YWM2ZTc3MTAxOWU3Nzk2YTQyYjg2M2ZkMWM3MmRhYWIwOTg5NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY0NzY3MTg2MSwiaWF0IjoxNjQ3NTg1NDUxLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNTQ0M2Q1OWItYmRlMC00NDljLWEyMGUtNmNlZmVkY2QxMmEzIiwic2lkIjoiNzBiYWI1NGYtODRmMC00YWQ0LWI0NGUtM2E2ZDc3YzRkNzg2In0.vBL_LFRg71pyXBOGtIgfvcKkzTYcVAi0SjbRqnGFBad7EhsBzpbQ1Mz-4PfxQVMnoSCqToKTyRphoL9SC36Y2kqF0HEPu0_VpLN8Ps4UfTNxhtE94mXTt20lw3uYCvNxT8N1aMQTiVC4wwKNEQ3VAT_qtdBRw09ARXtpqPaPNvII-xsdf3cX2HXUALndzqyi1GWuoGOiHrWaOeoJMd47qyVWyYleVTBYj6_G9tDLzVY_ytgOpsaYeeEzFBx-wbu7pOj2oax2GPE9VRAmTiF2DBzaclS04QtoDtf1P7m-r5oZRjWpoUXShGaUlwwZWduGGElsLozxYD8-i2Qv7upEq9EJKsjKdUCPp_jGFcUP03RWW2yREiYgTKcSaSiMLEvIm0XVzdyvDmwrFoBvxsIHtRupfrnut8IPgRbxQJyyubEpF7_tRTB1T1KIC7TFdnBZHzjcuDKctWofefLsPosCY2Twf82y3GJduR6n4dPR8ZJHxLPStOXENqUgcbXXpfiGkh5A3E2txtHPH7cGA_TB-0GdLsM8TlAdQBm_fagYFfF8dHrqmp_fdHhF12TOx0thfW8TN61zavTa6hKpOjGr45zt6PsVDoCKaqAlasZ_AlWIRKM5mwIH9oHHl9V1BRiqNb1_CDQoZWvp-fX8DZ_CZXxy5VKDiCBE7m0N_b7Bz8E',
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
