import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { QuizWithQuestions } from "../../types/quiz";

const QuizDetail = () => {
  const param = useParams();

  const baseQuizUrl = '/api/quizzes';

  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);

  useEffect(() => {
    void (async () => {
      const jwt = localStorage.getItem('userLoginSuccess');

      if (!jwt) {
        throw new Error('jsonwebtoken invalid');
      }

      const jwtParsed = JSON.parse(jwt);

      const response = await axios
        .get<QuizWithQuestions>(`${baseQuizUrl}/${param.id}`, {
          headers: {
            "Authorization": "Bearer " + jwtParsed.token,
          },
        }) 
        
      const currentQuiz = response.data;

      setQuiz(currentQuiz);

    })();

  }, [param]);

  if (!quiz) {
    return (<div>
      No quiz has been loaded at this time
    </div>
    )
  }


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