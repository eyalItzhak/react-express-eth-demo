import React, { useState, useEffect } from "react";
import Accounts from "./UI/Accounts";
import Contact from "./UI/Contact";
import classes from "./Body.module.css";

import sentMoneyFun_Eth from "./API/eth/sentMoney";
import sentMoneyFun_backEnd from "./API/backend/sentMoney";

import getUserFunc_backEnd from "./API/backend/getUserInfo";
import getUserInfo from "./API/eth/getUserInfo";

import getContractInfo from "./API/eth/getContractInfo";

export default function Body() {
  const [owenerId, setOwnerId] = useState("");
  const [owner_ammunt, setOwner_ammunt] = useState(0);
  const [account_change, setAccount_Change] = useState(false);

  const [peerId, setPeerId] = useState("");
  const [peer_ammunt, setPeer_ammunt] = useState(0);

  const [contract_ammunt, setContract_ammunt] = useState(0);

  useEffect(() => {
    //feach data from eth network for users...
    const fetchData = async () => {
      const { account_owner, balance_owner } = await getUserInfo();
      const { account_peer, balance_peer } = await getUserFunc_backEnd();
      const contract_ammunt = await getContractInfo();

      setOwnerId(account_owner);
      setOwner_ammunt(balance_owner);
      setContract_ammunt(contract_ammunt);
      setPeerId(account_peer);
      setPeer_ammunt(balance_peer);
      setAccount_Change(false);
    };
    fetchData();
  }, [account_change]); //[] is on mount ...

  return (
    <div className={classes.body}>
      <Accounts
        accountId={owenerId}
        accountBalance={owner_ammunt}
        backend={"false"}
        sentFunc={sentMoneyFun_Eth}
        accountChange={setAccount_Change}
      />
      <div className={classes.right}>
        <Contact
          accountBalance={contract_ammunt}
          account_1={owenerId}
          account_2={peerId}
          accountChange={setAccount_Change}
        />
      </div>
      <Accounts
        accountId={peerId}
        accountBalance={peer_ammunt}
        sentFunc={sentMoneyFun_backEnd}
        accountChange={setAccount_Change}
      />
    </div>
  );
}
