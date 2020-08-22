import React from "react";
import "./HomePageDeals.css";
import {Col, Container, Row} from "react-bootstrap";
import {Image} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {Deals} from "./DealSliderStyle";
import Slider from "react-slick";
import { deals_slider } from "../../analytics/analytics"

const HomePageDeals = (props) => {
    const images = props.Deals;
    const Title = props.Title;

    var index = 0;
    const dealsSliderSettings = {
        infinite: false,
        nextArrow: <div><img alt="" height={30} src="/assets/next-white.svg"/></div>,
        prevArrow: <div><img alt="" style={{transform: "rotate(180deg)"}} height={30} src="/assets/next-white.svg"/>
        </div>,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1000, // tablet breakpoint
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2
            }
          },
          {
            breakpoint: 767, // tablet breakpoint
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
          },  
          {
                breakpoint: 670, // tablet breakpoint
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 530, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <div className="deals">
                <Container style={{width: "95%"}} fluid>
                    {/* <div className="deals-slider"> */}
                    <Row className="deals-heading">
                        <Col>{Title}</Col>
                    </Row>
                    <Deals>
                        <Row className="deals-slider-main">
                            <Col className="deals-slider">

                                <Slider fluid {...dealsSliderSettings}>
                                    {images.map((image) => {
                                        return (
                                            <Col key={index++}>
                                                <a onClick={deals_slider(image.destinationUrl, Title)} href={image.destinationUrl} target="_blank" key="0">
                                                    <Image
                                                        src={image.imageUrl}
                                                        className="deals-slider-image"
                                                    />
                                                </a>
                                            </Col>
                                        );
                                    })}
                                </Slider>

                            </Col>
                        </Row>
                    </Deals>
                    {/* </div> */}
                </Container>
            </div>
        </div>
    );
};

export default HomePageDeals;
