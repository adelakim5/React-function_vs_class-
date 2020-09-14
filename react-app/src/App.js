import React, {useState, useEffect} from 'react';
// hook에 대해 더 공부하기 
import './App.css';

function App() {
  let [funcShow, setFuncShow] = useState(true)
  let [classShow, setClassShow] = useState(true)
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="removeFunc" onClick={() => {
        setFuncShow(false)
      }
      }></input>
      <input type="button" value="removeClass" onClick={() => {
        setClassShow(false)
      }
      }></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2} ></ClassComp> : null}
      {/* props로 2를 전달 */}
    </div>
    );
}

let funcStyle = "color:blue"
let funcId = 0
function FuncComp(props){
  // parameter로 initNumber가 들어와
  // hook
  let numberState = useState(props.initNumber);
  console.log("numberState", numberState)
  let number = numberState[0]
  let setNum = numberState[1]
  // 0번째값은 props로 들어온 값, 1번째값은 그 상태를 바꾸는 함수
  let [date, setDate] = useState(new Date().toString());
  useEffect(function(){
    console.log("%cfunc => number effect" + ++funcId , funcStyle)
    document.title = "Yangwon's learning of React" + ++funcId
    return function() {
      console.log("useEffect return")
    }
    // 함수를 return해야함
  }, [number])
  // 감시목록 
  // number가 바뀌면 effect 호출
  // 하지만 date는 바뀌어도 호출 안됨, 감시 목록에 없으니까
  console.log("%cfunc => render" + ++funcId, funcStyle)
  return (
    <div className="container">
      <h2>Function Style Component</h2>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
      <input type="button" value="random" onClick={
          function(){
            setNum(Math.random())
          }
        }></input>
        <input type="button" value="date" onClick={
          function(){
            setDate(new Date().toString())
          }
        }></input>
    </div>
  )
}
let classStyle = "color:red"
class ClassComp extends React.Component{
  // 초기값 필요
  state = {
    number:this.props.initNumber,
    date: new Date()
  }
  componentWillMount(){
    console.log("%cclass => componentWillMount", classStyle)
  }
  componentDidMount(){
    console.log("%cclass => componentDidMount", classStyle)
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log("%cclass => shouldComponentUpdate", classStyle)
    return true
  }
  // life cycle 공부하기 
  render(){
    console.log("%cclass => render", classStyle)
    return(
      <div className="container">
        <h2>Class Style Component</h2>
        <p>Number: {this.state.number}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random(), date: new Date()})
          }.bind(this)
        }></input>
        <p>Date: {this.state.date.toString()}</p>
      </div>
    )
  }
}

export default App;
