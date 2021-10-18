import React, { FC, memo, useReducer, useEffect } from 'react';
import { Header, Container } from '@sberdevices/plasma-ui';
import { reducer } from './store';
import { initAssistant } from './assistant';
import { IndexPage } from './pages/IndexPage'
import GortenziaPage from "./pages/GortenziaPage";
import HrizantemaPage from "./pages/HrizantemaPage";
import AlstroMeriaPage from "./pages/AlstromeriaPage";
import GvozdikaPage from "./pages/GvozdikaPage";
import GipsafilaPage from "./pages/GipsafilaPage";
import RozaPage from "./pages/RozaPage";
import EustomaPage from "./pages/EustomaPage";

export const App: FC = memo(() => {
        const [appState, dispatch] = useReducer(reducer, {
            currentState: ''
        });

        useEffect(() => {
            initAssistant(dispatch);
        }, []);

        const route = () => {
            switch (appState.currentState) {
                case 'gortenzia':
                    return <GortenziaPage dispatch={dispatch} />
                break;
                case 'hrizantema':
                    return <HrizantemaPage dispatch={dispatch} />
                    break;
                case 'alstromeria':
                    return <AlstroMeriaPage dispatch={dispatch} />
                    break;
                case 'gvozdika':
                    return <GvozdikaPage dispatch={dispatch} />
                    break;
                case 'gipsafila':
                    return <GipsafilaPage dispatch={dispatch} />
                    break;
                case 'eustoma':
                    return <EustomaPage dispatch={dispatch} />
                    break;
                case 'roza':
                    return <RozaPage dispatch={dispatch} />
                    break;
                case 'index':
                    return <IndexPage dispatch={dispatch} />;
                    break;
                default:
                    return <IndexPage dispatch={dispatch} />;
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