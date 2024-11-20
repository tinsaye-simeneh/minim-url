import React, { useState } from "react";
import {
  Table,
  TextInput,
  Pagination,
  Button,
  Modal,
  Loader,
} from "@mantine/core";
import { format } from "date-fns";

interface Column<T> {
  label: string;
  accessor: keyof T;
  sortable?: boolean;
  isDate?: boolean;
}

interface EntityTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowsPerPage: number;
  isLoading: boolean; // Loading state to control loader visibility
}

export function EntityTable<T>({
  data,
  columns,
  rowsPerPage = 5,
  isLoading,
}: EntityTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<T | null>(null); // Modal state
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility

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

  const handleViewClick = (row: T) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      console.error("Error formatting date:", error);
      return date;
    }
  };

  const trimText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="space-y-4">
      <TextInput
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md w-full"
      />

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="border border-gray-200 w-full">
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
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-t">
                    {columns.map((col) => (
                      <td key={col.accessor as string} className="py-2 px-4">
                        {col.isDate
                          ? formatDate(String(item[col.accessor]))
                          : trimText(String(item[col.accessor]))}
                      </td>
                    ))}
                    <td className="py-2 px-4">
                      <Button onClick={() => handleViewClick(item)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-4 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Pagination
        total={Math.ceil(filteredData.length / rowsPerPage)}
        value={activePage}
        onChange={setActivePage}
        className="mt-4"
      />

      {/* Modal for viewing row details */}
      <Modal
        opened={modalOpen}
        onClose={handleCloseModal}
        title="Row Details"
        size="lg"
      >
        {selectedRow ? (
          <div>
            {columns.map((col) => (
              <div key={col.accessor as string} className="mb-2">
                <strong>{col.label}:</strong>{" "}
                {col.isDate
                  ? formatDate(String(selectedRow[col.accessor]))
                  : String(selectedRow[col.accessor])}
              </div>
            ))}
          </div>
        ) : (
          <div>No details available</div>
        )}
      </Modal>
    </div>
  );
}
