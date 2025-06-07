// import React from 'react'

// const Adsmanagment = () => {
//   return (
//     <div>
//         <h1 className='text-4xl font-bold text-gray-900'>adsmanagment</h1>
//     </div>
//   )
// }

// export default Adsmanagment

import React from 'react'

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import AdsTable from '../components/tables/BasicTables/AdTable';



const AdsManagment = () => {
  return (
    <div>

       <>
      <PageMeta
        title="Echo Media Dashboard "
        description="Echo Media Dashboard"
      />
      <PageBreadcrumb pageTitle="Ads Manamagment" />
      <div className="space-y-6">
        <ComponentCard title="Ads Managment ">
          <AdsTable />
        </ComponentCard>
      </div>
    </>
    </div>
  )
}

export default AdsManagment
