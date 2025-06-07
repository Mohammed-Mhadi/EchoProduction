import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button"; // import Button component
import { Redirection } from "../../transaction/Redirection";


// Screen interface
interface Screen {
  screenId: number;
  screenName: string;
  screenStatus: "Active" | "Inactive" | "Error";
  runningAds: string[];
  market: string;
  numberOfAds: number;
  action: string;
}

// Example screen data
const tableData: Screen[] = [
  {
    screenId: 1,
    screenName: "Entrance Display",
    screenStatus: "Active",
    runningAds: ["Nike Promo", "Local Bank", "Upcoming Event"],
    market: "Downtown Market",
    numberOfAds: 12,
    action: "Manage",
  },
  {
    screenId: 2,
    screenName: "Main Hall",
    screenStatus: "Inactive",
    runningAds: [],
    market: "City Center",
    numberOfAds: 5,
    action: "Activate",
  },
  {
    screenId: 3,
    screenName: "Food Court LED",
    screenStatus: "Error",
    runningAds: ["Burger King", "Coca-Cola"],
    market: "Mall Central",
    numberOfAds: 8,
    action: "Fix",
  },
];

export default function ScreenTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Screen ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Screen Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Screen Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Running Ads
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Market
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Number of Ads
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((screen) => (
              <TableRow key={screen.screenId}>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-700 dark:text-white/90">
                  #{screen.screenId}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white">
                  {screen.screenName}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm">
                  <Badge
                    size="sm"
                    color={
                      screen.screenStatus === "Active"
                        ? "success"
                        : screen.screenStatus === "Inactive"
                        ? "warning"
                        : "error"
                    }
                  >
                    {screen.screenStatus}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {screen.runningAds.length > 0
                    ? screen.runningAds.join(", ")
                    : "No Ads"}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-700 dark:text-white/80">
                  {screen.market}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-700 dark:text-white/90">
                  {screen.numberOfAds}
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <Button size="sm" variant="outline">
                    {screen.action}
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
