import { Statistic, Card, Row, Col} from 'antd'
import { useSelector, useDispatch } from 'react-redux';
export default function () {
    const app = useSelector(state => state.app)
  return (
    <>

      <div style={
        { marginBottom: '20px' }
      }>
        <Row style={
          { display: 'flex', justifyContent: 'space-around' }
        }>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="connectedMiners"
                value={app[0].poolStats.connectedMiners || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="poolHashrate"
                value={app[0].poolStats.poolHashrate || 0}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="poolFeePercent"
                value={app[0].poolFeePercent || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="totalPaid"
                value={app[0].totalPaid || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="totalBlocks"
                value={app[0].totalBlocks || 0}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="poolEffort"
                value={app[0].poolEffort || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          </Row>
          <Row style={
          { display: 'flex', justifyContent: 'space-around' }
        }>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="networkHashrate"
                value={app[0].networkStats.networkHashrate || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="networkDifficulty"
                value={app[0].networkStats.networkDifficulty || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          </Row>
          <Row style={
          { display: 'flex', justifyContent: 'space-around' }
        }>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="minimumPayment"
                value={app[0].paymentProcessing.minimumPayment || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="payoutScheme"
                value={app[0].paymentProcessing.payoutScheme || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="coin"
                value={app[0].coin.name || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="algorithm"
                value={app[0].coin.algorithm || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}