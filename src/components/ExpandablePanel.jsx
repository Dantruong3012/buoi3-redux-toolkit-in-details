import { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
function ExpandablePanel({header, children}){
    const [isExpend, setIsExpend] = useState(false);
    const handleExpend = () => {
        setIsExpend(!isExpend);
    }
return (
  <div className="mb-2 border rounded">
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-row items-center justify-between ">
        {header}
      </div>
      <div onClick={handleExpend} className="cursor-pointer">
        {isExpend ? <GoChevronDown /> : <GoChevronLeft />}
      </div>
    </div>
    {isExpend && <div className="p-2 border-t">{children}</div>}
  </div>
);
}
export default ExpandablePanel;