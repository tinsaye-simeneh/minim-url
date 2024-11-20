import React from "react";
import { EntityTable } from "@/components/EntityTable";

interface Link {
  id: number;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

const columns =  [
  { label: "Short URL", accessor: "shortUrl", sortable: true },
  { label: "Original URL", accessor: "originalUrl", sortable: true },
  { label: "Created At", accessor: "createdAt", sortable: true },
  {label: "Id" , accessor: "id", sortable: true}
  {label: "Created At" , accessor: "createdAt", sortable: true}
];

export default function LinksListPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Links List</h1>
      <EntityTable data={links} columns={columns} rowsPerPage={5} />
    </div>
  );
}
