import React from 'react'

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import MarketTable from '../components/tables/BasicTables/MarketTable';


const MarketManagment = () => {
  return (
    <div>

       <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="Market Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="Market Managment ">
          <MarketTable />
        </ComponentCard>
      </div>
    </>
    </div>
  )
}

export default MarketManagment
/*


import React from 'react'
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import SubscriptionTable from '../components/tables/BasicTables/SubscriptionTable';

const Subscriptionmanagment = () => {
  return (
    <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="User Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="User Managment ">
          <SubscriptionTable />
        </ComponentCard>
      </div>
    </>
  )
}

export default Subscriptionmanagment


*/