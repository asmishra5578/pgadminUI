import { lazy } from 'react'

const Payoutroute = [
    // Dashboards
    // {
    //   path: '/payout',
    //   component: lazy(() => import('../../views/pages/analytic-payout/payouts/index'))
    // },
    {
      path: '/settlements',
      component: lazy(() => import('../../views/pages/analytic-payout/settlements/index')),
      exact: true
    }
  ]
  
  export default Payoutroute