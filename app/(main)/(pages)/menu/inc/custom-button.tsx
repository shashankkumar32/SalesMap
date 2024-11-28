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
        title="Bill created"
        subheading="verify before final bill generataion"
      >
      
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
