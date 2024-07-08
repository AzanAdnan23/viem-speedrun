import {
    Hex,
    createWalletClient,
    getContract,
    http,
    publicActions,
  } from "viem";
  import { privateKeyToAccount } from "viem/accounts";
  import { arbitrumSepolia } from "viem/chains";
  import contractJson from "../artifacts/Contract.json";

  const { abi, bin } = contractJson["contracts"]["contracts/Contract.sol:Contract"];
  import dotenv from "dotenv";

  dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  }).extend(publicActions);
  

  const hash = await client.deployContract({
    abi,
    bytecode: `0x${bin}`,
    args: [127n],
  });

  const { contractAddress } = await client.getTransactionReceipt({ hash });

  if (contractAddress) {
    const contract = getContract({
      address: contractAddress,
      abi,
      client,
    });

    console.log(await contract.read.x());
    await contract.write.changeX([132n]);
    console.log(await contract.read.x());

    console.log({ contractAddress });
  }
})();