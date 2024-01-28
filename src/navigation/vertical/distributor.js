import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, CreditCard, DollarSign, Database, Download } from 'react-feather'

export default [
  {
    header: 'Distributor Management'
  },
  {
    id: 'distributormanage',
    title: 'Distributor Manage',
    icon: <User size={20} />,
    children: [
      {
        id: 'distributorlist',
        title: 'Distributor Details',
        icon: <Circle size={12} />,
        navLink: '/distributordetails'
      },
      {
        id: 'merchantdistributorlist',
        title: 'Merchant List',
        icon: <Circle size={20} />,
        navLink: '/distributor/merchantlist'
      }
    ]
  },
  {
    header: 'Admin Management'
  },
  {
    id: 'Createadmin',
    title: 'Create Admin',
    icon: <Calendar size={20} />,
    navLink: '/createAdmin'
  },
  {
    header: 'Miscellaneous'
  },
  {
    id: 'ComplaintRequest',
    title: 'ComplaintRequest',
    icon: <Calendar size={20} />,
    navLink: '/pg/ComplaintRequest'
  },
  {
    id: 'refund',
    title: 'Refund',
    icon: <Calendar size={20} />,
    navLink: '/pg/refund'
  }

  // bolow code comment for future use
  // {
  //   id: 'adminrequest',
  //   title: 'Admin Request',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'wishList',
  //       title: 'Merchant Request',
  //       icon: <Circle size={12} />,
  //       navLink: '/distributor/merchantrequest'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Recharge request',
  //       icon: <Circle size={20} />,
  //       navLink: '/distributor/rechargerequest'
  //     }
  //   ]
  // }
]
