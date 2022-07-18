import React, { useRef, useState } from "react";
import classes from "./Contract.module.css";
import { CircleLoader } from "react-spinners";

import getMoneyFromContract from "../API/eth/getMoneyFromContract";

export default function Contact(props) {
  const valueInputRef = useRef();
  const userInputRef = useRef();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const to = parseInt(userInputRef.current.value);
    const value = valueInputRef.current.value;
    await getMoneyFromContract(to, value);
    setLoading(false);
    props.accountChange(true);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <h4 className={classes.Account}> contact:xxxxxxxxxxxx</h4>
          <h4 className={classes.Account}>
            contact have:{props.accountBalance} whi/eth
          </h4>

          {isLoading && (
            <div className={classes.center}>
              {" "}
              <CircleLoader size={60} />
            </div>
          )}
          {!isLoading && (
            <div>
              <div className={classes.ammunt}>
                <label htmlFor="amount">amount: </label>
                <input
                  type="number"
                  step="0.01"
                  id="name"
                  ref={valueInputRef}
                />
              </div>
              <div className={classes.ammunt}>
                <label htmlFor="user">user: </label>
                <input type="number" step="1" id="name" ref={userInputRef} />
              </div>
              <button className={classes.sent}>sent!</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
