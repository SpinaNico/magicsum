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

      active_int: true,
      active_float_comma: true,
      active_float_dot: true,

      sum_total:0,
      sum_float_comma:0,
      sum_float_dot:0,
      sum_int:0
    };
    this._editable = React.createRef();
    
    this.re_for_float_with_dot = /\b\d+\.\d+\b/mgi;
    this.re_for_float_with_comma = /\b\d+,\d+\b/mgi;
    this.re_for_int = /\b\d+\b/mgi;
  }



  calc_deciamal_with_comma(text){

    let _array = text.match(this.re_for_float_with_comma);
    if(_array === null || !this.state.active_float_comma){
      _array = [];
    }
    let sum = 0;
    for(let i of _array){
      sum = sum + parseFloat(i.replace(",","."))
    }

    return {
      array: _array,
      sum: sum
    }
  }

  calc_integer(text){
    text = String(text.replace(this.re_for_float_with_comma, "").replace(this.re_for_float_with_dot, ""))

    let _array = text.match(this.re_for_int);
    if(_array === null || ! this.state.active_int){
      _array = [];
    }
    let sum = 0;
    for(let i of _array){
      sum = sum + parseInt(i)
    }

    return {
      array: _array,
      sum: sum
    }
  }

  calc_decimal_with_dot(text){
    let _array = text.match(this.re_for_float_with_dot);
    if(_array === null || !this.state.active_float_dot ){
      _array = [];
    }
    let sum = 0;
    for(let i of _array){
      sum = sum + parseFloat(i)
    }

    return {
      array: _array,
      sum: sum
    }
  }

  search_on_text(){
    console.clear();
    console.log(this.state)
    let text = this._editable.current.value;

    let result_float_comma = this.calc_deciamal_with_comma(text)
    let result_flaot_dot = this.calc_decimal_with_dot(text)
    let result_int = this.calc_integer(text)

    this.setState({

      sum_float_comma: result_float_comma.sum,
      sum_float_dot: result_flaot_dot.sum,
      sum_int: result_int.sum,

      sum_total: result_flaot_dot.sum + result_float_comma.sum + result_int.sum

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
          <button className={this.state.active_float_comma?"button":"button disabled"} 
          onClick={()=>{
            this.setState({ 
              active_float_comma:!this.state.active_float_comma
            });
            setTimeout(()=>this.search_on_text(), 20);
            }
          }>decimal comma</button>
          <button className={this.state.active_float_dot?"button":"button disabled"}  onClick={()=>{
            this.setState({ active_float_dot:!this.state.active_float_dot});
            setTimeout(()=>this.search_on_text(), 20);
            }}>decimal dot</button>
          <button className={this.state.active_int?"button":"button disabled"}  onClick={()=>{
            this.setState({ active_int:!this.state.active_int});
            setTimeout(()=>this.search_on_text(), 20);
            }}>Integer</button>
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
            <Result title="Sum of integer" value={this.state.sum_int}/>
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
