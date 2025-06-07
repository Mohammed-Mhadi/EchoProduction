import React from 'react'

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import MarketTable from '../components/tables/BasicTables/ScreenTable';
import ScreenTable from '../components/tables/BasicTables/ScreenTable';


const ScreenManagment = () => {
  return (
    <div>

       <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="Screen Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="Screen Managment ">
          <ScreenTable />
        </ComponentCard>
      </div>
    </>
    </div>
  )
}

export default ScreenManagment
