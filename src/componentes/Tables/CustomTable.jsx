import { flexRender } from "@tanstack/react-table";
import "./table.css";
import { useState } from "react";
import useTable from "./useTableV2";

const CustomTable = (props) => {
  const { table, setSorting, actionRefreshData, optionsTable,isTableSelected = false } = { ...props };

  const customStyles = optionsTable?.styles ?? {
    maxHeight: "400px"
  };

  const customClass = optionsTable?.classNames ?? "overflow-auto";
  //"bg-white dark:bg-neutral-800 relative perfect-scrollbar ps--active-x ps--active-y group/ps overflow-hidden [overflow-anchor:none] touch-none"
  console.log(customStyles);

  const getCommonPinningStyles = ({ column, isColumn }) => {
    //   const isPinned = column.getIsPinned()
    //   const isLastLeftPinnedColumn =
    //     isPinned === 'left' && column.getIsLastColumn('left')
    //   const isFirstRightPinnedColumn =
    //     isPinned === 'right' && column.getIsFirstColumn('right')
    const isSticky = column.id === "select" || column.id === "clave";
    const isSelect = column.id === "select";
    const minWidth = isSelect
      ? "35px"
      : column.getSize().toString().concat("px");
    return {
      // boxShadow: isLastLeftPinnedColumn
      //   ? '-4px 0 4px -4px gray inset'
      //   : isFirstRightPinnedColumn
      //     ? '4px 0 4px -4px gray inset'
      //     : undefined,
      left: isSelect
        ? `${column.getStart("left")}px`
        : isSticky && isTableSelected
        ? "35px"
        : isSticky ? '0px' : undefined,
      // right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      //opacity: isSticky ? 0.95 : 1,
      position: isSticky ? "sticky" : "relative", //isPinned ? 'sticky' : 'relative',
      width: isSelect ? minWidth : column.getSize(),
      minWidth: `${minWidth}`,
      zIndex: isSticky ? 1 : 0,
      background: isSticky ? "white" : "transparent",
      // textAlign: isSelect || isColumn ? 'center' : 'left'//para mantener los encabezados de la tabla centrados
      textAlign: isSelect ? "center" : "left",
      paddingLeft: isSelect ? "1rem" : "1.25rem"
    };
  };

  return (
    <>
      <div className={customClass} style={{ ...customStyles }}>
        <table>
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({
                          column: header.column,
                          isColumn: true
                        })
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex flex-row group"
                              : "flex flex-row group"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Orden ascendente"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Orden descendente"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {/* add filter component
                        {header.column.getCanFilter() ? (
                                <div>
                                <Filter column={header.column} table={table} />
                                </div>
                            ) : null} */}
                          {/** Add sorting component */}
                          {{
                            asc: (
                              <div
                                className="inline-flex"
                                onClick={() =>
                                  setSorting([
                                    {
                                      id: header.column.id,
                                      desc: "true"
                                    }
                                  ])
                                }
                              >
                                <span
                                  className="w-[15px] h-[10px] origin-bottom font-black mr-1 text-neutral-500 group-hover:opacity-100 transition hover:ease-in-out transform ease-linear duration-300 motion-reduce:transition-none dark:text-neutral-400 opacity-100"
                                  data-te-sort="orden"
                                  data-te-datatable-sort-icon-ref=""
                                  style={{ transform: "rotate(180deg)" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            ),
                            desc: (
                              <div
                                className="inline-flex"
                                onClick={() =>
                                  setSorting([
                                    {
                                      id: header.column.id,
                                      asc: "true"
                                    }
                                  ])
                                }
                              >
                                <span
                                  className="w-[15px] h-[10px] origin-bottom font-black mr-1 text-neutral-500 group-hover:opacity-100 transition hover:ease-in-out transform ease-linear duration-300 motion-reduce:transition-none dark:text-neutral-400 opacity-100"
                                  data-te-sort="orden"
                                  data-te-datatable-sort-icon-ref=""
                                  style={{ transform: "rotate(0deg)" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            )
                          }[header.column.getIsSorted()] ?? null}

                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({
                            column: cell.column,
                            isColumn: false
                          })
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex md:flex-row justify-end items-center py-2 space-x-4 text-sm flex-col leading-[1.6]  border-neutral-200 dark:border-neutral-500 bg-white dark:bg-neutral-800">
        <div className="flex items-center space-x-4 order-3 md:order-none">
          {actionRefreshData ? (
            <button
              onClick={() => actionRefreshData()}
              style={{ fontSize: "24px" }}
            >
              <svg
                fill="#706e6efc"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
                viewBox="0 0 383.748 383.748"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"></path>
                    <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path>
                  </g>
                </g>
              </svg>
            </button>
          ) : (
            ""
          )}
          <span className="font-light">Registros por página</span>
          <div className="w-[70px] ">
            <select
              style={{ WebkitAppearance: "none" }}
              value={table?.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="font-normal order-2 mb-3 md:order-none md:mb-0 ">
          <p>
            {table?.getState().pagination.pageIndex *
              table?.getState().pagination.pageSize +
              1}
            {" - "}
            {table?.getState().pagination.pageIndex *
              table?.getState().pagination.pageSize +
              table?.getRowModel().rows.length}{" "}
            {optionsTable && optionsTable?.ofText
              ? optionsTable.ofText
              : " Registros de "}{" "}
            {table?.getRowCount()}
          </p>
        </div>

        <div className="order-1 my-3 md:order-none md:my-0 md:pr-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table?.getCanPreviousPage()}
            className="inline-block rounded p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent dark:hover:bg-neutral-500 dark:disabled:hover:bg-transparent dark:disabled:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.75 20.5L1.25 12l7.5-7.5"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table?.getCanPreviousPage()}
            className="inline-block rounded p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent dark:hover:bg-neutral-500 dark:disabled:hover:bg-transparent dark:disabled:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table?.getCanNextPage()}
            className="inline-block rounded p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent dark:hover:bg-neutral-500 dark:disabled:hover:bg-transparent dark:disabled:text-neutral-600 relative overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table?.getCanNextPage()}
            className="inline-block rounded p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent dark:hover:bg-neutral-500 dark:disabled:hover:bg-transparent dark:disabled:text-neutral-600 relative overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>

        {/* <span className="flex items-center gap-1">
        <div>Página</div>
        <strong>
          {table?.getState().pagination.pageIndex + 1} de{" "}
          {table?.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Ir a la página:
        <input
          type="number"
          defaultValue={table?.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span> */}

        {/* <div>{table?.getRowModel().rows.length} Registros</div> */}
      </div>
      {/* <div>
      <button
        className="border rounded p-2 mb-2"
        onClick={() =>
          console.info(
            'table.getSelectedRowModel().flatRows',
            table.getSelectedRowModel().flatRows
          )
        }
      >
        Log table.getSelectedRowModel().flatRows
      </button>
    </div>
    <div>
      <label>Row Selection State:</label>
      <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
    </div> */}
    </>
  );
};

export const CustomGenericTable = ({
  columnsData,
  data,
  optionsTable,
  setData,
  getData,
  isTableSelected = false,
  //callBackAction,
}) => {

  const [globalFilter] = useState("");
  const [columnFilters] = useState("");

  //const [rowSelected, setRowSelected] = useState("")
  const [sorting, setSorting] = useState([
    {
      id: "clave",
      desc: "true"
    }
  ]);

  const { table } = useTable({
    isSelected: isTableSelected,
    //isMultiRowSelection: true,
    setData,
    data,
    columns: columnsData,
    globalFilter,
    columnFilters,
    sorting,
    setSorting
  });

  // function CallToAction() {
  //   console.log("action click Eliminar proveedores");
  //   console.log(table.getSelectedRowModel().flatRows);
  //   setRowSelected(table.getSelectedRowModel().flatRows[0].original);
  //   if (callBackAction) callBackAction(table.getSelectedRowModel().flatRows[0].original)
  // }

  // const crearFiltro = () => {
  //   const headerCl = table.getHeaderGroups().at(0).headers[1];
  //   console.log(headerCl);
  //   return (
  //     <div>
  //       <Filter column={headerCl.column} table={table} />
  //     </div>
  //   );
  // };

  // const buttonTertiary = {
  //   action: CallToAction,
  //   disabled: table?.getSelectedRowModel().flatRows.length <= 0,
  //   type: "button",
  //   label: "Eliminar"
  // };


  return (
    <>
      {/* <div>
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div> */}
      <CustomTable
        table={table}
        setSorting={setSorting}
        actionRefreshData={() => getData()}
        optionsTable={optionsTable}
        // optionsTable={
        //   {
        //     styles : {
        //       width: '100%', height: '600px'
        //     },
        //     classNames : 'overflow-auto'
        //   }
        // }
        />
    </>
  );
};

export default CustomTable;
