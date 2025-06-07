import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
// import BasicTableOne from "../components/tables/BasicTables/BasicTableOne";
import UserTable from "../../components/tables/BasicTables/UserTable";

export default function Usermanagement() {
  return (
    <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="User Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="User Managment ">
          <UserTable />
        </ComponentCard>
      </div>
    </>
  );
}
