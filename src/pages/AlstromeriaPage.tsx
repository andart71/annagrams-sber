import { Col, Row, Button } from '@sberdevices/plasma-ui'

export const AlstroMeriaPage = ({dispatch}: any) => {

    const onClick = () => {
        dispatch({type: 'index'});
    }

    return (<>
        Как обрабатывать Альстромерию

        <br /><br /><br />
        <Row>
        <Col sizeS={4} sizeM={4} sizeL={8} sizeXL={8}>
            <Button text="Вернуться" onClick={onClick} />
        </Col>
        </Row>
        </>)
}
export default AlstroMeriaPage