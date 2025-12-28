import {useState} from 'react';

export default function Player({name,symbol, isActive, onChangeName}){
    const [inputtedName, setInputName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleClick(editStatus){
        setIsEditing(editStatus => !editStatus)

        if(isEditing){
            onChangeName(symbol, inputtedName);
        }
    }
    function handleChange(e){
        setInputName(e.target.value)
    }
    let playerName  = (
        <><span className="player-name">{inputtedName}</span>
              
              </>
    )
    if(isEditing){
        playerName = (<>
            <input type="text" required defaultValue = {inputtedName} onChange={handleChange}/>
        </>)
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleClick(isEditing)}>{isEditing == true ? 'Save' : 'Edit'}</button>
          </li>
    )
}