import { useParams } from "react-router";
import type { QuizWithQuestions } from "../../types/quiz";
import { useQuery } from "@tanstack/react-query";
import quizService from "../../service/quizService";

const QuizDetail = () => {
  const param = useParams();

  const jwt = localStorage.getItem('userLoginSuccess');

  if (!jwt) {
    throw new Error('jsonwebtoken invalid');
  }

  const jwtParsed = JSON.parse(jwt);

  const query = useQuery<QuizWithQuestions>({
    queryKey: ['quizzes', param.id],
    queryFn: () => quizService.getQuizWithQuestions(String(param.id), jwtParsed.token)
  });

  if (query.isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!query.data) {
    return (
      <div>
        There was an error fetching quiz details
      </div>
    )
  }

  const quiz = query.data;

  return (
    <div>
      Questions
      {quiz.questions.length ? <ul>
        {quiz.questions.map(question => <li key={question.id}>
          {question.content}
        </li>)}  
      </ul>
        : <p>
          There are no questions in this quiz. Add questions
        </p>
      }
    </div>
  )
};

export default QuizDetail;