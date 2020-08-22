import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseChapterDetails from "./CourseChapters/CourseChapterDetails";
import "./CourseDetails.css";
import { Container, Row, Col } from "react-bootstrap";
import Constants from "../../configurations/Constants";
import { Card, Button, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import {
  CourseDetailsStyle,
  CourseDetailsPromoStyle,
  CourseInstructorStyle,
  CourseHighlightsStyle,
  CourseSourceStyle,
  PromoBottomStyle,
} from "../../styles/CourseDetailsStyle";
import StarRatings from "react-star-ratings";
import { MDBIcon } from "mdbreact";
import Header from "../Header/Header";
import { course_deals_slider, course_deals_slider_bottom, course_source_btn } from "../../analytics/analytics"

const CourseDetail = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseImage, setCourseImage] = useState("");
  const [duration, setDuration] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [courseAmount, setCourseAmount] = useState("");
  const [courseDiscountedAmount, setCourseDiscountedAmount] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [promotionLink, setPromotionLink] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [courseHighlights, setCourseHighlights] = useState([]);
  const [source, setSource] = useState([]);
  const [ifBottom, setBottom] = useState(0);
  const [promotion, setPromotion] = useState([]);
  let { courseId } = useParams();

  useEffect(() => {
    let url = Constants.COURSE_DETAILS_BASE_URL;
    let class_count = 0;

    axios.get(url + courseId).then((results) => {
      setCourseDetails(results.data.body[0]);

      setSource(results.data.body[0].source);
      setCourseImage(results.data.body[0].courseMedia[0].course_media);
      setDuration(
        Number(results.data.body[0].duration.days) * 24 +
          Number(results.data.body[0].duration.hours)
      );
      {
        results.data.body[0].course_content.map((m) => {
          class_count = class_count + m.chapters.length;
          setClassCount(class_count);
        });
      }
      setCategory(results.data.body[0].ab_categories[0].name);
      setRating(results.data.body[0].course_statistics.ratings.$numberDecimal);
      setRatingCount(
        results.data.body[0].course_statistics.external_review_counts
          .$numberDecimal
      );
      setCourseAmount(results.data.body[0].course_price_data.amount);
      setCourseDiscountedAmount(
        results.data.body[0].course_promotions[0].discount_amount.$numberDecimal
      );
      setPromotionText(
        results.data.body[0].course_promotions[0].promotion_text
      );

      setPromotion(results.data.body[0].course_promotions[0]);

      if (results.data.body[0].course_promotions[0].click_link !== null) {
        setPromotionLink(results.data.body[0].course_promotions[0].click_link);
      } else {
        setPromotionLink("#");
      }

      setAuthorData(results.data.body[0].ab_authors);
      setCourseHighlights(results.data.body[0].highlights);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight - 60) {
        setBottom(60);
      } else {
        setBottom(0);
      }
    });
  });

  return (
    <React.Fragment>
      <Header />
      <div className="course-details-top">
        <Container fluid className="course-details-container">
          <Col>
            <Row>
              <p>{category}</p>
            </Row>
          </Col>
        </Container>
      </div>

      {courseDetails.length !== 0 && (
        <Container fluid className="course-details-container">
          <Row lg={2}>
            <Col lg={8}>
              <Row className="course-top-row">
                {courseDetails.course_title && (
                  <p className="course-title">{courseDetails.course_title}</p>
                )}
              </Row>

              <CourseDetailsStyle>
                <Col lg={12}>
                  <Row xs={1} sm={3} md={3} lg={3} className="">
                    <Card className="my-auto course-info-row">
                      <Card.Content className="course-info-row-content">
                        <span className="course-info-row-content-1">
                          <img src="/assets/duration.svg" />
                        </span>
                        <span className="course-info-row-content-2">
                          <p id="course-info-row-content-2-1">Duration</p>
                          <span>
                            {classCount} Classes - {duration} Hours
                          </span>
                        </span>
                      </Card.Content>
                    </Card>

                    <Card className="my-auto course-info-row">
                      <Card.Content className="course-info-row-content">
                        <span className="course-info-row-content-1">
                          <img src="/assets/category.svg" />
                        </span>
                        <span className="course-info-row-content-2">
                          <p id="course-info-row-content-2-1">Categories</p>
                          <span>{category}</span>
                        </span>
                      </Card.Content>
                    </Card>

                    <Card className="my-auto course-info-row">
                      <Card.Content className="course-info-row-content">
                        <span className="course-info-row-content-1">
                          <img src="/assets/rating.svg" />
                        </span>
                        <span className="course-info-row-content-2">
                          <span>&nbsp;{rating}</span>
                          <span id="course-info-row-content-2-1">
                            &nbsp;({parseFloat(ratingCount)})
                          </span>
                          <span>
                            <StarRatings
                              rating={parseFloat(rating)}
                              starRatedColor="#FFC208"
                              numberOfStars={5}
                              starDimension="20px"
                              starSpacing="2px"
                            />
                          </span>
                        </span>
                      </Card.Content>
                    </Card>
                  </Row>
                </Col>
              </CourseDetailsStyle>

              {promotion.length !== 0 && (
                <CourseDetailsPromoStyle>
                  <Col lg={12} className="course-promotion-row">
                    <Row>
                      <Card>
                        <Card.Content>
                          <span className="course-promotion-content-1">
                            <span id="course-promotion-content-1-1">
                              {courseAmount}
                            </span>
                            <span id="course-promotion-content-1-2">
                              &nbsp; ${courseDiscountedAmount}
                            </span>
                          </span>
                          <p id="course-promotion-content-2-1">
                            {promotionText}
                          </p>
                          <div className="course-promotion-content-2">
                            <Button
                              onClick={() => {window.open(promotionLink); course_deals_slider(promotionLink, courseDetails.course_title)}}
                              id="course-promotion-content-2-2"
                            >
                              Take this course
                            </Button>
                          </div>
                        </Card.Content>
                      </Card>
                    </Row>
                  </Col>
                </CourseDetailsPromoStyle>
              )}

              <Col lg={12}>
                <Row className="course-image-row">
                  {courseImage ? (
                    <img className="course-image"
                      src={Constants.MEDIA_BASE_URL + courseImage}
                    />
                  ) : (
                    <img className="course-image"
                      src="/assets/course-placeholder.jpg"
                    />
                  )}
                </Row>
              </Col>

              <Col>
                <Row className="course-details-description">
                  <div id="course_description" dangerouslySetInnerHTML={{__html: courseDetails.course_description}} />
                  <div id="course_marketing_description" dangerouslySetInnerHTML={{__html: courseDetails.course_marketing_description}} />
                </Row>
              </Col>

              {courseHighlights.length !== 0 && (
                <Col>
                  <Row className="course-highlights">
                    <p id="course-highlights-heading">What Will I Learn?</p>
                    <Row lg={2}>
                      {courseHighlights.map((highlights) => (
                        <CourseHighlightsStyle>
                          <Col>
                            <ul>
                              <li className="course-highlight-items">
                                {highlights.course_highlights}
                              </li>
                            </ul>
                          </Col>
                        </CourseHighlightsStyle>
                      ))}
                    </Row>
                  </Row>
                </Col>
              )}

              <Col>
                <Row>
                  {courseDetails.course_content && (
                    <CourseChapterDetails
                      courseContent={courseDetails.course_content}
                      totalDuration={courseDetails.duration}
                    />
                  )}
                </Row>
              </Col>
            </Col>

            <Col className="intsructor" lg="4" xs={12}>
              <Row>
                <p id="intsructor-heading">Instructor Info</p>
                <CourseInstructorStyle>
                  <Card>
                    <Card.Content style={{ marginTop: 10 }}>
                      <span
                        style={{
                          marginRight: "30px",
                          marginLeft: "20px",
                          height: "fit-content",
                        }}
                      >
                        {authorData.profile_url ? (
                          <img
                            id="instructor-image"
                            src={
                              Constants.MEDIA_BASE_URL + authorData.profile_url
                            }
                          />
                        ) : (
                          <img
                            id="instructor-image"
                            src="/assets/author_placeholder.png"
                          />
                        )}
                      </span>
                      <span
                        style={{ marginRight: "auto", height: "fit-content" }}
                      >
                        <p id="instructor-name">{authorData.name}</p>
                        <p id="instructor-intro">{authorData.intro_line}</p>
                        <span id="instructor-social">
                          {authorData.personal_url && (
                            <a href={authorData.personal_url} target="_blank">
                              <Icon name="facebook" />
                            </a>
                          )}
                          {authorData.instagram_url && (
                            <a href={authorData.instagram_url} target="_blank">
                              <Icon name="instagram" />
                            </a>
                          )}
                          {authorData.twitter_url && (
                            <a href={authorData.twitter_url} target="_blank">
                              <Icon name="twitter" />
                            </a>
                          )}
                          {authorData.linkedin_url && (
                            <a href={authorData.linkedin_url} target="_blank">
                              <MDBIcon fab icon="linkedin-in" />
                            </a>
                          )}
                        </span>
                      </span>
                    </Card.Content>
                    <Card.Content>
                      <p id="instructor-bio">{authorData.short_bio}</p>
                    </Card.Content>
                  </Card>
                </CourseInstructorStyle>
              </Row>
              <Row>
                <p style={{ marginTop: 20 }} id="intsructor-heading">
                  Course Source
                </p>
                <CourseSourceStyle>
                  <Card>
                    <Card.Content style={{ marginTop: 10 }}>
                        <img
                          id="source-logo"
                          src={Constants.MEDIA_BASE_URL + source.logo}
                        />
                      <p id="source-slogan">{source.slogan}</p>
                    </Card.Content>
                    <Card.Content>
                      <p id="source-bio">{source.details}</p>
                      <Button onClick={course_source_btn(source.url)} href={source.url} target="_blank" id="source-button">Go To Source</Button>
                    </Card.Content>
                  </Card>
                </CourseSourceStyle>
              </Row>
            </Col>
          </Row>

          {promotion.length !== 0 && (
            <div>
              <div className="sticky-promotion-1" />
              <div
                style={{ marginBottom: ifBottom }}
                className="sticky-promotion"
              >
                <PromoBottomStyle>
                  <Card>
                    <Card.Content>
                      <span className="course-promotion-content-1">
                        <span id="course-promotion-content-1-1">
                          {courseAmount}
                        </span>
                        <span id="course-promotion-content-1-2">
                          &nbsp; ${courseDiscountedAmount}
                        </span>
                      </span>
                      <p id="course-promotion-content-2-1">{promotionText}</p>
                      <div  style={{marginRight: "auto"}} className="course-promotion-content-2">
                        <Button
                          onClick={() => {window.open(promotionLink); course_deals_slider_bottom(promotionLink, courseDetails.course_title)}}
                          id="course-promotion-content-2-2"
                        >
                          Take this course
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </PromoBottomStyle>
              </div>
            </div>
          )}
        </Container>
      )}
    </React.Fragment>
  );
};

export default CourseDetail;
