import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlayersList = () => {
  const playerOfMumbai = [
    {
      name: "Rohit Sharma",
      position: " Batsman",
      credits: 10,
    },
    {
      name: "Quinton de Kock",
      position: " Batsman",
      credits: 9,
    },
    {
      name: "Suryakumar Yadav",
      position: "Batsman",
      credits: 9,
    },
    {
      name: "Ishan Kishan",
      position: " Batsman",
      credits: 9,
    },
    {
      name: "Hardik Pandya",
      position: "All-rounder",
      credits: 9,
    },
    {
      name: "Kieron Pollard",
      position: "All-rounder",
      credits: 9,
    },
    {
      name: "Krunal Pandya",
      position: "All-rounder",
      credits: 8.5,
    },
    {
      name: "Rahul Chahar",
      position: "Spinner",
      credits: 8,
    },
    {
      name: "Jasprit Bumrah",
      position: "Fast Bowler",
      credits: 9.5,
    },
    {
      name: "Trent Boult",
      position: "Fast Bowler",
      credits: 9,
    },
    {
      name: "Piyush Chawla",
      position: "Spinner",
      credits: 8.5,
    },
  ];

  const playerOfKolkata = [
    {
      name: "Eoin Morgan",
      position: " Batsman",
      credits: 9.5,
    },
    {
      name: "Dinesh Karthik",
      position: " Batsman",
      credits: 8.5,
    },
    {
      name: "Shubman Gill",
      position: "Batsman",
      credits: 9,
    },
    {
      name: "Nitish Rana",
      position: "Batsman,",
      credits: 8.5,
    },
    {
      name: "Andre Russell",
      position: "All-rounder",
      credits: 9.5,
    },
    {
      name: "Sunil Narine",
      position: "All-rounder",
      credits: 8.5,
    },
    {
      name: "Shakib Al Hasan",
      position: "All-rounder",
      credits: 9,
    },
    {
      name: "Pat Cummins",
      position: "Fast Bowler",
      credits: 9,
    },
    {
      name: "Prasidh Krishna",
      position: "Fast Bowler",
      credits: 8,
    },
    {
      name: "Varun Chakravarthy",
      position: "Spinner",
      credits: 8.5,
    },
    {
      name: "Harbhajan Singh",
      position: "Spinner",
      credits: 8,
    },
  ];

  var spent = 0;
  const [spending, setSpending] = useState(0);
  const handleSelect = () => {
    spent = spending + spent;
  };

  useEffect(() => {
    handleSelect();
    spent += spending;
    console.log(spending);
    console.log(spent);
  }, [spending]);

  return (
    <>
      <div className=" flex flex-row justify-between mx-[75px] h-[500px]">
        <div className="flex flex-col gap-4 flex-wrap ">
          {playerOfMumbai.map((player) => (
            <div className=" flex bg-[#0C0F0C] p-5 rounded-3xl gap-4 ">
              <div>
                <h1 className="text-[#feb561]">{player.name}</h1>
                <h4 className="text-[#c4c4c4]">{player.position}</h4>
              </div>
              <div>
                <p className="text-[#c4c4c4]">({player.credits})</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 flex-wrap-reverse mx-3 ">
          {playerOfKolkata.map((player) => (
            <div
              className=" flex bg-[#0C0F0C]  p-5 rounded-3xl "
              onClick={() => setSpending(player.credits)}
            >
              <div>
                <h1 className="text-[#feb561]">{player.name}</h1>
                <h4 className="text-[#c4c4c4]">{player.position}</h4>
              </div>
              <div>
                <p className="text-[#c4c4c4]">({player.credits})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center pb-5 ">
        <button className="border-white py-2 px-5 border bg-white font-semibold text-[#182152] rounded-3xl">
          Credits remaining: <span className="text-[#9E9E9E]">{spent}</span> /{" "}
          <span className="text-[#B48325]">100</span>
        </button>
      </div>

      <div className="flex justify-center items-center pb-5">
        <Link to="/createContest">
          <button className="border-white py-2 px-5 border text-[#B48325] rounded-3xl hover:bg-red-600 hover:text-white">
            Save Team
          </button>
        </Link>
      </div>
    </>
  );
};

export default PlayersList;
