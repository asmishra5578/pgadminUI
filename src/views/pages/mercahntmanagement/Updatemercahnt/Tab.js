import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Link, Bell } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>Enable/Disable Merchant &nbsp;</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>Enable/Disable PG and Services</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Info size={18} className='mr-1' />
          <span className='font-weight-bold'>Update Servicewise Limit</span>
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Link size={18} className='mr-1' />
          <span className='font-weight-bold'>Enable/Disable PG</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <Bell size={18} className='mr-1' />
          <span className='font-weight-bold'>Update Bank Details</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '6'} onClick={() => toggleTab('6')}>
          <Info size={18} className='mr-1' />
          <span className='font-weight-bold'>Update KYC Details</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '7'} onClick={() => toggleTab('7')}>
          <Link size={18} className='mr-1' />
          <span className='font-weight-bold'>Update commission Servicewise</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '8'} onClick={() => toggleTab('8')}>
          <Bell size={18} className='mr-1' />
          <span className='font-weight-bold'>Enable/Disable Payout Services</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
