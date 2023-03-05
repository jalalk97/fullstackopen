import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart: CoursePart) => (
        <Part key={coursePart.name} {...coursePart} />
      ))}
    </div>
  );
};

export default Content;
