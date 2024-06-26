"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useDispatch, useSelector } from "react-redux";
import coursesInstance from "@/instances/courses";
import { useSession } from "next-auth/react";
import { registerCourses, submitCourses, unregisterCourses } from "@/store/slices/courses";
import { Badge } from "@/components/ui/badge";
import auditsInstance from "@/instances/audits";
import { addAudit } from "@/store/slices/audits";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: () => <div>Code</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "target",
    header: () => <div>Target</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("target")}</div>;
    },
  },
  {
    accessorKey: "categories",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const categories: any = row.getValue("categories");
      return (
        <div className="font-medium">
          {categories.map((category: any, index: number) => (
            <Badge key={index}>{category}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: () => <div>Duration</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("duration")}</div>;
    },
  },
];

export function CourseEmployeeDataTable({ data, isCourses }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.data);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  const token = session.data?.token;
  const name = session.data?.user?.name;

  const handleClick = async (type: string) => {
    const confirmed: boolean = await confirmAlert(`Are you sure you want ${type} this courses?`);
    if (!confirmed) return;
    setIsLoading(true);
    try {
      const selectedCourses = Object.keys(rowSelection).map((key) => data.find((item: any, index: number) => index === parseInt(key)));

      const selectedData: any = {
        codes: selectedCourses.map((item: any) => item.code),
        nik: user.nik,
        name: user.name,
        golongan: user.golongan,
        empccname: user.empccname,
        superiorNIK: user.superiorNIK,
        action: type,
      };

      const nameCourses = selectedCourses.map((item: any) => item.name);

      const response = await coursesInstance.manageCoursesEmployee(selectedData, token);

      const dataAudit = {
        nik: user.nik,
        name: name,
        action: `${type} ${selectedData.codes.length} courses (${nameCourses.join(", ")}) for ${user.name}`,
        date: new Date(),
      };
      await auditsInstance.addAudit(dataAudit, token);
      dispatch(addAudit(dataAudit));

      successAlert(response.data.message);

      if (type === "register") {
        const employee = {
          nik: user.nik,
          name: user.name,
          isSubmit: false,
          golongan: user.golongan,
          empccname: user.empccname,
          approve: user.golongan === "5" ? 2 : 1,
        };

        const registerData = {
          codes: selectedData.codes,
          employee,
        };
        dispatch(registerCourses(registerData));
      } else if (type === "submit") {
        const registerData = {
          codes: selectedData.codes,
          nik: user.nik,
        };
        dispatch(submitCourses(registerData));
      } else if (type === "unregister") {
        const unregisterData = {
          codes: selectedData.codes,
          nik: user.nik,
        };
        dispatch(unregisterCourses(unregisterData));
      }
    } catch (error: any) {
      errorAlert(error.response.data.message);
    } finally {
      setIsLoading(false);
      setRowSelection({});
    }
  };

  return (
    <div className="w-full shadow-lg shadow-gray-300 px-2">
      <div className="flex items-center py-4">
        <Input placeholder="Filter name..." value={(table.getColumn("name")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)} className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
      <div className="flex pb-2">
        {["register", "submit"].map(
          (type: string, index: number) =>
            isCourses === type &&
            (isLoading ? (
              <Button key={index} disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button key={index} onClick={() => handleClick(type)} className="bg-green-600 hover:bg-green-800">
                  {type === "register" ? "Register Courses" : "Submit Courses"}
                </Button>
                {type === "submit" &&
                  (isLoading ? (
                    <Button key={index} disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button key={index} onClick={() => handleClick("unregister")} className="bg-red-600 hover:bg-red-800">
                      Unregistered Courses
                    </Button>
                  ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
