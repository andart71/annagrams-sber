import React, { FC, memo, useReducer, useEffect } from 'react';
import { Header, Container } from '@sberdevices/plasma-ui';
import { reducer } from './store';
import { initAssistant } from './assistant';
import { IndexPage } from './pages/IndexPage'

export const App: FC = memo(() => {
        const [appState, dispatch] = useReducer(reducer, {
            currentState: ''
        });

        useEffect(() => {
            initAssistant(dispatch);
        }, []);

        const route = () => {
            switch (appState.currentState) {
                default:
                    return <IndexPage />;
                    break;
            }
        }

        return (
            <>

                <Container>
                    <Header
                        logo='/logo.png'
                        title='Флорист. Обратываем цветы'
                    />
                    {route()}
                </Container>
            </>
        );
    }
);

export default App;