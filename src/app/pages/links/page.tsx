"use client";

import React, { useEffect } from "react";
import { EntityTable } from "@/components/EntityTable";
import { useLinkStore } from "@/store/linkStore";
import { Link } from "@/types/models";

interface Column<T> {
  label: string;
  accessor: keyof T;
  sortable: boolean;
}

const columns: Column<Link>[] = [
  { label: "Id", accessor: "id", sortable: true },
  { label: "Original URL", accessor: "original_url", sortable: true },
  { label: "Short URL", accessor: "short_url", sortable: true },
  { label: "Created At", accessor: "created_at", sortable: true },
];

export default function LinksListPage() {
  const { fetchLinks, links } = useLinkStore();

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Links List</h1>
      <EntityTable data={links} columns={columns} rowsPerPage={5} />
    </div>
  );
}
