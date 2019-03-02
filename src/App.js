import React, { Component } from 'react';
import './app.scss';
import "./assets/textarea.scss";
import "./assets/other.scss";
import "./assets/checkbox.scss";
import "./assets/input.scss";
import "./assets/box.scss";
import "./assets/button.scss";
import "./assets/result.scss";
import "./assets/foot.scss";
import "./assets/thanks.scss";

const Result = (props) =>{
  return <div className="container-result">
      <span>{props.title}</span>
      <div className="info">{props.value}</div>
    </div>
}

class App extends Component {
  constructor(props){
    super();
    this.props = props;
    this.my_place = `spaghetti 3.50$ \npizza 5,70$\nhamburger 6.8$
    `;
    this.state = {
      float_comma: [],
      float_dot:[],
      integer:[],

        int: true,
        comma: true,
        dot:true,

      sum_float_comma: 0,
      sum_float_dot : 0,
      sum_integer: 0,
      sum_total: 0,
    };
    this._editable = React.createRef();
    
  }


  search_on_text(){
    console.clear();
    console.log(this.state)
    let text = this._editable.current.value;
    let [sum_float_comma, sum_float_dot, sum_integer, sum_total] = [0, 0, 0, 0];
    
    if (text === ""){
      text = this.my_place;
    }

    let re_for_float = /\d+\.\d+/mgi;
    let re_for_float_2 = /\b\d+,\d+\b/mgi;
    let re_for_int = /\b\d+\b/mgi;
    
    let all_float_comma = text.match(re_for_float_2)===null?[]:text.match(re_for_float_2);
    let all_float_dot = text.match(re_for_float)===null?[]:text.match(re_for_float);

    let text_for_int = String(text.replace(re_for_float, "").replace(re_for_float_2, "")).match(re_for_int);



    for(let i of this.state.float_comma){
      sum_float_comma = sum_float_comma + parseFloat(i.replace(",","."))
    }
    for(let i of this.state.float_comma){
      sum_float_dot = sum_float_comma + parseFloat(i)
    }

    for(let i of this.state.integer){
      sum_integer = sum_integer + parseInt(i) 
    }

    sum_total = sum_float_comma + sum_float_dot + sum_integer

    this.setState({

      integer:this.state.int?text_for_int:[],
      float_comma: this.state.comma?all_float_comma:[],
      float_dot: this.state.dot?all_float_dot:[],

      sum_float_comma:sum_float_comma,
      sum_float_dot: sum_float_dot,
      sum_integer: sum_integer,
      sum_total:sum_total
    });
   console.log(this.state)
  }



  render() {
    return (
      <div className="app">
      <div className="presentation">
        Write some text or paste it, we'll give you the 
        sum of all the numbers.
      </div>
      <div className="box">
        <span className="title">What should I sum?</span><br/>
        <div className="container">
          <button className={this.state.comma?"button":"button disabled"} onClick={()=>{this.setState({ comma:!this.state.comma});}}>decimal comma</button>
          <button className={this.state.dot?"button":"button disabled"}  onClick={()=>{this.setState({ dot:!this.state.dot});}}>decimal dot</button>
          <button className={this.state.int?"button":"button disabled"}  onClick={()=>{this.setState({ int:!this.state.int});}}>Integer</button>
        </div>
      </div>
       <textarea 
          ref={this._editable}

          className="text-area"
          onKeyDown={(e)=>{setTimeout(()=>this.search_on_text(),20);}}  
          placeholder={this.my_place} 
        />

        <div className="box output">
          <div className="grid-output">
            <Result title="Sum of decimal with (,)" value={this.state.sum_float_comma}/>
            <Result title="Sum of decimal with (.)" value={this.state.sum_float_dot}/>
            <Result title="Sum of integer" value={this.state.sum_integer}/>
            <Result title="total sum" value={this.state.sum_total}/>
          </div>
        </div>
      

        <div className="thanks">

        </div>

        <div className="foot-fill"></div>
        <div className="bottom-foot"></div>

      </div>

      
    );
  }
}

export default App;
