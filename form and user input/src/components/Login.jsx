import { useRef , useState} from "react";
import Input from "./Input";
import { isEmail,hasMinLength,isNotEmpty } from "../util/validation";


export default function Login() {
  // const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(event){
    event.preventDefault();

    // const enteredEmail = email.current.value;
    // const enteredPassword = password.current.value;

    // const emailIsValid = enteredEmail.includes('@');

    // if(!emailIsValid){
    //   setEmailIsInvalid(true);
    //   return;
    // }

    // setEmailIsInvalid(false);
    
  }

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && isNotEmpty(enteredValues.email);

  const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password,8);

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
        <Input label={'Email'} id={'email'} type='email' name='email' 
        onBlur={()=>handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please input a valid email'}/>
          </div>

        {/* <div className="control no-margin">
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
        </div> */}

        <Input label={'Password'} id={'password'} type='password' name='password' 
        onBlur={()=>handleInputBlur('password')}
          onChange={(event) => handleInputChange('password', event.target.value)}
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please input a valid password'}/>

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" 
          onChange={(event)=> handleInputChange('password', event.target.value)}
          value={enteredValues.password}
          // ref={password}
          />
        </div>
      </div> */}

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
