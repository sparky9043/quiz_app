import type { Quiz } from '../../types/quiz';
import QuizItem from './QuizItem';

interface QuizListProps {
  quizList: Quiz[],
}

const QuizList = (props: QuizListProps) => {
  if (!props.quizList.length) {
    return (
      <div>
        There are no quizzes on this list
      </div>
    )
  }

  return (
    <ul>
      {props.quizList.map(quiz =>
          <QuizItem key={quiz.id} quiz={quiz} />
      )}
    </ul>
  )
};

export default QuizList;