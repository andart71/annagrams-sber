import React, { useState } from 'react';
import { Container, Row, Col, Card, CardContent, TextBoxBigTitle, TextBoxSubTitle, Button, TextField, isSberBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components';
import { sendData } from '../assistant';

const StyledButton = styled(Button)`
    max-width: 100%;
    display: block;
    margin: 0 auto;
    float: none;
`;

export const IndexPage = ({ appState } : any, { dispatch }: any) => {
    const [isErrors, setError] = useState(false);
    const [getNumberOfLetters, setNumberOfLetters] = useState<number>(4);
    const formRef = React.useRef<HTMLFormElement>(null);
    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && formRef.current) {
            const formElements = Array.from(formRef.current.elements) as HTMLElement[];
            const index = Array.from(formElements).indexOf(event.target as HTMLElement);

            if (index > -1) {
                setTimeout(() => {
                    formElements[index + 1].focus();
                }, 150);
            }
        }
    }, []);


    const handleSubmit = (t: any) => {
        t.preventDefault();
        sendData({action: {action_id: "SET_NUMBER_OF_LETTERS", parameters: { numberOfLetters: getNumberOfLetters}}});
        //dispatch({ type: 'GO_GAME_PAGE', currentState: 'game_page'});
    }

    const handleChange = (t: any) => {
        console.log(t.target.value)
        setNumberOfLetters(t.target.value.replace(/[^+\d]/g, ''));
    }
    console.log(appState.errorsNumber + "errorsnumber");
    return (
        <Container>
            <Row>
                <Col type="calc" sizeXL={4} sizeM={4} style={{margin: "0 auto", marginTop: "15px"}}>
                            <TextBoxSubTitle>{appState.mainMessage}</TextBoxSubTitle>
                            {isErrors===true ? 'Поле не может быть пустым!' : null}
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <Row>
                                    <Col type="calc" sizeXL={4} sizeM={6} sizeS={4} style={{margin: "0 auto", marginTop: "15px"}}>
                                        {appState.errorsNumber ? <TextField
                                            label="Количество букв"
                                            value={getNumberOfLetters}
                                            onChange={handleChange}
                                            name="numberOfLetters"
                                            onKeyDown={onKeyDown}
                                            status="error"
                                            required
                                        /> : <TextField
                                            label="Количество букв"
                                            value={getNumberOfLetters}
                                            onChange={handleChange}
                                            name="numberOfLetters"
                                            onKeyDown={onKeyDown}
                                            required
                                        />}

                                    </Col>
                                </Row>
                                <Row>
                                    <Col type="calc" sizeXL={4} sizeM={6} sizeS={4} style={{margin: "0 auto", marginTop: "15px"}}>
                                        <StyledButton type="submit" size={isSberBox() ? 'm' : 's'} view="primary">
                                            Отправить
                                        </StyledButton>
                                    </Col>
                                </Row>
                            </form>
                </Col>
            </Row>
        </Container>
    )
}

export default IndexPage;