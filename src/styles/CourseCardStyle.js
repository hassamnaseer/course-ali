import styled from "styled-components";

export const CourseListCard = styled.div`
  .card {
      border-radius: 0px;
  }

  .ui.card {
    border-radius: 0px;
    width: auto;
  }

  .ui.card > :first-child {
      border-radius: 0px;
  }
  @media only screen and (max-width: 767px) {
    .ui.card {
      max-width: 270px;
    }
  }
`;

export const CourseSliderCard = styled.div`
.card {
    border-radius: 0px;
}

.ui.card {
  border-radius: 0px;
  width: auto;
}

.ui.card > :first-child {
    border-radius: 0px;
}
@media only screen and (max-width: 767px) {
  .ui.card {
    max-width: 270px !important;
  }
}
`;