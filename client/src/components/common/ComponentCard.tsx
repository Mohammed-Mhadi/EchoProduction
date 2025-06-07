import { Link, useLocation } from "react-router";
import Button from "../ui/button/Button";


/* 
usermanagement


*/
interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  const location = useLocation();

  const pathConfig: Record<string, { label: string; to: string }> = {
    "/usermanagement": {
      label: "Create New User",
      to: "/usermanagement/userdetail",
    },
    "/Subscription": {
      label: "Add New Subscriper",
      to: "/Subscription/subscriberinfo",
    },
        "/MarketManagment": {
      label: "Add  New Market",
      to: "/MarketManagment/AddMarket",
    },
        "/ScreenManagment": {
      label: "Add  New Screen",
      to: "/ScreenManagment/screeninfo",
    },
        "/adsmanagment": {
      label: "Add New Ad New",
      to: "/adsmanagment/adinfo",
    },
    "/CommericalManagment": {
      label: "Add New Commerical Ads",
      to: "/CommericalManagment/commericalinfo",
    },
    "/CustomerSupport": {
      label: "Customer Support ",
      to: "/CustomerSupport/ticketinfo",
    },
    // Add more routes as needed
  };

  // Fallback if path not matched
  const config = pathConfig[location.pathname] || {
    label: "Create New",
    to: "/",
  };

  return (
    <>
      <div
        className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
      >
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>

          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
          <div className="space-y-6">{children}</div>
        </div>
      </div>

      <Link
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
        to={config.to}
      >
        <Button
          children={config.label}
          size="md"
          variant="primary"
          startIcon=""
          onClick={() => console.log("Button clicked")}
        />
      </Link>
    </>
  );
};

export default ComponentCard;
