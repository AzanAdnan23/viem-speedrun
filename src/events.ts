import { Hex, createWalletClient, getContract, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import contractJson from "../artifacts/Contract.json";

import dotenv from "dotenv";
const { abi, bin } = contractJson["contracts"]["contracts/Contract.sol:Contract"];

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);
const contractAddress = "0xd3161fdc1ad8aee97a5a20876beeb272f89f6c69";

(async () => {
  const client = await createWalletClient({
    account,
    transport: http(process.env.API_URL),
    chain: arbitrumSepolia,
  });

  const contract = await getContract({
    address: contractAddress,
    abi,
    client,
  });

  await contract.watchEvent.XWasChanged({
    onLogs: (logs) => console.log(logs),
  });

  let x = 55n;
  setInterval(async () => {
    await contract.write.changeX([x]);
    x++;
  }, 3000);
})();