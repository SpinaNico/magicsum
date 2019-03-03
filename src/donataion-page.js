import React, { Component } from 'react';
import "./assets/donation_page.scss";

export default class index extends Component {
  render() {
    return (
        <div className="thanks">

            <h3 className="title">
                Did this project help you? did you save time? how much is your time worth? let me know with a donation
            </h3>
            
            <div className="donate-box" dangerouslySetInnerHTML={{__html:`
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="LKJHNLC76XFNE" />
                    <input class="mybutton" type="submit" value="donate" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_IT/i/scr/pixel.gif" width="1" height="1" />
                </form>
                    `}}></div>
            
            <div className="donation-thanks">thanks! <span aria-label role="img">😉</span></div>
    </div>
    )
  }
}
