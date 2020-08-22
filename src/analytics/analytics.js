import ReactGa from "react-ga";

// import {  } from "../../analytics/analytics"

export const pageview = () => {
  ReactGa.initialize("UA-165398799-1");
  ReactGa.pageview(window.location.pathname + window.location.search);
};

export const promo_ribbon_btn = (url) => {
  ReactGa.event({
    category: 'PROMO_RIBBON',
    action: 'Clicked',
    value: url,
    label: 'promotion_view'
  })
};

export const promo_ribbon_close = () => {
  ReactGa.event({
    category: 'PROMO_RIBBON',
    action: 'Clicked',
    value: '',
    label: 'promotion_closed'
  })
};

export const header_logo = () => {
  ReactGa.event({
    category: 'HEADER',
    action: 'Clicked',
    value: '',
    label: 'logo_click'
  })
};

export const contact_button = (url) => {
  ReactGa.event({
    category: 'HEADER',
    action: 'Clicked',
    value: url,
    label: 'contact_us'
  })
};

export const main_slider_primary_button = (url) => {
  ReactGa.event({
    category: 'FULL_WIDTH_SLIDER',
    action: 'Clicked',
    value: url,
    label: 'primary'
  })
};

export const main_slider_secondary_button = (url) => {
  ReactGa.event({
    category: 'FULL_WIDTH_SLIDER',
    action: 'Clicked',
    value: url,
    label: 'secondary'
  })
};

export const course_list_card = (url, title) => {
  ReactGa.event({
    category: 'COURSE_GRID_FIT_WIDTH_MULTI_ROW',
    action: 'Clicked',
    value: url,
    label: title
  })
};

export const deals_slider = (url, title) => {
  ReactGa.event({
    category: 'DEAL_IMAGE_DOUBLE_SCROLL',
    action: 'Clicked',
    value: url,
    label: title
  })
};

export const course_deals_slider = (url, title) => {
  ReactGa.event({
    category: 'CourseDetails',
    action: 'Promotion_Clicked',
    value: url,
    label: title + ' && body_banner',
  })
};

export const course_deals_slider_bottom = (url, title) => {
  ReactGa.event({
    category: 'CourseDetails',
    action: 'Promotion_Clicked',
    value: url,
    label: title + ' && bottom_sheet',
  })
};

export const course_source_btn = (url) => {
  ReactGa.event({
    category: 'CourseDetailsSource',
    action: 'Clicked',
    value: url,
    label: 'Course Source',
  })
};

export const contact_us_button = () => {
  ReactGa.event({
    category: 'ContactButton',
    action: 'Clicked',
    label: 'Query_Sent'
  })
};
