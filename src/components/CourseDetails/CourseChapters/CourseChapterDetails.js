import React, {useEffect, useState} from "react";
import CourseChapters from "./CourseChapters";
import "./CourseChapters.css";
import "./CourseChapterDetails.css"

const CourseChapterDetails = (props) => {
  let line;
  const [courseContent, setContent] = useState([])
  const [length, setLength] = useState()
  const [totalLectures, setTotalLectures] = useState("")
  const [duration, setDuration] = useState([])
  const [lectureText, setLectureText] = useState("")

  const convert_time_to_string = (days, hours, minutes) => {
    let hour = (Number(days) * 24) * 60 + Number(hours)
    let minute = Number(minutes)
    
    if(minute < 10) {
      minute = "0" + String(minutes)
    }
    
    if(hour !== 0) {
     return (String(hour) + ":" + minute + "m")
    }
    else if(hour === 0) {
      return (minute + "m")
    }
    
  }

  const total_duration = (days, hours) => {

    let day = Number(days) * 24
    let hour = Number(hours)
    return (String(day + hour) + 'h')

  }

  useEffect(() => {
    setContent(props.courseContent)
    if(props.courseContent.length > 0) {
      setLength(props.courseContent.length)
    }
    setTotalLectures(props.courseContent.length)
    if(props.courseContent.length > 1) {
      setLectureText("Lectures")
    } else {
      setLectureText("Lecture")
    }
    setDuration(props.totalDuration)
  }, []);

  return (
    <React.Fragment>
      {length && <div className = "details-container">
        <h1 className="heading">Curriculum
          <span id="heading-total-time">
            {total_duration(duration.days, duration.hours)}
            </span>
          <span id="heading-no-of-lecture">{lectureText}</span>
          <span id="no-of-lectures">{totalLectures} &nbsp;</span>
        </h1>
        
        <div className="course-chapters">
          <hr style={{width: "100%"}} />
          {courseContent.map((content, index) => {
                  
                  return (
                    <div>
                    <CourseChapters title={content.name} lecture={"Lecture 1." + (index+1)}
                      duration={convert_time_to_string(content.duration.days, content.duration.hours, content.duration.minutes)}
                    >
                      {content.chapters.map((chapter, index) => {
                        if(index === content.chapters.length -1) {
                          line = <div></div>
                        }
                        else if (chapter.id) {
                          line = <hr />
                        }
                        return (
                          <div>
                            <span>{chapter.name}</span>
                            <span style={{float: "right"}}>
                            {convert_time_to_string(chapter.chapter_duration.days, chapter.chapter_duration.hours, chapter.chapter_duration.minutes)}
                            </span>
                            {line}
                          </div>
                        )
                      })}
                    </CourseChapters>
                    <hr style={{width: "100%"}} />
                    </div>
                  )
                })}
        </div>
      </div>
      }
    </React.Fragment>
  );
};

export default CourseChapterDetails;
