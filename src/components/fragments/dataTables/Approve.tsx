"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSession } from "next-auth/react";
import coursesInstance from "@/instances/courses";
import { useDispatch } from "react-redux";
import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { approveCourses } from "@/store/slices/courses";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import EmployeeDetail from "../details/Employee";
import CourseDetail from "../details/Course";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nik",
    header: () => <div>NIK Employee</div>,
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger>
            <Badge className="font-medium cursor-pointer">{row.getValue("nik")}</Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-[30rem]">
            <EmployeeDetail nik={row.getValue("nik")} />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name Employee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "codeCourse",
    header: () => <div>Code Course</div>,
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger>
            <Badge className="font-medium cursor-pointer">{row.getValue("codeCourse")}</Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-[30rem]">
            <CourseDetail code={row.getValue("codeCourse")} />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "nameCourse",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nameCourse")}</div>,
  },
  {
    accessorKey: "approve",
    header: () => <div>Approve</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("approve")}</div>;
    },
  },
];

export function ApproveDataTable({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

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
  const user = session.data?.user;

  const handleClick = async (type: string) => {
    if (type === "approve") {
      const confirmed: boolean = await confirmAlert(`Are you sure you want process ${type} this courses?`);
      if (!confirmed) return;
    }
    setIsLoading(true);
    try {
      const selectedCourses = Object.keys(rowSelection).map((key) => data.find((item: any, index: number) => index === parseInt(key)));

      const selectedData: any = {
        codes: selectedCourses.map((item: any) => item.codeCourse),
        nik: user.nik,
        nikApproves: selectedCourses.map((item: any) => item.nik),
        name: user.name,
        golongan: user.golongan,
        empccname: user.empccname,
        superiorNIK: user.superiorNIK,
        action: type,
      };

      if (type === "reject") selectedData.message = message;

      const response = await coursesInstance.manageCoursesEmployee(selectedData, token);
      const approveData = {
        codes: selectedCourses.map((item: any) => item.codeCourse),
        nikApproves: selectedCourses.map((item: any) => item.nik),
      };
      dispatch(approveCourses(approveData));
      successAlert(response.data.message);
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
      <div className="flex pb-2 gap-4">
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={() => handleClick("approve")} className="bg-green-600 hover:bg-green-800">
            Approve
          </Button>
        )}
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger>
              <Button onClick={() => setMessage("")} className="bg-red-600 hover:bg-red-800">
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Give a reason for rejection!</DialogTitle>
                <DialogDescription>
                  <div className="grid w-full gap-2">
                    <Textarea className="text-black" placeholder="Type your message here..." value={message} onChange={(event) => setMessage(event.target.value)} />
                    {isLoading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button onClick={() => handleClick("reject")} className="bg-red-600 hover:bg-red-800">
                        Send message
                      </Button>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
