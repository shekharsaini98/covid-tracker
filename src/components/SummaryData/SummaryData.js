import './SummaryData.css'
import { Container,Row,Col, Card } from 'react-bootstrap';

function SummaryData({data}) {
    const {NewConfirmed,NewDeaths,NewRecovered,TotalConfirmed,TotalDeaths,TotalRecovered,Date} = data
    return<Container className="summaryDataWrapper">
        <Row>
            <Col xs={12}>
                <p><small>Last Updated at <b>{Date.slice(0,10)}</b></small></p>
            </Col>
            <Col xs={12} md={6}>
                <Card className="summaryCard">
                    <Card.Body className="txt-center">
                        <Row >
                            <Col xs={12}>
                                <p className="m-0 summaryDataTitle">Total Confirmed</p>
                                <p className="m-0 summaryDataNumber">{TotalConfirmed}</p>
                            </Col>
                        </Row>
                        <Row className="m-3">
                            <Col xs={12} md={6}>
                                <div className="summaryGreen p-3">
                                    <p className="m-0 summaryDataTitle">Total Recovered</p>
                                    <p className="m-0 summaryDataNumber">{TotalRecovered}</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="summaryRed p-3">
                                    <p className="m-0 summaryDataTitle">Total Deaths</p>
                                    <p className="m-0 summaryDataNumber">{TotalDeaths}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6}>
                <Card className="summaryCard">
                    <Card.Body className="txt-center">
                        <Row >
                            <Col xs={12}>
                                <p className="m-0 summaryDataTitle">New Confirmed</p>
                                <p className="m-0 summaryDataNumber">{NewConfirmed}</p>
                            </Col>
                        </Row>
                        <Row className="m-3">
                            <Col xs={12} md={6}>
                                <div className="summaryGreen p-3">
                                    <p className="m-0 summaryDataTitle">New Recovered</p>
                                    <p className="m-0 summaryDataNumber">{NewRecovered}</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="summaryRed p-3">
                                    <p className="m-0 summaryDataTitle">New Deaths</p>
                                    <p className="m-0 summaryDataNumber">{NewDeaths}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default SummaryData;
