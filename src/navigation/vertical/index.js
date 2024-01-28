// ** Navigation sections imports
import apps from './apps'
//import pages from './pages'
import forms from './forms'
//import tables from './tables'
//import others from './others'
import dashboards from './dashboards'
import distributor from './distributor'
//import uiElements from './ui-elements'
//import chartsAndMaps from './charts-maps'
import useEazy from '@src/auth/eazy/useEazy'

// ** Merge & Export
//export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others]
const navigation = [...dashboards, ...apps, ...forms, ...distributor]
/*
if (useEazy.checkPayoutFlag() === "True") {
   navigation = [...dashboards, ...apps, ...forms]
} else {
   navigation =  [...dashboards, ...apps]
}*/

export default navigation

