import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button"; // Added import

interface Ad {
  id: number;
  name: string;
  status: "Active" | "Pending" | "Paused";
  duration: string;
  market: string;
  assignedScreens: number;
  action: string;
}

const adsData: Ad[] = [
  {
    id: 101,
    name: "Summer Sale Promo",
    status: "Active",
    duration: "30s",
    market: "Downtown Mall",
    assignedScreens: 12,
    action: "Manage",
  },
  {
    id: 102,
    name: "Back to School",
    status: "Pending",
    duration: "45s",
    market: "City Center",
    assignedScreens: 8,
    action: "Review",
  },
  {
    id: 103,
    name: "New Product Launch",
    status: "Paused",
    duration: "60s",
    market: "Tech Park",
    assignedScreens: 5,
    action: "Resume",
  },
  {
    id: 104,
    name: "Flash Sale",
    status: "Active",
    duration: "15s",
    market: "Suburb Plaza",
    assignedScreens: 10,
    action: "Manage",
  },
];

export default function AdsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ad ID
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ad Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Duration
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Market
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Assigned Screens
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {adsData.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {ad.id}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-700 dark:text-white/90">
                  {ad.name}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm">
                  <Badge
                    size="sm"
                    color={
                      ad.status === "Active"
                        ? "success"
                        : ad.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-700 dark:text-white/90">
                  {ad.duration}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-700 dark:text-white/90">
                  {ad.market}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-700 dark:text-white/90">
                  {ad.assignedScreens}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm">
                  <Button size="sm" variant="outline">
                    {ad.action}
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
