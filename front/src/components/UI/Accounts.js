import React, { useRef, useState } from "react";
import classes from "./Accounts.module.css";
import { CircleLoader } from "react-spinners";

export default function Accounts(props) {
  const valueInputRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const sentHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await props.sentFunc(valueInputRef.current.value);
    setLoading(false);
    props.accountChange(true);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={sentHandler}>
        <div>
          <h4 className={classes.Account}> Account:{props.accountId}</h4>
          <h4 className={classes.Account}>
            have ammunt of :{props.accountBalance}
          </h4>
          {isLoading && (
            <div className={classes.center}>
              <CircleLoader size={60} />
            </div>
          )}

          {!isLoading && (
            <div className={classes.ammunt}>
              <label htmlFor="amount">amount: </label>
              <input type="number" step="0.01" id="name" ref={valueInputRef} />
              <button className={classes.sent}>sent!</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
