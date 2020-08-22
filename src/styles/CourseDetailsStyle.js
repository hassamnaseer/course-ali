import styled from "styled-components";

export const CourseDetailsStyle = styled.div`
.ui.card {
  margin: 0;
  border-radius: 0px;
  width: 33.333%;
  height: 100px;
}
.content {
  display: flex !important;
  justify-content: center !important;
}

@media only screen and (max-width: 470px) {
  .ui.card {
    height: 75px;
  }

  .ui.card>.content {
    padding: 0;
  }
}
`;

export const CourseDetailsPromoStyle = styled.div`
.ui.card {
  margin: 0;
  border-radius: 0px;
  min-width: 100%;
  height: 100px;
  background-color: #1C212D;
}
.content {
  display: flex !important;
  justify-content: center !important;
}

.ui.button {
  padding: 0;
}
`;

export const PromoBottomStyle = styled.div`
.ui.card {
  margin: 0;
  border-radius: 0px;
  min-width: 100%;
  height: 80px;
  background-color: #1C212D;
  opacity: 0.99;
}
.content {
  display: flex !important;
  justify-content: center !important;
}

.ui.button {
  padding: 0;
}
`;

export const CourseInstructorStyle = styled.div`
.ui.card {
  margin: 0;
  border-radius: 0px;
  min-width: 100%;
  width: 100%;
}
.content {
  display: flex !important;
  justify-content: center !important;
}
`;

export const CourseSourceStyle = styled.div`
.ui.card {
  margin: 0;
  border-radius: 0px;
  min-width: 100%;
  width: 100%;
}
.content {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.ui.button {
  padding: 1.1em;
}
`;

export const CourseHighlightsStyle = styled.div`
li::marker {
  color: #48C52B;
  margin-bottom: 100px !important;
}
`;

