import React, { useState } from "react";
import { LiaPlayCircle } from "react-icons/lia";
import { GoBell } from "react-icons/go";
import { PiCaretUpDownFill } from "react-icons/pi";
import Card from "./Card";

export default function Student() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return(
        <div className="bg-[#E5E5E5]">
            <div className="flex p-3 bg-[#FFFFFF]">
                <div className="p-3">
                  <LiaPlayCircle />
                </div>
                <input type="search" placeholder='Search...' className="p-2 border-[#E5E5E5] rounded-xl ml-[1155px] 
                "/>
                <div className="p-3 ml-3">
                  <GoBell/>
                </div>
                
            </div>
            <div className="flex p-2 bg-[#E5E5E5]">
                <div className="text-xl font-bold text-black">Students List</div>
                <div className="flex p-2">
                    <div className="p-3 ml-[1055px]">
                       <PiCaretUpDownFill />
                    </div>
                    <button onClick={openModal} className="bg-[#FEAF00] text-white w-[199px] h-[44px]">ADD NEW STUDENT</button>
                </div>
                
            </div>
            <Card isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
