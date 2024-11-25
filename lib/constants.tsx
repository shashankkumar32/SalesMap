import Category from "@/app/components/icons/category"
import Logs from "@/app/components/icons/clipboard"
import Templates from "@/app/components/icons/cloud_download"
import Home from "@/app/components/icons/home"
import Payment from "@/app/components/icons/payment"
import Settings from "@/app/components/icons/settings"
import Workflows from "@/app/components/icons/workflow"


export const clients = [...new Array(10)].map((client, index) => ({
  href: `/${index + 1}.png`,
}))

export const menuOptions = [
    { name: 'Home', Component: Home, href: '/home' },
    { name: 'Menu', Component: Category, href: '/menu' },
    { name: 'Content', Component: Logs, href: '/Content' },
    { name: 'Billing', Component: Payment, href: '/Billing' },

    // { name: 'Content', Component: Logs, href: '/connections' },
  ]