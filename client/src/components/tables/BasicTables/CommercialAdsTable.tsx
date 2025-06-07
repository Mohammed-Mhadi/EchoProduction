"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button"; // Added import

interface CommercialAd {
  adId: number;
  adName: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  adStatus: "active" | "pending" | "paused";
  market: string;
  targetScreens: string[];
  numberOfScreens: number;
  action: string;
}

const adsData: CommercialAd[] = [
  {
    adId: 101,
    adName: "Summer Sale Campaign",
    mediaType: "video",
    mediaUrl: "https://example.com/videos/summer-sale.mp4",
    adStatus: "active",
    market: "New York Central",
    targetScreens: ["Screen 12A", "Screen 14B"],
    numberOfScreens: 5,
    action: "Push Ad",
  },
  {
    adId: 102,
    adName: "Back to School Promo",
    mediaType: "image",
    mediaUrl: "https://example.com/images/back-to-school.jpg",
    adStatus: "pending",
    market: "Downtown LA",
    targetScreens: [],
    numberOfScreens: 3,
    action: "Assign Screens",
  },
  {
    adId: 103,
    adName: "Winter Collection",
    mediaType: "video",
    mediaUrl: "https://example.com/videos/winter-collection.mp4",
    adStatus: "paused",
    market: "Chicago North",
    targetScreens: ["Screen 3B"],
    numberOfScreens: 2,
    action: "Resume Ad",
  },
];

export default function CommercialAdsTable() {
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
                Ad Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Media
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
                Ad Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Assigned Screens
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                # of Screens
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {adsData.map((ad) => (
              <TableRow key={ad.adId}>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {ad.adName}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ad.mediaType === "image" ? (
                    <img
                      src={ad.mediaUrl}
                      alt={ad.adName}
                      className="w-16 h-10 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={ad.mediaUrl}
                      controls
                      className="w-20 h-12 rounded"
                    />
                  )}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ad.market}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      ad.adStatus === "active"
                        ? "success"
                        : ad.adStatus === "pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {ad.adStatus}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ad.targetScreens.length > 0
                    ? ad.targetScreens.join(", ")
                    : "Not Assigned"}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ad.numberOfScreens}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
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
