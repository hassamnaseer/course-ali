import React from "react";
import {Button} from "semantic-ui-react";
import {Button as B, Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FullWidthSlider.css";
import {CoursesSlider} from "../../styles/CoursesSliderStyle";
import {MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBBtn as Btn} from "mdbreact";
import { main_slider_primary_button, main_slider_secondary_button } from "../../analytics/analytics"

const FullWidthSlider = (props) => {
    const FULL_WIDTH_SLIDER = props.slider;
    var c = 1;
    let btn1;
    let btn2;
    let txt1;
    let txt2;
    return (
        <CoursesSlider>
            <MDBCarousel
                className="slider"
                activeItem={c}
                length={FULL_WIDTH_SLIDER.length}
                showIndicators={FULL_WIDTH_SLIDER.length > 1}
                showControls={false}
                interval={5000}
                slide>

                <MDBCarouselInner>
                    {FULL_WIDTH_SLIDER.map((slider) => {
                        if (slider.primaryButtonText === undefined) {
                            btn1 = (<div></div>)
                        } else if (slider.primaryButtonText !== undefined) {
                            btn1 = (
                                <Btn outline variant="outline-light"
                                target="_blank"
                                   onClick={main_slider_primary_button(slider.primaryRedirectLink)}
                                   className="slider-button-primary" inverted="true">
                                    {slider.primaryButtonText}
                                </Btn>)
                        }
                        if (slider.secondaryButtonText === undefined) {
                            btn2 = (<div></div>)
                        } else if (slider.secondaryButtonText !== undefined) {
                            btn2 = (
                                <Btn target="_blank"
                                 onClick={main_slider_secondary_button(slider.secondaryRedirectLink)}
                                        className="slider-button-secondary">
                                    {slider.secondaryButtonText}
                                </Btn>)
                        }

                        return (
                            <MDBCarouselItem key={c} itemId={c++}>
                                <MDBView className="slider-image">

                                    <div className="slider-image"
                                         style={{backgroundImage: "url(" + slider.imageUrl + ")"}}>
                                        <div className="slider-overlay"
                                             style={{backgroundColor: slider.overlayColor ? slider.overlayColor : "#00000022"}}/>
                                    </div>
                                </MDBView>

                                <MDBCarouselCaption>
                                    <Container fluid className="slider-container">
                                        <Row>
                                            <Col lg={12} className="slider-text">
                                                {slider.subHeaderHtml !== undefined ?
                                                <div
                                                    className="slider-sub-heading"
                                                    dangerouslySetInnerHTML={{__html: slider.subHeaderHtml}}
                                                    style={{color: "#FFF"}}
                                                /> :
                                                <div
                                                    className="slider-sub-heading"
                                                    style={{color: "#FFF"}}
                                                />
                                                }
                                            </Col>
                                            <Col lg={12} className="slider-text">
                                              {slider.titleTextHtml !== undefined ?
                                                <div
                                                    className="slider-main-heading"
                                                    dangerouslySetInnerHTML={{__html: slider.titleTextHtml}}
                                                    style={{color: "#FFF"}}
                                                /> :
                                                <div
                                                    className="slider-main-heading"
                                                    style={{color: "#FFF"}}
                                                />
                                              }
                                            </Col>
                                            <Col lg={12} className="text-left">
                                                {btn1}
                                                {btn2}
                                            </Col>
                                        </Row>
                                    </Container>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>)
                    })}
                </MDBCarouselInner>
            </MDBCarousel>
        </CoursesSlider>
    );
};

export default FullWidthSlider;

