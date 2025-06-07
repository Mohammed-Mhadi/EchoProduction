import React, { useEffect, useState } from "react";
import FetchUserData from "../../../api/userapi/getalluser.ts";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";
import Badge from "../../ui/badge/Badge";
import { Redirection } from "../../transaction/Redirection";

interface Location {
  city?: string;
  state?: string;
  address?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  postal_code?: string;
}

interface User {
  image: string;
  name: string;
  role: string;
}

interface Order {
  id: string;
  user: User;
  customer_location: Location | string | null;
  subscription_status: string;
  status: "Active" | "Pending" | "Inactive";
  store_no: number;
  phonenumber: string;
  action: string;
}

export default function UserTable() {
  const redirectTo = Redirection();
  const [tableData, setTableData] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await FetchUserData("http://localhost:3000/user");

        // Properly parse the customer_location field
        const parsedData = data.map((user: any) => {
          let locationObj: Location | null = null;

          if (
            typeof user.customer_location === "string" &&
            user.customer_location.trim() !== ""
          ) {
            try {
              locationObj = JSON.parse(user.customer_location);
            } catch (error) {
              console.warn("Failed to parse customer_location:", user.customer_location);
            }
          } else if (
            typeof user.customer_location === "object" &&
            user.customer_location !== null
          ) {
            locationObj = user.customer_location;
          }

          return {
            ...user,
            customer_location: locationObj,
          };
        });

        setTableData(parsedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    redirectTo(`/usermanagement/edit/${id}`);
  };

  // Show only the city in the location
  const formatLocation = (loc: Location | null) => {
    if (!loc || typeof loc.city !== "string" || loc.city.trim() === "") {
      return "empty";
    }
    return loc.city;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader>Customer</TableCell>
              <TableCell isHeader>Customer ID</TableCell>
              <TableCell isHeader>Location</TableCell>
              <TableCell isHeader>Phone Number</TableCell>
              <TableCell isHeader>Subscription Status</TableCell>
              <TableCell isHeader>Stores Number</TableCell>
              <TableCell isHeader>Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{formatLocation(order.customer_location as Location | null)}</TableCell>
                <TableCell>{order.phonenumber}</TableCell>
                <TableCell>
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.store_no}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(order.id)}
                  >
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
