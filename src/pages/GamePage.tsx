import {TextBoxSubTitle, Container, Row, Col, TextField, isSberBox, Button, ParagraphText2} from "@sberdevices/plasma-ui";
import React, { useState } from "react";
import styled from "styled-components";
import {sendData} from "../assistant";

const StyledButton = styled(Button)`
    max-width: 100%;
    display: block;
    margin: 0 auto;
    float: none;
`;


export const GamePage = ({appState}: any) => {
    const [getNewWord, setNewWord] = useState<string>('');
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
        sendData({action: {action_id: "SET_NEW_WORD", parameters: { newWord: getNewWord}}});
    }

    const handleChange = (t: any) => {
        setNewWord(t.target.value);
    }

    const printGuessedWords = (guessedWords: any) => {
        for (let i = 0; i < guessedWords.length; i++){
            console.log(guessedWords[i]);
            return guessedWords[i]
        }
    }
    console.log(appState, "app state");
    return (
        <Container>
            <Row>
                <Col type="calc" sizeXL={4} sizeM={2} style={{margin: "0 auto", marginTop: "15px", marginBottom: "15px"}}>
                    <TextBoxSubTitle>{appState.printMessage}</TextBoxSubTitle>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <Row>
                            <Col type="calc" sizeXL={4} sizeM={8} sizeS={4} style={{margin: "0 auto", marginTop: "15px"}}>
                                {appState.errorsWord ? <TextField
                                    label="Новое слово"
                                    value={getNewWord}
                                    onChange={handleChange}
                                    name="newWord"
                                    onKeyDown={onKeyDown}
                                    status="error"
                                    required
                                /> : <TextField
                                    label="Новое слово"
                                    value={getNewWord}
                                    onChange={handleChange}
                                    name="newWord"
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
                <Col sizeS={4}>
                <Row>
                <ParagraphText2 style={{marginBottom: '6rem'}}>Слово: {appState.printMessage.match(/«(.+)»/)[1]}</ParagraphText2>
                    </Row>
                <Row>
                Угаданные слова:<br />
                {appState.guessedWords ? appState.guessedWords.join(', ') : "Нет найденных слов"}
                </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage;