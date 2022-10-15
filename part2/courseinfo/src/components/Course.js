const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Header = ({ text }) => {
  return <h3>{text}</h3>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Footer = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.map((part) => part.exercises).reduce((a, b) => a + b)}{" "}
        exercises
      </b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </>
  );
};

export default Course;
