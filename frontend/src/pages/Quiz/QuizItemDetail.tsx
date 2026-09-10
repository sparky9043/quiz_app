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


      console.log(`${baseQuizUrl}/${param.id}`);

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


  return (
    <div>
      Quiz Details
      {quiz && <ul>
        {quiz.questions.map(question => <li key={question.id}>
          {question.content}
        </li>)}  
      </ul>}
    </div>
  )
};

export default QuizDetail;