import * as nearAPI from "near-api-js";
import Big from "big.js";
import getConfig from "./config";

let contract: any;
let wallet: any;
let nearConfig: any;

// hatch as in egg
export async function hatch() {
  nearConfig = getConfig("testnet"); // TODO

  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  const near = await nearAPI.connect({ keyStore, ...nearConfig, headers: {} });

  wallet = new nearAPI.WalletConnection(near, nearConfig.contractName);

  let currentUser;
  if (wallet.getAccountId()) {
    currentUser = {
      accountId: wallet.getAccountId(),
      balance: (await wallet.account().state()).amount
    };
  }

  contract = new nearAPI.Contract(wallet.account(), nearConfig.contractName, {
    viewMethods: [],
    changeMethods: ["say_hello"]
  });

  return { contract, currentUser, nearConfig, walletConnection: wallet };
}

// -----------------------------------------------------------------------------------
// change functions
// -----------------------------------------------------------------------------------
export const sayHello = async (name: string) => {
  return contract.say_hello(
    {
      name
    },
    Big(3)
      .times(10 ** 13)
      .toFixed()
  );
};

export const signIn = () => {
  wallet.requestSignIn(
    {
      contractId: nearConfig.contractName,
      methodNames: [contract.say_hello.name]
    }, //contract requesting access
    "Cryptic Comments" //optional name
  );
};

export const signOut = () => {
  wallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
};
