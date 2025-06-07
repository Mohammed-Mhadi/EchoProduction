import { useEffect, useState } from "react";
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

interface SubscriptionAPIResponse {
  user_id: number;
  user_name: string;
  user_role: string;
  user_occupation: string | null;
  user_firebase_uid: string | null;
  subscription_plan_type: string;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  subscription_status: "active" | "pending" | "cancelled";
  subscription_paid_amount: string | null;
}

export default function SubscriptionTable() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionAPIResponse[]>(
    []
  );

  const redirectTo = Redirection();

  const handleRedirect = (id: number) => {
    redirectTo(`/subscription/edit/${id}`);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("http://localhost:3000/subscription");
        if (!response.ok) throw new Error("Failed to fetch subscriptions");
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Customer
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                User Role
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Occupation
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Start Date
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                End Date
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Subscription Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Paid Amount
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {subscriptions.map((sub) => (
              <TableRow key={sub.user_id}>
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 text-xs uppercase">
                      {sub.user_name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {sub.user_name}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {sub.user_role}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {sub.user_occupation ?? "-"}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {sub.subscription_start_date
                    ? new Date(sub.subscription_start_date).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {sub.subscription_end_date
                    ? new Date(sub.subscription_end_date).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm">
                  <Badge
                    size="sm"
                    color={
                      sub.subscription_status === "active"
                        ? "success"
                        : sub.subscription_status === "pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {sub.subscription_status}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {sub.subscription_paid_amount
                    ? `$${sub.subscription_paid_amount}`
                    : "-"}
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRedirect(sub.user_id)}
                  >
                    Manage
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
