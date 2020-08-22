import React, { useEffect, useState } from "react";
import "./HomePageCoursesList.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { Media } from "react-breakpoints";

import Constants from "../../configurations/Constants";
import { CoursesSlider as Courses } from "../../styles/CoursesSliderStyle";
import { CourseListCard } from "../../styles/CourseCardStyle";
import { course_list_card } from "../../analytics/analytics";

const HomePageCoursesList = (props) => {
  const dataSource = props.Data;
  const Title = props.Title;
  const [courses, setCourses] = useState([]);
  let row_class = "";
  var index = 0;

  useEffect(() => {
    axios.get(Constants.BASE_URL + dataSource).then((results) => {
      setCourses(results.data.body);
    });
  }, []);

  return (
    <div>
      <Container fluid id="course-list-container" className="a">
        <Courses>
          <Row className="courses-heading">
            <Col>{Title}</Col>
          </Row>
          <Media>
            {({ breakpoints, currentBreakpoint }) =>
              breakpoints[currentBreakpoint] >= breakpoints.desktopLarge
                ? 
                (
                  (<Row className="row-cols-xl-6" xs={1} sm={2} md={3} lg={4} xl={5}>
                    {courses.map((course) => {
                      let image;
                      let author_image;
                      if (course.courseMedia[0].course_media === "") {
                        image = (
                          <Image
                            height="130"
                            className="course-card-image"
                            src="/assets/course-placeholder.jpg"
                            wrapped
                            ui={false}
                          />
                        );
                      } else {
                        image = (
                          <Image
                            height="130"
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
                              Constants.MEDIA_BASE_URL + course.ab_authors.profile_url
                            }
                          />
                        );
                      }
      
                      return (
                        <Col key={index++} className="course-card-grid">
                          <a
                            className="card-clickable"
                            onClick={course_list_card(
                              course.url
                                ? course.url
                                : "/course-details/" + course.course_id,
                              Title
                            )}
                            href={
                              course.url
                                ? course.url
                                : "/course-details/" + course.course_id
                            }
                          >
                            <CourseListCard>
                              <Card className="course-card">
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
                                      <span id="course-card-author">
                                        {course.ab_authors.name}
                                      </span>
                                      <span id="course-card-amount">
                                        {course.course_promotions[0] ? (
                                          <span className="course-promotion-1">
                                            <span id="course-promotion-1-1">
                                              {course.course_price_data.amount}
                                            </span>
                                            <span id="course-promotion-1-2">
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
      
                                  <p className="course-card-title">
                                    {course.course_title}
                                  </p>
                                  <Card.Description>
                                    <StarRatings
                                      rating={parseFloat(
                                        course.course_statistics.ratings
                                          .$numberDecimal
                                      )}
                                      starRatedColor="#48c52b"
                                      numberOfStars={5}
                                      starDimension="20px"
                                      starSpacing="2px"
                                    />
                                    {course.course_promotions[0] ? (
                                      <Button
                                        href={course.course_promotions[0].click_link}
                                        target="_blank"
                                        id="course-promotion-button"
                                      >
                                        {course.course_promotions[0].promotion_text}
                                      </Button>
                                    ) : (
                                      <Button id="course-promotion-button1"></Button>
                                    )}
                                  </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                  <span>
                                    <span id="course-card-extra-stats">
                                      <Icon name="users" />
                                      {
                                        course.course_statistics.students_enrolled
                                      }{" "}
                                    </span>
                                    {/* <span id="course-card-amount"> */}
                                    {/* <strong>{course.source.name}</strong> */}
                                    <Image
                                      className="course-card-source-logo"
                                      src={
                                        Constants.MEDIA_BASE_URL + course.source.logo
                                      }
                                    ></Image>
                                    {/* </span> */}
                                  </span>
                                </Card.Content>
                              </Card>
                            </CourseListCard>
                          </a>
                        </Col>
                      );
                    })}
                  </Row>)
                )
                :
                (
                  (<Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    {courses.map((course) => {
                      let image;
                      let author_image;
                      if (course.courseMedia[0].course_media === "") {
                        image = (
                          <Image
                            height="130"
                            className="course-card-image"
                            src="/assets/course-placeholder.jpg"
                            wrapped
                            ui={false}
                          />
                        );
                      } else {
                        image = (
                          <Image
                            height="130"
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
                              Constants.MEDIA_BASE_URL + course.ab_authors.profile_url
                            }
                          />
                        );
                      }
      
                      return (
                        <Col key={index++} className="course-card-grid">
                          <a
                            className="card-clickable"
                            onClick={course_list_card(
                              course.url
                                ? course.url
                                : "/course-details/" + course.course_id,
                              Title
                            )}
                            href={
                              course.url
                                ? course.url
                                : "/course-details/" + course.course_id
                            }
                          >
                            <CourseListCard>
                              <Card className="course-card">
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
                                      <span id="course-card-author">
                                        {course.ab_authors.name}
                                      </span>
                                      <span id="course-card-amount">
                                        {course.course_promotions[0] ? (
                                          <span className="course-promotion-1">
                                            <span id="course-promotion-1-1">
                                              {course.course_price_data.amount}
                                            </span>
                                            <span id="course-promotion-1-2">
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
      
                                  <p className="course-card-title">
                                    {course.course_title}
                                  </p>
                                  <Card.Description>
                                    <StarRatings
                                      rating={parseFloat(
                                        course.course_statistics.ratings
                                          .$numberDecimal
                                      )}
                                      starRatedColor="#48c52b"
                                      numberOfStars={5}
                                      starDimension="20px"
                                      starSpacing="2px"
                                    />
                                    {course.course_promotions[0] ? (
                                      <Button
                                        href={course.course_promotions[0].click_link}
                                        target="_blank"
                                        id="course-promotion-button"
                                      >
                                        {course.course_promotions[0].promotion_text}
                                      </Button>
                                    ) : (
                                      <Button id="course-promotion-button1"></Button>
                                    )}
                                  </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                  <span>
                                    <span id="course-card-extra-stats">
                                      <Icon name="users" />
                                      {
                                        course.course_statistics.students_enrolled
                                      }{" "}
                                    </span>
                                    {/* <span id="course-card-amount"> */}
                                    {/* <strong>{course.source.name}</strong> */}
                                    <Image
                                      className="course-card-source-logo"
                                      src={
                                        Constants.MEDIA_BASE_URL + course.source.logo
                                      }
                                    ></Image>
                                    {/* </span> */}
                                  </span>
                                </Card.Content>
                              </Card>
                            </CourseListCard>
                          </a>
                        </Col>
                      );
                    })}
                  </Row>)
                )
            }
            
          </Media>
        </Courses>
      </Container>
    </div>
  );
};

export default HomePageCoursesList;
