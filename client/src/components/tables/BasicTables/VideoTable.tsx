"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button"; // import Button

interface ManagedVideo {
  videoId: number;
  title: string;
  videoUrl: string;
  status: "ready" | "processing" | "paused";
  market: string;
  assignedScreens: string[];
  screenCount: number;
  action: string;
}

const videoData: ManagedVideo[] = [
  {
    videoId: 201,
    title: "Storefront Promo Reel",
    videoUrl: "https://example.com/videos/storefront.mp4",
    status: "ready",
    market: "NYC Main Square",
    assignedScreens: ["Screen A1", "Screen B4"],
    screenCount: 4,
    action: "Broadcast",
  },
  {
    videoId: 202,
    title: "Holiday Greeting",
    videoUrl: "https://example.com/videos/holiday.mp4",
    status: "processing",
    market: "LA West Side",
    assignedScreens: [],
    screenCount: 2,
    action: "Assign Screens",
  },
  {
    videoId: 203,
    title: "Promo Winter 2025",
    videoUrl: "https://example.com/videos/promo-winter.mp4",
    status: "paused",
    market: "Chicago North",
    assignedScreens: ["Screen C2"],
    screenCount: 1,
    action: "Resume Broadcast",
  },
];

export default function VideoManagementTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Video Title
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Preview
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Market
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Assigned Screens
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Screen Count
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {videoData.map((video) => (
              <TableRow key={video.videoId}>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {video.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <video
                    src={video.videoUrl}
                    controls
                    className="w-24 h-14 rounded"
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {video.market}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      video.status === "ready"
                        ? "success"
                        : video.status === "processing"
                        ? "warning"
                        : "error"
                    }
                  >
                    {video.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {video.assignedScreens.length > 0
                    ? video.assignedScreens.join(", ")
                    : "Not Assigned"}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {video.screenCount}
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Button size="sm" variant="outline">
                    {video.action}
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
