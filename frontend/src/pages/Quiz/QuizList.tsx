import type { Quiz } from '../../types/quiz';

interface QuizListProps {
  quizList: Quiz[],
}

const QuizList = (props: QuizListProps) => {
  if (!props.quizList) {
    return (
      <div>
        There are no quizzes on this list
      </div>
    )
  }

  return (
    <ul>
      {props.quizList && props.quizList.map(quiz => <li key={quiz.id}>
        <div>
          {quiz.title}
        </div>
      </li>)}
    </ul>
  )
};

export default QuizList;