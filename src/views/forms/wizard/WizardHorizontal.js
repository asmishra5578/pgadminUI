import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import { ArrowRight } from 'react-feather'
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'
import Kycdetails from './steps-with-validation/Kycdetails'
import Appidorsecred from './steps-with-validation/appidorsecretkey'
const WizardHorizontal = () => {
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Create Merchant',
      subtitle: 'Enter Merchant Details.',
      content: <AccountDetails stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'personal-info',
      title: 'PG and Services',
      subtitle: 'Add PG and Services',
      content: <PersonalInfo stepper={stepper} type='wizard-horizontal' />
    },
    // {
    //   id: 'step-address',
    //   title: 'Set Merchant Limit',
    //   subtitle: 'Add Limit',
    //   content: <Address stepper={stepper} type='wizard-horizontal' />
    // },
    {
      id: 'social-links',
      title: 'Bank Details',
      subtitle: 'Add Bank Details',
      content: <SocialLinks stepper={stepper} type='wizard-horizontal' />
    }
    // {
    //   id: 'kyc-details',
    //   title: 'KYC Details',
    //   subtitle: 'Add KYC Details',
    //   content: <Kycdetails stepper={stepper} type='wizard-horizontal' />
    // }
    // {
    //   id: 'app-id',
    //   title: 'APP ID or Secret Key',
    //   subtitle: 'Send Details to Merchant',
    //   content: <Appidorsecred stepper={stepper} type='wizard-horizontal' />
    // }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
