import {Button, Col, Row} from "@sberdevices/plasma-ui";

export const RozaPage = ({dispatch}: any) => {

    const onClick = () => {
        dispatch({type: 'index'});
    }

    return (<>Как обрабатывать Розу

        <br /><br /><br />
        <Row>
            <Col sizeS={4} sizeM={4} sizeL={8} sizeXL={8}>
                <Button text="Вернуться" onClick={onClick} />
            </Col>
        </Row></>)
}
export default RozaPage