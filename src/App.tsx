import React, { FC, memo, useReducer, useEffect } from 'react';
import { Header, Container } from '@sberdevices/plasma-ui';
import { reducer } from './store';
import { initAssistant } from './assistant';
import { IndexPage } from './pages/IndexPage';
import { GamePage } from './pages/GamePage';
export const App: FC = memo(() => {
        const [appState, dispatch] = useReducer(reducer, {
            currentState: ''
        });

        useEffect(() => {
            initAssistant(dispatch);
        }, []);

        const route = () => {
            switch (appState.currentState) {
                case 'game_page':
                    return <GamePage appState={appState} />
                break;
                default:
                    return <IndexPage appState={appState} dispatch={dispatch} />;
                    break;
            }
        }

        return (
            <>
                <Container>
                    <Header
                        logo='/logo.png'
                        title='Игра Анаграммы'
                    />
                    {route()}
                </Container>
            </>
        );
    }
);

export default App;