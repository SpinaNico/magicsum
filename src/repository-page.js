import React, { Component } from 'react';
import "./assets/repository.scss";

export default class index extends Component {
  render() {
    return (
        <div className="repository">
            <h3 className="title">
                You are a developer, do you like this project?
                support me with a star!
            </h3>
            <div className="github-box">
                <div dangerouslySetInnerHTML={{__html:`
                <!-- Place this tag where you want the button to render. -->
                <a class="github-button" 
                href="https://github.com/SpinaNico/magicsum" 
                data-size="large" 
                aria-label="Star SpinaNico/magicsum on GitHub">Star</a>`}}></div>
            </div>
        </div>
    )
  }
}
