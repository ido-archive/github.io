function TodoList() {

    return (
      <>
        <ul className={'todoList'}>
          <li className={'todoItem'}>
            <label>
              <input type="checkbox"/>
              <span className={'checkIcon'}></span>
              <span className={'labelText'}>Sample List item</span>
            </label>
            <button type={'button'} className={'btnDel'}>삭제</button>
          </li>
          {/* {listItems.map((item, index) => (
            <li key={index} className={'todoItem'}>
              <label>
                <input type="checkbox"/>
                <span className={'checkIcon'}></span>
                <span className={'labelText'}>{item}</span>
              </label>
              <button type={'button'} className={'btnDel'}>삭제</button>
            </li>
          ))} */}
        </ul>
        
      </>
    )
  }

  export default TodoList;