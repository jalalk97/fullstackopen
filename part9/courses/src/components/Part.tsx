import {
  assertNever,
  CoursePart,
  CoursePartBackgroundContent,
  CoursePartBase,
  CoursePartBasicContent,
  CoursePartDescription,
  CoursePartGroupContent,
  CoursePartSpecialContent,
} from "../types";

const Base = ({ name, exerciseCount }: CoursePartBase) => {
  return (
    <div>
      <b>
        {name} {exerciseCount}
      </b>
    </div>
  );
};

const Description = ({
  name,
  exerciseCount,
  description,
}: CoursePartDescription) => {
  return (
    <>
      <Base name={name} exerciseCount={exerciseCount} />
      <div>
        <em>{description}</em>
      </div>
    </>
  );
};

const Basic = (props: CoursePartBasicContent) => {
  return <Description {...props} />;
};

const Group = ({
  name,
  exerciseCount,
  groupProjectCount,
}: CoursePartGroupContent) => {
  return (
    <p>
      <Base name={name} exerciseCount={exerciseCount} />
      <div>project exercises {groupProjectCount}</div>
    </p>
  );
};

const Background = ({
  name,
  exerciseCount,
  description,
  backgroundMaterial,
}: CoursePartBackgroundContent) => {
  return (
    <p>
      <Description
        name={name}
        exerciseCount={exerciseCount}
        description={description}
      />
      <div>submit to {backgroundMaterial}</div>
    </p>
  );
};

const Special = ({
  name,
  exerciseCount,
  description,
  requirements,
}: CoursePartSpecialContent) => {
  return (
    <p>
      <Description
        name={name}
        exerciseCount={exerciseCount}
        description={description}
      />
      <div>required skills: {requirements.join(", ")}</div>
    </p>
  );
};

const Part = ({ kind, ...content }: CoursePart) => {
  switch (kind) {
    case "basic":
      return <Basic {...(content as CoursePartBasicContent)} />;
    case "group":
      return <Group {...(content as CoursePartGroupContent)} />;
    case "background":
      return <Background {...(content as CoursePartBackgroundContent)} />;
    case "special":
      return <Special {...(content as CoursePartSpecialContent)} />;
    default:
      return assertNever(kind);
  }
};

export default Part;
