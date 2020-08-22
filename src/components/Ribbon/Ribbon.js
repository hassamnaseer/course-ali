import React, {useState} from "react";
import "./Ribbon.css";
import {MDBIcon} from "mdbreact";
import { promo_ribbon_btn, promo_ribbon_close } from "../../analytics/analytics"

const Ribbon = (props) => {
    const PROMO_RIBBON = props.PROMO_RIBBON;
    const [show, hide] = useState(true);
    if (PROMO_RIBBON && PROMO_RIBBON.mainText) {
        return (
            <React.Fragment>
                {show && (
                    <div className="ribbon-main" style={{
                        backgroundColor: PROMO_RIBBON.ribbonBgColor,
                        color: PROMO_RIBBON.textColor,
                    }}>
                        <header className="ribbon">
                            {PROMO_RIBBON.mainText}&nbsp;&nbsp;&nbsp;
                            <strong>
                                <a className="ribbon-anchor" onClick={promo_ribbon_btn(PROMO_RIBBON.redirectLink)}
                                   href={PROMO_RIBBON.redirectLink} target="_blank">
                                    {PROMO_RIBBON.boldText}
                                </a>
                            </strong>
                        </header>

                        <div className="ribbon-icon">
                            <a className="ribbon-icon" onClick={() => {hide(false); promo_ribbon_close();}}>
                                <MDBIcon icon="times"/>
                            </a>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    } else {
        return (<div/>)
    }

};

export default Ribbon;
