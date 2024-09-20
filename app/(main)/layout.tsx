import InfoBar from "../components/inforbar"
import Sidebar from "../components/sidebar"
import MenuOptions from "../components/sidebar"



type Props = {children:React.ReactNode}

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
    <Sidebar />
    <div className="w-full">
      <InfoBar />
      {props.children}
    </div>
  </div>
  )
}

export default Layout