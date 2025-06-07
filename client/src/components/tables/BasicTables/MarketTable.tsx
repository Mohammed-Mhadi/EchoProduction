import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { Redirection } from "../../transaction/Redirection"; // import your redirect helper

interface Market {
  id: number;
  user_id: number;
  name: string;
  location: string;
  contact_info: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export default function MarketTable() {
  const [tableData, setTableData] = useState<Market[]>([]);
  const redirectTo = Redirection();  // get redirect function

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const response = await fetch("http://localhost:3000/markets/");
        if (!response.ok) {
          throw new Error("Failed to fetch markets");
        }
        const data: Market[] = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    }

    fetchMarkets();
  }, []);

  const handleEdit = (id: number) => {
    redirectTo(`/markets/edit/${id}`);  // redirect to the edit page with market id
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Market ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Market Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Location
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Contact Info
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((market) => (
              <TableRow key={market.id}>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">
                  #{market.id}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">
                  {market.name}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">
                  {market.location}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {market.description ?? "N/A"}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {market.contact_info ?? "N/A"}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {new Date(market.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(market.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
