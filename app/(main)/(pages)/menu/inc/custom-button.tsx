'use client'



import { Button } from '@/components/ui/button'
import { useModal } from '@/provider/model-provider'

// import { useBilling } from '@/providers/billing-provider'

import { Plus } from 'lucide-react'
import React from 'react'
import CustomModal from './custom-modal'
import { HoverBorderGradient } from './acbutton'
import BillForm from './billmenu'

type Props = {}

const PlaceOrderButton = () => {
  const { setOpen, setClose } = useModal()


  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        fkjdkf 
        <BillForm />
      </CustomModal>
    )
  }

  return (
    <HoverBorderGradient
    //   size={'icon'}
      {...('0'== '0'
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      Place Order
    </HoverBorderGradient>
  )
}

export default PlaceOrderButton
