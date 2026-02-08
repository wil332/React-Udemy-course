// import { useRef } from "react";
import { useState } from "react";

export default function Login() {
  // const email = useRef();
  // const password = useRef();

  function handleSubmit(event){
    event.preventDefault();

    // const enteredEmail = email.current.value;
    // const enteredPassword = password.current.value;

    // console.log(enteredEmail, enteredPassword);
    
  }

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

  function handleInputChange(identifier, value){
    setEnteredValues(prevValues=>({
      ...prevValues,
      [identifier]: value
    }))
    setDidEdit((prevValues)=>({
      ...prevValues,
      [identifier]: false
    }))
  }

  function handleInputBlur(identifier){
    setDidEdit((prevValues)=>({
      ...prevValues,
      [identifier]: true
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" 
          onBlur={()=>handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
          // ref={email}
          />
          {emailIsInvalid && <div className="control-error">
            <p>Please input a valid email!</p>
            </div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" 
          onChange={(event)=> handleInputChange('password', event.target.value)}
          value={enteredValues.password}
          // ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
