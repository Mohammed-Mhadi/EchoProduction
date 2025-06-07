import React from 'react'
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";

import CommercialAdsTable from '../components/tables/BasicTables/CommercialAdsTable';

const CommericalManagment = () => {
  return (
    <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="Commerical Managment" />
      <div className="space-y-6">
        <ComponentCard title="Commerical  Managment">
          <CommercialAdsTable />
        </ComponentCard>
      </div>
    </>
  )
}


// import React from 'react'

// const CommericalManagment = () => {
//   return (
//     <div>
//       <h1 className='text-4xl font-bold text-gray-900'> Commerical Managment </h1>
//     </div>
//   )
// }

export default CommericalManagment

// CommercialAdsTable