import { useSelector, useDispatch } from 'react-redux';
import { getStatistics } from '@/request'
import { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs';
import { Table, Statistic, Card, Row, Col, Input, message, Tabs } from 'antd'
const { Search } = Input
const { TabPane } = Tabs
export default function () {
  const app = useSelector(state => state.app)
  const searchEl = useRef(null)
  const [listData, setListData] = useState([])
  const [list, setList] = useState([])
  const [headerData, setHeaderData] = useState({})
  const [columns, setColumns] = useState([
    {
      title: 'workerName',
      dataIndex: 'workerName',
      key: 'workerName',
    },
    {
      title: 'hashrate',
      dataIndex: 'hashrate',
      key: 'hashrate',
    },
    {
      title: 'sharesPerSecond',
      dataIndex: 'sharesPerSecond',
      key: 'sharesPerSecond',
    }
  ])
  const [activeKey, setActiveKey] = useState('0')
  const [timeId, setTimeId] = useState(null)
  const getList = (val) => {
    setActiveKey('0')
    if (!val) {
      return message.warning('please input miner-wallet-address')
    }
    getStatistics({ id: app[0].id, address: val }).then(res => {
      setHeaderData(res)
      let temp = res.performanceSamples.sort((a, b) => -1)
      temp = temp.map(item => ({ ...item, workers: preWorkers(item) }))
      setList(temp)
      tabChange('0', temp)
    })
  }
  const preWorkers = (data) => {
    const workers = []
    for (const key in data.workers) {
      workers.push({ created: data.created, ...data.workers[key], workerName: key, hashrate: data.workers[key].hashrate / 1000000 })
    }
    return workers
  }
  const getLoop = () => {
    clearTimeout(timeId)
    const inp = searchEl.current
    if (!inp || !inp.state || !inp.state.value) return
    setTimeId(setTimeout(() => {
      getList(inp.state.value)
    }, 30000))
  }
  const tabChange = (val, tempList) => {
    getLoop()
    setActiveKey(val)
    setListData((tempList || list)[val].workers)
    updateTitle((tempList || list)[val].workers, tempList)
  }
  const updateTitle = (currentList, tempList) => {
    console.log(currentList)
    const temp = [...columns]
    // const sum = currentList.reduce((sum, item) => sum + item.hashrate, 0)
    const sum = (tempList || list).reduce((sum, item) => {
      return sum + item.workers.reduce((nodeSum, node) => nodeSum + node.hashrate, 0)
    }, 0)
    temp[0].title = `workerName(${currentList.length})`
    temp[1].title = `hashrate(${sum / 24})`
    setColumns(temp)
  }
  return (
    <>
      <Search ref={searchEl} placeholder="input miner-wallet-address" enterButton="Search" size="large"
        style={
          { marginBottom: '20px' }
        } onSearch={getList} />
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
                title="pendingShares"
                value={headerData.pendingShares || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="pendingBalance"
                value={headerData.pendingBalance || 0}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="totalPaid"
                value={headerData.totalPaid || 0}
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
                value={headerData.todayPaid || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="lastPayment"
                value={headerData.lastPayment || 0}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col style={
            { flex: 1 }
          } >
            <Card>
              <Statistic
                title="lastPaymentLink"
                value={headerData.lastPaymentLink || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={
        { marginBottom: '20px' }
      }>
      </div>
      <Tabs type="card" activeKey={activeKey} tabPosition={'top'} style={{ height: 60 }} onChange={tabChange}>
        {list.map((item, index) => (
          <TabPane tab={`${dayjs(item.created).format('MM-DD HH:mm')}`} key={index} ></TabPane>
        ))}
      </Tabs>
      <Table rowKey="workerName" dataSource={listData} columns={columns} pagination={{ position: ['none', 'none'] }} />
    </>
  )
}