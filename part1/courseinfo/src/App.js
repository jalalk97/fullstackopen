import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return Array.from(Array(10).keys())
    .map((p, i) => [props.parts[i], props.exercises[i]])
    .map((course, i) => <p key={i}>{course[0]} {course[1]}</p>);
};

const Total = (props) => {
  return <p>Number of exercises {props.sum}</p>

}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total sum={exercises.reduce((a,b) => a+b)} />
    </div>
  );
};

export default App;
