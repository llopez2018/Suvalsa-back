import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IndeterminateCheckbox } from "./utils";

export const useTable = ({
  isSelected = false,
  setData,
  data,
  columns,
  defaultColumn,
  globalFilter,
  conditionalSelection,
  isMultiRowSelection,
  columnFilters,
  sorting,
  setSorting
}) => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [columnVisibility, setColumnVisibility] = useState({
    id: false //hide this column by default
  });

  const [rowSelection, setRowSelection] = useState({});

  const customColumns = useMemo(() => {
    if (isSelected)
      return [
        {
          id: "select",
          //para multiselect
          header: ({ table }) =>
            isMultiRowSelection ? (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler()
                }}
              />
            ) : (
              <></>
            ),
          cell: ({ row }) => (
            <div className="px-1">
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler()
                }}
              />
            </div>
          )
        },
        ...columns
      ];
    else return [...columns];
  }, []);

  const table = useReactTable({
    data,
    columns: customColumns,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      columnVisibility,
      globalFilter,
      columnFilters,
      sorting
    },

    enableMultiRowSelection: isMultiRowSelection ?? false,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: (row) => conditionalSelection ? conditionalSelection(row) : true, // or enable row selection conditionally per row
    //enableMultiSort: true,
    //isMultiSortEvent: (e) => true,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex,
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    enableSortingRemoval: false, // disable the ability to remove sorting on columns (always none -> asc -> desc -> asc)
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        console.log(value);
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...(old[rowIndex] ?? []),
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    debugTable: true
  });

  return {
    table
  };
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
}

export default useTable;
