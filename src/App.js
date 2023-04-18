import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context";
function App() {
  const { contract } = useGlobalContext();
  const navigate = useNavigate();
  const [gotAccount, setGotAccount] = useState();
  const [slicedAccount, setslicedAccount] = useState();
  const [name, setName] = useState();
  // Creating a function to connect user's wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      console.log("clicked");
      console.log(ethereum);
      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setGotAccount(accounts);
      const acSl = accounts.slice(0, 10);
      setslicedAccount(acSl);
      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      console.log("entered");
      console.log({ contract });
      const playerExist = await contract.isPlayer(gotAccount, {
        gasLimit: 200000,
      });

      if (!playerExist) {
        await contract.registerPlayer(name, name);

        alert("player is registered");
      }
    } catch (error) {
      console.log(error, error.message);
    }
    if (!gotAccount) {
      alert("connect wallet to continue");
    }
    if (gotAccount) {
      navigate("/contest");
    }
  };
  return (
    <>
      <div className="">
        <div className="fixed top-0">
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
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-7 bg-[#06002e]">
          <button
            className="items-center m-5  bg-white rounded-full font-medium  p-4 shadow-lg"
            onClick={() => {
              // Calling the connectWallet function when user clicks on the button
              connectWallet();
            }}
          >
            {gotAccount && <span>{slicedAccount.slice(0, 5)}</span>}
            {!gotAccount && <span>Connect Wallet</span>}
          </button>
          ;
        </div>
      </div>
      <div className=" App flex justify-center items-center font-Decalotype">
        <div>
          <div className="">
            <h1 className="font-bold text-[50px] p-3 text-white">
              It is Dream11, but{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-indigo-600 bg-clip-text text-transparent">
                Decentralized
              </span>{" "}
            </h1>{" "}
          </div>
          <div className="text-white flex justify-center p-3">
            <h2 className="font-semibold text-[30px] ">
              Get started by creating your dream team
            </h2>{" "}
          </div>
          <div className="text-white flex justify-center">
            <h2 className="p-3 font-bold ">
              You can get a chance to win 1 BTC 🚀
            </h2>
          </div>

          <div className="flex flex-col justify-center items-center mt-6">
            <label className="text-white text-[25px] px-4 text-center py-5">
              Enter your name:{" "}
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered text-center input-primary w-full h-[34px] max-w-xs rounded-sm placeholder:px-3"
            />

            <center className="pt-4">
              <Link>
                {" "}
                <button
                  className="items-center m-5  bg-white rounded-full font-medium  py-2 px-4 hover:bg-red-600 hover:text-white shadow-lg"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Link>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
