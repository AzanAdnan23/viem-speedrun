import {
    Hex,
    createWalletClient,
    getContract,
    http,
    publicActions,
  } from "viem";
  import { privateKeyToAccount } from "viem/accounts";
  import { arbitrumSepolia } from "viem/chains";
  //import funJson from "../artifacts/Fun.json";
  
  import dotenv from "dotenv";