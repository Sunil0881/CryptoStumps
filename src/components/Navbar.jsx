import React, { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
const Navbar = ({ handleConnect }) => {
  const [account, setAccount] = useState();
  return (
    <div className="text-white m-0 p-0">
      <div className="flex justify-between pt-6 pl-5 ml-[100px] mr-[75px] pr-[30px]">
        <div>
          <img
            src="https://user-images.githubusercontent.com/111877553/232271079-d06d3ac4-daa1-453a-a51b-3d6b1b73f043.png"
            className="bg-contain w-12 h-12 rounded-full"
            alt="icon"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex items-center ">
            <AiOutlineBell className="w-7 h-7 text-[#B48325]" />
          </div>
          <div>
            <button className=" border border-[#B48325] text-[#B48325] rounded-full py-1.5 px-4 flex items-center justify-center">
              LeaderBoard
            </button>
          </div>

          <div>
            <button className=" border border-[#B48325] text-[#B48325] rounded-full py-1.5 px-4 flex items-center justify-center">
              0x12rrygisdi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
