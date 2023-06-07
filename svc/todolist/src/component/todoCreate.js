
function TodoCreate() {
    return(
      <form>
        <div className={'createArea'}>
          <input type='text' name="listInput" className={'inputItem'} placeholder={'Entering to-do list~!'}></input>
          <button className={'btnEnter'}><span className={'arrowIcon'}></span>Enter</button>
        </div>
      </form>
    )
  }

  export default TodoCreate;