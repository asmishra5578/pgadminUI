import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import UILoader from '@components/ui-loader'
import { useHistory } from 'react-router-dom'

const CardMedal = (props) => {
  const history = useHistory()

  const routetoalltransaction = () => {
    history.push('/pg/alltransactionreport')           
  }
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Congratulations 🎉 {props.adminusername}</h5>
        <CardText className='font-small-6'>Total Transaction</CardText>
    <UILoader blocking={props.uiblock}>
        <h3>
          <a>
          ₹ {props.totaltransaction}
          </a>
        </h3>
        </UILoader>
        <Button.Ripple color='primary' onClick={routetoalltransaction}>View Details</Button.Ripple>
        {/* <img className='congratulation-medal' src={medal} alt='Medal Pic' /> */}
      </CardBody>
    </Card>
  )
}

export default CardMedal
