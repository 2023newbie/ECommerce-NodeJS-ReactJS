import styled from 'styled-components'
import InfoBoard from '../components/InfoBoard'
import Orders from '../components/Orders'
import url from '../utils/url'

const Container = styled.div`
  background-color: #f9fbfd;
  padding: 16px;
  & .title {
    color: #64676d;
    margin-bottom: 16px;
  }
`

const Dashboard = () => {
  return (
    <Container>
      <div className='title'>Dashboard</div>
      <InfoBoard />
      <Orders />
    </Container>
  )
}

export default Dashboard

export async function loader() {
  try {
    return await fetch(url.root + '/admin/dashboard')
  } catch (err) {
    console.log(err);
  }
} 