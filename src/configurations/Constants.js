const BASE_URL = "https://dev-api.courseali.tech";
const CDN_URL = "https://course-ali.s3.amazonaws.com/media/";

module.exports = {
    COMPONENT_LIST_BASE_URL: BASE_URL + '/content/metadata/',
    BASE_URL: BASE_URL,
    COURSE_DETAILS_BASE_URL: BASE_URL + '/course/details/',
    MEDIA_BASE_URL: CDN_URL,
    MENU_BASE_URL: BASE_URL + '/content/allMenus',
    IMAGE_CDN_URL: CDN_URL
};
