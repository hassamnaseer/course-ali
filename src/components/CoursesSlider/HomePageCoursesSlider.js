import React, { useEffect, useState } from "react";
import "./HomePageCoursesSlider.css";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Card, Image, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Constants from "../../configurations/Constants";
import { CoursesSlider } from "../../styles/CoursesSliderStyle";
import { CourseSliderCard } from "../../styles/CourseCardStyle";
import Slider from "react-slick";
import { course_list_card } from "../../analytics/analytics"

const HomePageCoursesSlider = (props) => {
  const dataSource = props.Data;
  const Title = props.Title;
  const [newCourses, setNewCourses] = useState([]);

  useEffect(() => {
    axios.get(Constants.BASE_URL + dataSource).then((results) => {
      setNewCourses(results.data.body);
      console.log(results.data.body);
    });
  }, []);

  const newCoursesSliderSettings = {
    infinite: false,
    speed: 500,
    nextArrow: (
      <div>
        <img alt="" height={30} src="/assets/next.svg" />
      </div>
    ),
    prevArrow: (
      <div>
        <img
          alt=""
          style={{ transform: "rotate(180deg)" }}
          height={30}
          src="/assets/next.svg"
        />
      </div>
    ),
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 777, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Container fluid className="abc new-courses-container">
        <CoursesSlider>
          <Row className="new-courses-heading">
            <Col>{Title}</Col>
          </Row>

          <Row className="new-courses-row">
            <Col className="new-courses-slider">
              <Slider {...newCoursesSliderSettings}>
                {newCourses.map((course) => {
                  let image;
                  let author_image;
                  if (course.courseMedia[0].course_media === "") {
                    image = (
                      <Image
                        className="course-card-image"
                        src="/assets/course-placeholder.jpg"
                        wrapped
                        ui={false}
                      />
                    );
                  } else {
                    image = (
                      <Image
                        className="course-card-image"
                        src={
                          Constants.MEDIA_BASE_URL +
                          course.courseMedia[0].course_media
                        }
                        wrapped
                        ui={false}
                      />
                    );
                  }
                  if (course.ab_authors.profile_url === "") {
                    author_image = (
                      <img
                        alt=""
                        className="course-author-pic"
                        src="/assets/author_placeholder.png"
                      />
                    );
                  } else if (course.ab_authors.profile_url !== "") {
                    author_image = (
                      <img
                        alt=""
                        className="course-author-pic"
                        src={
                          Constants.MEDIA_BASE_URL +
                          course.ab_authors.profile_url
                        }
                      />
                    );
                  }
                  return (
                    <div key={course._id}>
                      <a
                        className="card-clickable1"
                        onClick={course_list_card(course.url ? course.url : "/course-details/" + course.course_id, Title)}
                        href={
                          course.url
                            ? course.url
                            : "/course-details/" + course.course_id
                        }
                      >
                        <CourseSliderCard>
                          <Card className="new-course-card">
                            {image}
                            <Card.Content>
                              <Card.Meta>{author_image}</Card.Meta>
                              <Card.Meta
                                style={{
                                  paddingTop: 12,
                                  paddingBottom: 10,
                                  fontSize: 10,
                                }}
                              >
                                <div style={{ height: 20 }}>
                                  <span id="new-course-card-author">
                                    {course.ab_authors.name}
                                  </span>
                                  <span id="course-card-amount">
                                    {course.course_promotions[0] ? (
                                      <span className="course-promotion-1">
                                        <span id="course-promotion-1">
                                          {course.course_price_data.amount}
                                        </span>
                                        <span id="course-promotion-2">
                                          $
                                          {
                                            course.course_promotions[0]
                                              .discount_amount.$numberDecimal
                                          }
                                        </span>
                                      </span>
                                    ) : (
                                      <span>
                                        {course.course_price_data.amount}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </Card.Meta>

                              <p className="new-course-card-title">
                                {course.course_title}
                              </p>
                              {course.course_promotions[0] ? (
                                <Button id="course-promotion-btn">
                                  {course.course_promotions[0].promotion_text}
                                </Button>
                              ) : (
                                <Button id="course-promotion-btn1"></Button>
                              )}
                              <Card.Description className="new-course-card-source">
                                <Image
                                  className="new-course-card-source-logo"
                                  src={
                                    Constants.MEDIA_BASE_URL +
                                    course.source.logo
                                  }
                                ></Image>
                              </Card.Description>
                            </Card.Content>
                          </Card>
                        </CourseSliderCard>
                      </a>
                    </div>
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </CoursesSlider>
      </Container>
    </div>
  );
};

export default HomePageCoursesSlider;
