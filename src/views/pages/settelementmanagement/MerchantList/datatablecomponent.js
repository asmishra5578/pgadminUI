import { columns } from './data'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'

const Tablecomponet = (props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h6'>List of merchants for pending settlements with actual settlement based on commissions.</CardTitle>
            </CardHeader>
            <DataTable
                noHeader
                pagination
                expandableRows
                data={props.data}
                columns={columns}
                // expandOnRowClicked
                // className='react-dataTable'
                // sortIcon={<ChevronDown size={10} />}
                // paginationDefaultPage={currentPage + 1}
                // expandableRowsComponent={<ExpandableTable />}
            // paginationRowsPerPageOptions={[10, 25, 50, 100]}
            // paginationComponent={CustomPagination}
            />
        </Card>
    )
}
export default Tablecomponet