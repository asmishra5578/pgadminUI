import Avatar from '@components/avatar'
import { Table, Card } from 'reactstrap'
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'
// import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import Datatablecomponent from '../../../layouts/components/Datatablecomponent'

const CompanyTable = (complaintddata) => {
  // console.log('complaintddata', complaintddata)
  const columns = [
    {
        name: 'Complaint Id',
        selector: 'complaintId',
        sortable: true,
        minWidth: '150px'
      },
      {
        name: 'Complaint Type',
        selector: 'commType',
        sortable: true,
        minWidth: '200px'
      },
      {
        name: 'Complaint SubType',
        selector: 'commSubType',
        sortable: true
      }, 
      {
        name: 'Messege',
        selector: 'complaintTest',
        sortable: true
      },
  {
    name: 'Created',
    selector: 'created',
    sortable: true
  },
  {
    name: 'Created By',
    selector: 'createdBy',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true
  }
]
  const data = [
    {
      img: require('@src/assets/images/icons/toolbox.svg').default,
      name: 'Dixons',
      email: 'meguc@ruj.io',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: '23.4k',
      time: '24 hours',
      revenue: '891.2',
      sales: '68'
    },
    {
      img: require('@src/assets/images/icons/parachute.svg').default,
      name: 'Motels',
      email: 'vecav@hodzi.co.uk',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: '78k',
      time: '2 days',
      revenue: '668.51',
      sales: '97',
      salesUp: true
    },
    {
      img: require('@src/assets/images/icons/brush.svg').default,
      name: 'Zipcar',
      email: 'davcilse@is.gov',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '162',
      time: '5 days',
      revenue: '522.29',
      sales: '62',
      salesUp: true
    },
    {
      img: require('@src/assets/images/icons/star.svg').default,
      name: 'Owning',
      email: 'us@cuhil.gov',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: '214',
      time: '24 hour',
      revenue: '291.01',
      sales: '88',
      salesUp: true
    },
    {
      img: require('@src/assets/images/icons/book.svg').default,
      name: 'Cafés',
      email: 'pudais@jife.com',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: '208',
      time: '1 week',
      revenue: '783.93',
      sales: '16'
    },
    {
      img: require('@src/assets/images/icons/rocket.svg').default,
      name: 'Kmart',
      email: 'bipri@cawiw.com',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '990',
      time: '1 month',
      revenue: '780.05',
      sales: '78',
      salesUp: true
    },
    {
      img: require('@src/assets/images/icons/speaker.svg').default,
      name: 'Payers',
      email: 'luk@izug.io',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '12.9k',
      time: '12 hours',
      revenue: '531.49',
      sales: '42',
      salesUp: true
    }
  ],
    colorsArr = {
      Technology: 'light-primary',
      Grocery: 'light-success',
      Fashion: 'light-warning'
    }

  const renderData = () => {
    return data.map(col => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      return (
        <tr key={col.name}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <img src={col.img} alt={col.name} />
                </div>
              </div>
              <div>
                <div className='font-weight-bolder'>{col.name}</div>
                <div className='font-small-2 text-muted'>{col.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <Avatar className='mr-1' color={colorsArr[col.category]} icon={col.icon} />
              <span>{col.category}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='font-weight-bolder mb-25'>{col.views}</span>
              <span className='font-small-2 text-muted'>in {col.time}</span>
            </div>
          </td>
          <td>${col.revenue}</td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='font-weight-bolder mr-1'>{col.sales}%</span>
              {IconTag}
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      {/* <Table responsive>
        <thead>
          <tr>
            <th>Complaint Id</th>
            <th>Complaint Type</th>
            <th>Complaint SubType</th>
            <th>Complaint Text</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaintddata.complaintddata.length === 0 ? null : complaintddata.complaintddata.map((v) => {
                return <tr>
                  <td>{v.complaintId}</td>
                  <td>{v.commType}</td>
                  <td>{v.commSubType}</td>
                  <td>{v.complaintTest}</td>
                  <td>{v.status}</td>
                </tr>
              })
          }
        </tbody>
      </Table> */}
        <Datatablecomponent data={complaintddata.complaintddata} ispageperdata coloumnsprops={columns} routename="List of Complain Ticket" />

    </Card>
  )
}

export default CompanyTable
