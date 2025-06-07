"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button"; // ✅ Added Button import

interface SupportTicket {
  ticketId: number;
  customerName: string;
  issueSummary: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in progress" | "closed";
  assignedTo: string | null;
  action: string;
}

const ticketsData: SupportTicket[] = [
  {
    ticketId: 1001,
    customerName: "Alice Johnson",
    issueSummary: "App crashes on login",
    priority: "high",
    status: "open",
    assignedTo: "Support Agent 1",
    action: "View Details",
  },
  {
    ticketId: 1002,
    customerName: "Bob Smith",
    issueSummary: "Payment not processed",
    priority: "medium",
    status: "in progress",
    assignedTo: "Support Agent 2",
    action: "View Details",
  },
  {
    ticketId: 1003,
    customerName: "Cathy Lee",
    issueSummary: "Feature request: Dark mode",
    priority: "low",
    status: "closed",
    assignedTo: null,
    action: "View Details",
  },
];

export default function SupportTicketsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ticket ID
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Customer
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Issue Summary
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Priority
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Assigned To
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {ticketsData.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {ticket.ticketId}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ticket.customerName}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ticket.issueSummary}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      ticket.priority === "high"
                        ? "error"
                        : ticket.priority === "medium"
                        ? "warning"
                        : undefined
                    }
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      ticket.status === "open"
                        ? "error"
                        : ticket.status === "in progress"
                        ? "warning"
                        : "success"
                    }
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ticket.assignedTo || "Unassigned"}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Button size="sm" variant="outline">
                    {ticket.action}
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
