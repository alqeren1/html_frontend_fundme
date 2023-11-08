import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const withdrawButton = document.getElementById("withdrawButton");
const balanceButton = document.getElementById("balanceButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;
balanceButton.onclick = getbalance;
console.log(ethers);
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    console.log("I see a metamask!");

    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerHTML = "Connected!";
  } else {
    connectButton.innerHTML = "No metamask!";
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log("Funding with:" + ethAmount);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Funded!");
    } catch (error) {
      console.log(error);
    }
  }
}

async function getbalance() {
  console.log("Funding with:" + ethAmount);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}
function listenForTransactionMine(transactionResponse, provider) {
  console.log("Mining " + transactionResponse.hash);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        "Completed with " + transactionReceipt.confirmations + " confirmations"
      );
      resolve();
    });
  });
}

async function withdraw() {
  console.log("Withdrawing the balance");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();

      await listenForTransactionMine(transactionResponse, provider);
      console.log("Withdrawed!");
    } catch (error) {
      console.log(error);
    }
  }
}
