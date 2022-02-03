import './SummaryTable.css';
import React from 'react';
import { useTable, useSortBy,usePagination } from 'react-table'
import {Link} from 'react-router-dom'
function SummaryTable({tabledata}) {
  
  const tableMapData = tabledata.map((country,index)=>{
    const {Country,Slug,NewConfirmed,TotalConfirmed,NewDeaths,TotalDeaths,NewRecovered,TotalRecovered} = country
    const deathRate = ((TotalDeaths/TotalConfirmed)*100).toFixed(2)+' %';
    return{col1:(index+1),col2:<Link className='tableLink' to={`/covid-tracker/${Slug}`}>{Country}</Link>,col3:TotalConfirmed,col4:TotalDeaths,col5:TotalRecovered,col6:NewConfirmed,col7:NewDeaths,col8:NewRecovered,col9:deathRate}
  })
  const data = React.useMemo(() => tableMapData,[])
  const columns = React.useMemo(
    () => [{Header: 'S.No',accessor: 'col1',},
          {Header: 'Country',accessor: 'col2',},
          {Header: 'Total Cases',accessor: 'col3',},
          {Header: 'Total Deaths',accessor: 'col4',},
          {Header: 'Total Recov.',accessor: 'col5',},
          {Header: 'New Caese',accessor: 'col6',},
          {Header: 'New Deaths',accessor: 'col7',},
          {Header: 'Total Recov.',accessor: 'col8',},
          {Header: 'Deaths %',accessor: 'col9',},
        ],
        []
  )
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
      state: { pageIndex, pageSize },
  } = useTable({ columns, data,initialState: { pageIndex: 0, pageSize:20 }, },useSortBy, usePagination)
  const firstPageRows = page;

  return <div className='tableWrapper'>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='tableHead'>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className='tableData'>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
      <div className="pagination mt-3">  
        <span className='mt-1 d-block'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            className='tableInput'
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          className='tableInput'
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10,20,30,40,50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>;
}

export default SummaryTable;
