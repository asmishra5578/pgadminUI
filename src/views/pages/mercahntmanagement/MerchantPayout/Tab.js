import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Link, Bell } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>Set payout commission</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>IP Whitelisting</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Info size={18} className='mr-1' />
          <span className='font-weight-bold'>Set Payout Limit</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Link size={18} className='mr-1' />
          <span className='font-weight-bold'>Create Merchant Disbursal Account (Add merchant wallet ID)</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <Bell size={18} className='mr-1' />
          <span className='font-weight-bold'>Create Merchant VAN Account</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
