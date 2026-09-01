import { useEffect, useState } from "react";
import type { Quiz } from "../../types/quiz";
import axios from "axios";
import { Navigate } from "react-router";
import type { UserLoginSuccessObject } from "../../types/user";
// import { useNavigate } from "react-router";

let token: string;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
}


const QuizPage = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  // const navigate = useNavigate();

  const userLoginInfo = localStorage.getItem('userLoginSuccess');

  if (!userLoginInfo) {
    return <Navigate to='/login' />
  }

  const userLoginJSON = JSON.parse(userLoginInfo) as UserLoginSuccessObject;

  setToken(userLoginJSON.token);

  useEffect(() => {
    void (async () => {
      if (!token) {
        throw new Error('token invalid');
      }

      const response = await axios
        .get<Quiz[]>(
          '/api/quizzes',
          {
            headers: {
              "Authorization": token
            },
          },
        );

      if (!Array.isArray(response.data)) {
        throw new Error('Internal server error');
      }

      setQuizList(response.data);
    })();
  }, [token]);

  return (
    <div>
      <h2>Quiz Page</h2>
      <ul>
        {quizList && quizList.map(quiz => <li key={quiz.id}>
          <div>
            {quiz.title}
          </div>
        </li>)}
      </ul>
    </div>
  )
}

export default QuizPage;