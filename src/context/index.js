import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";

import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../contract";
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [contestName, setContestName] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [gameData, setGameData] = useState({
    players: [],
    pendingContests: [],
    activeContest: null,
  });
  const [updateGameData, setUpdateGameData] = useState(0);
  const [battleGround, setBattleGround] = useState("bg-astral");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const player1Ref = useRef();
  const player2Ref = useRef();

  //* Rest web3 onboarding modal process

  const updateCurrentWalletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    //to connect wallet
    updateCurrentWalletAddress();

    window.ethereum.on("accountsChanged", updateCurrentWalletAddress);
  }, []);

  //set the smart contract and the provider to the state

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      console.log("entered the problem");

      const web3Modal = new Web3Modal();

      const connection = await web3Modal.connect();

      const newProvider = new ethers.providers.Web3Provider(connection);

      const signer = newProvider.getSigner();

      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
    };
    setSmartContractAndProvider();
    // setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    if (step !== -1 && contract) {
      createEventListener({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,

        setUpdateGameData,
        player1Ref,
        player2Ref,
      });
    }
  }, [contract, step]);

  // * Set the game data to the state
  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedBattles = await contract.getAllBattles();
      console.log(fetchedBattles);
      //filtering the pending battles
      const pendingBattles = fetchedBattles.filter(
        (battle) => battle.battleStatus === 0
      );
      let activeBattle = null;

      setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
    };

    if (contract) fetchGameData();
  }, [contract, updateGameData]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* handle error messages
  // the parsing line - slice the string by leaving thr specified "execution reverted"
  useEffect(() => {
    if (errorMessage) {
      const parsedMessage = errorMessage?.reason
        ?.slice("execution reverted: ".length)
        .slice(0, -1);
      if (parsedMessage) {
        setShowAlert({
          status: true,
          type: "failure",
          message: parsedMessage,
        });
      }
    }
  }, [errorMessage]);
  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
        contestName,
        setContestName,
        gameData,
        battleGround,
        setBattleGround,
        errorMessage,
        setErrorMessage,
        player1Ref,
        player2Ref,
        updateCurrentWalletAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
