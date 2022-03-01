import { createAssistant,createSmartappDebugger } from '@sberdevices/assistant-client';
let assistant:any;
let assistantState = {};

const initializeAssistant = (getState: any) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNGQwN2IwNmMzMGVlYjc3YzRlNjMxNDcxMzA0YWM2ZTc3MTAxOWU3Nzk2YTQyYjg2M2ZkMWM3MmRhYWIwOTg5NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY0NjIxNTY3NywiaWF0IjoxNjQ2MTI5MjY3LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiZjE0MWRiZGYtODM4MS00MDkwLTkxZDktYWJlYTRiZDhlOGQyIiwic2lkIjoiMzRhN2IwYmEtMDVkMi00YzQzLWFlODUtMDEwMmM0MDgwYjMyIn0.h0DUeUm8-SzhUDc_DnBSEk1NWNC49CTwsDaRBUDHsANICnmzPb-d-Li59B6kYYpjwDAbiM7ct6vZIfHwNS7hV5ygYRvVrkLI3Gvsj7m98ikqtZjrJMlqiTmtQRVh8JEK-oyfQFdD5qRg9PlF3bSYegUPsS_EKIPL8owBa8qVo_2HvodlR7DRnV2qVqoHrsQDYrtLIPFTbl7XSv4rHe9WOwOjrTc6--S6JJ6tSw-cw_AiTR0wRy7HScBNijScB52JYeHPz0UGX2uz8nv5YA7yIhyf3hlZzDLq_aAPGGhDE93GwGQGiqsp2CgR8EbcwSx1CmYuI3bkSLbzmy_MJX01AWFEe1CrcfzI9RaxW_UNydovSHPWqVcGHShlky2dBwmWkAASfU-NVvyKIcyisi_Pf7PFP_xjfoGAlj8umfRT3UbhhZzoyUWvyjHu306XRYiUiJ7BoAjfJcIkyClnxi7tXQF0b2AcPyKaaCoRYeW3yYYG6pbtV45JUCuQdVtgIjdkNUxgO7iv5qd6vk48_wtDk3WHH2gim-v9lzV8D5fqm5lS9eZP0gSsXDp63V46RIkf4yd2gFK90AWAcV4aOz-zkLukNYJXh2s29OajdAQGZEdzTIpn52ELIoiTYZBXkWmNNTkE5EmvLum8c_00Mf1-NkMKBJaFGgE7_04ETjMKUH0',            // Пример фразы для запуска смартапа
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
