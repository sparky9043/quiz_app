import type { Quiz } from "../../types/quiz";

interface QuizItemProps {
  quiz: Quiz;
}

const QuizItem = (props: QuizItemProps) => {
  return (
    <li>
      <div>
        {props.quiz.title}
      </div>
    </li>
  )
};

export default QuizItem;