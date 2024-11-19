import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

const items=[{_id:"12",quantity:0,name:"something"},{_id:"12",quantity:0,name:"something"},{_id:"12",quantity:0,name:"something"}]

const SideCartList=()=>{
    return(
        <div className="flex-col w-full">
        {items.map((d, i) => (
            <div key={i} className="flex  items-center justify-between mx-1 py-1 px-3 border rounded-md w-full">
            <div className="text-xl font-semibold">{d.name}</div>
            <div className="text-sm px-1 flex">
           <Button
                variant="outline"
                className="bg-pink-300 h-8 w-8 text-black"
                // onClick={() => handleIncrease(d)}
              >
                +
              </Button>
        <div className="px-2"> {d.name} </div>
          <Button
                variant="outline"
                className="bg-pink-300 h-8 w-8 text-black"
                // onClick={() => handleDecrease(d)}
              >
                -
              </Button>
        </div>
          </div>
        
        ))}
      </div>
    )
}
export default SideCartList;