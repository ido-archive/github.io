import React,{useState} from 'react';

const Input2 = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        tel: ""
    });

    const {name, email, tel} = inputs;

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        setInputs({
            //깊은 복사. 기존의 오브젝트가 아닌 새로운 오브젝트를 만듬
            ...inputs, //= name: "",email: "",tel: ""
            [id]: value // 현재 변경되고 있는 id 의 값을 가져와서 업데이트
        })
    }


    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" id="name" value={name} onChange={onChange}/>
            </div>
            <div>
                <label>이메일</label>
                <input type="email" id="email" value={email} onChange={onChange}/>
            </div>
            <div>
                <label>전화번호</label>
                <input type="tel" id="tel" value={tel} onChange={onChange}/>
            </div>
            <p>이름: {name}</p>
            <p>이메일: {email}</p>
            <p>전화번호: {tel}</p>
        </div>
    )
}

export default Input2;