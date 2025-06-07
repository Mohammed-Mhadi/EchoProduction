import React from 'react'
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SubscriptionTable from '../../components/tables/BasicTables/SubscriptionTable';

const Subscriptionmanagment = () => {
  return (
    <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="Subscription Managment" />
      <div className="space-y-6">
        <ComponentCard title="Subscription Managment">
          <SubscriptionTable />
        </ComponentCard>
      </div>
    </>
  )
}

export default Subscriptionmanagment

/* 

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/tables/BasicTables/BasicTableOne";

export default function usermanagement() {
  return (
    <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="User Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="User Managment ">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}


*/