import React, { useState } from "react";
import { Table, TextInput, Pagination } from "@mantine/core";

interface Column<T> {
  label: string;
  accessor: keyof T;
  sortable?: boolean;
}

interface EntityTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowsPerPage: number;
}
export function EntityTable<T>({
  data,
  columns,
  rowsPerPage = 5,
}: EntityTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.accessor]).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const startIndex = (activePage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (column: keyof T) => {
    if (sortKey === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <TextInput
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Table className="border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor as string}
                onClick={() => col.sortable && handleSort(col.accessor)}
                className={`py-2 px-4 text-left ${
                  col.sortable ? "cursor-pointer hover:text-blue-600" : ""
                }`}
              >
                {col.label}
                {col.sortable && sortKey === col.accessor && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="border-t">
                {columns.map((col) => (
                  <td key={col.accessor as string} className="py-2 px-4">
                    {String(item[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        total={Math.ceil(filteredData.length / rowsPerPage)}
        value={activePage}
        onChange={setActivePage}
      />
    </div>
  );
}
