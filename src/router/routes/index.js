// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import Payoutroutes from './Payout'
import PGRoutes from './Pg'
import DistributorRoutes from './distributor'
// ** Document title
const TemplateTitle = '%s - EazyPaymentz'

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes,
  ...Payoutroutes,
  ...PGRoutes,
  ...DistributorRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
