import React,{useState} from 'react';

const Counter = () => {
    const [num,setNumber] = useState(0);
    const increase = () => {
        setNumber(num + 1);
        //  num = num + 1 과 같으나 이렇게 표현하면 상태관리가 불가능하여
        // 세타함수 (setNumber)를 사용해야함
    }
    const decrease = () => {
        setNumber(num - 1);
    }

    return (
        <div>
            <button type="button" onClick={increase}>+ 1</button>
            <button type="button" onClick={decrease}>- 1</button>
            <p>{num}</p>
        </div>
    )
}

export default Counter;