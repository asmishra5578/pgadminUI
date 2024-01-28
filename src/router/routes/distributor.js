import { lazy } from 'react'
const DistributorRoutes = [
  {
    path: '/distributordetails',
    component: lazy(() => import('../../views/pages/distributor/distributordetails/index'))
  },
  {
    path: '/distributor/merchantlist',
    component: lazy(() => import('../../views/pages/distributor/merchantdetails/index'))
  }
]
export default DistributorRoutes