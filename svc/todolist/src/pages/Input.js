import React,{useState} from 'react';

const Input = () => {
    const [txtVal, setTextVal] = useState("");
    
    const onChange1 = (e) => {
        setTextVal(e.target.value);
    };


    return (
        <div>
            <input type="text" value={txtVal} onChange={onChange1} />
            <br />
            <p>{txtVal}</p>
        </div>
    )
}

export default Input;