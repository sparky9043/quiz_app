import { Link } from "react-router";
import type { Quiz } from "../../types/quiz";

interface QuizItemProps {
  quiz: Quiz;
}

const QuizItem = (props: QuizItemProps) => {
  return (
    <li>
      <div>
        <Link to={`${props.quiz.id}`}>
          {props.quiz.title}
        </Link>
      </div>
    </li>
  )
};

export default QuizItem;