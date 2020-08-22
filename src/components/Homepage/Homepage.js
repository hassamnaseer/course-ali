import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { MarginRemover } from "../../styles/MarginRemover";
import axios from "axios";
import ReactBreakpoints from 'react-breakpoints'

import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";

import Ribbon from "../Ribbon/Ribbon";
import Header from "../Header/Header";
import FullWidthSlider from "../MainSlider/FullWidthSlider";
import HomePageCoursesList from "../CoursesList/HomePageCoursesList";
import HomePageDeals from "../DealsSlider/HomePageDeals";
import HomePageCoursesSlider from "../CoursesSlider/HomePageCoursesSlider";
import Constants from "../../configurations/Constants";
import { useParams, useHistory } from "react-router-dom";

const HomePage = () => {
  const [Responses, setResponses] = useState([]);
  const [PROMO_RIBBON, setA] = useState([]);

  const breakpoints = {
    mobile: 320,
    mobileLandscape: 480,
    tablet: 768,
    tabletLandscape: 1024,
    desktop: 1200,
    desktopLarge: 1400,
    desktopWide: 1920,
  }

  let { pageId } = useParams();
  let history = useHistory();

  useEffect(() => {
    
    let url = Constants.COMPONENT_LIST_BASE_URL;
    if (pageId) {
      url = url + pageId;
    } else {
      url = url + "homepage";
    }
    axios.get(url).then(
      (results) => {
        setResponses(results.data.body.result);
        setA(results.data.body.result[0].data);
      },
      (error) => {
        console.log(error);
        history.push("/error");
      }
    );
    
  }, []);

  return (
    <div className="HomePage">
      <MarginRemover>
        <Ribbon PROMO_RIBBON={PROMO_RIBBON} />
        <Header />
        {Responses.map((response) => {
          if (response.componentType === "FULL_WIDTH_SLIDER") {
            return <FullWidthSlider slider={response.data.sliderData} />;
          } else if (
            response.componentType === "COURSE_GRID_FIT_WIDTH_MULTI_ROW"
          ) {
            return (
              <ReactBreakpoints breakpoints={breakpoints}>
                <HomePageCoursesList
                  Title={response.data.sectionTitle}
                  Data={response.data.dataSourceEndPoint}
                />
              </ReactBreakpoints>
            );
          } else if (response.componentType === "DEAL_IMAGE_DOUBLE_SCROLL") {
            return (
              <HomePageDeals
                Title={response.data.sectionTitle}
                Deals={response.data.offers}
              />
            );
          } else if (
            response.componentType === "COURSE_GRID_FIT_WIDTH_SCROLL"
          ) {
            return (
              <HomePageCoursesSlider
                Title={response.data.sectionTitle}
                Data={response.data.dataSourceEndPoint}
              />
            );
          }
        })}
      </MarginRemover>
    </div>
  );
};

export default HomePage;
