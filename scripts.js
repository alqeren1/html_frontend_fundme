import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
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
  const ethAmount = "1.1";
  console.log("Funding with:" + ethAmount);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
  }
}
async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    console.log("I see a metamask!");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected!";
  } else {
    document.getElementById("connectButton").innerHTML = "No metamask!";
  }
}
