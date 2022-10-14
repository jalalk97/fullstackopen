import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
// <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
// <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
const Content = (props) => {
  return (
    <div>
      {props.parts.map((p, i) => <Part key={i} part={p.name} exercises={p.exercises} />)}
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts.map(p => p.exercises).reduce((a,b) => a+b)} />
    </div>
  );
};

export default App;
