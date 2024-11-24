import React from 'react'
import BillsStack from './inc/table'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 relative">
    <h1 className="flex  justify-center items-center border-b height-700px overflow">
      <BillsStack/>
    </h1>
  </div>
  )
}

export default DashboardPage