import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import { useTable, useSortBy, usePagination } from 'react-table'

function TableComponent({ data, withinCard }) {
  const columns = React.useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'first_name'
    },
    {
      Header: 'Last Name',
      accessor: 'last_name'
    },
    {
      Header: 'Gender',
      accessor: 'gender'
    },
    {
      Header: 'Company',
      accessor: 'company'
    }
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize
    }
  } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  )

  return (
    <div>
      <table className={`table table-striped ${withinCard ? 'card-table' : ''}`} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? <i className="ion ion-ios-arrow-down ml-2" />
                      : <i className="ion ion-ios-arrow-up ml-2" />
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <hr />
      <div className={`d-flex align-items-center flex-wrap ${withinCard ? 'px-4 pb-4' : ''}`}>
        <div className="mr-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <select className="custom-select custom-select-sm mr-auto" style={{ width: '100px' }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <div className="mr-2">
          Go to page:&nbsp;
          <input
            className="form-control form-control-sm d-inline-block"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </div>
        
        <ul className="pagination mb-0">
          <li className="page-item">
            <a className={`page-link ${canPreviousPage ? '' : 'disabled'}`} href="#start" onClick={e => {
              e.preventDefault()
              gotoPage(0)
            }}>{'<<'}</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${canPreviousPage ? '' : 'disabled'}`} href="#prev" onClick={e => {
              e.preventDefault()
              previousPage()
            }}>{'<'}</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${canNextPage ? '' : 'disabled'}`} href="#next" onClick={e => {
              e.preventDefault()
              nextPage()
            }}>{'>'}</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${canNextPage ? '' : 'disabled'}`} href="#end" onClick={e => {
              e.preventDefault()
              gotoPage(pageCount - 1)
            }}>{'>>'}</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

class CuiReactTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    // Load data
    this.loadData('/json/table-data.json').then(data => {
      this.setState({ data })
    })
  }

  async loadData(url) {
    const response = await axios.get(process.env.PUBLIC_URL + url)
    return response.data
  }

  render() {
    return (
      <div className="ui-block">
        <h3 className="ui-block-heading">react-table</h3>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/tannerlinsley/react-table" className="ui-block-description">https://github.com/tannerlinsley/react-table</a>

        <h4 className="ui-block-heading">Examples</h4>

        <div className="cui-example cui-example-vertical-spacing-sm">
          <TableComponent data={this.state.data} />

          <Card className="mb-3 mt-4">
            <Card.Header as="h6">Within card</Card.Header>
            <TableComponent data={this.state.data} withinCard={true} />
          </Card>
        </div>
      </div>
    )
  }
}

export default CuiReactTable
