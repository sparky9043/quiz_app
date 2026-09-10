import { useEffect, useState } from "react";
import type { Quiz } from "../../types/quiz";
import { Navigate, Outlet } from "react-router";
import type { UserLoginSuccessObject } from "../../types/user";
import QuizList from "./QuizList";
import quizService from "../../service/quizService";

let token: string;

const setToken = (newToken: string) => {
  token = newToken;
}

const QuizPage = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  useEffect(() => {
    void (async () => {
      if (!token) {
        throw new Error('token invalid');
      }

      const response = await quizService.getQuizzes(token);

      setQuizList(response.data);
    })();
  }, []);
  
  const userLoginInfo = localStorage.getItem('userLoginSuccess');
  
  if (!userLoginInfo) {
    return <Navigate to='/login' />
  }

  const userLoginJSON = JSON.parse(userLoginInfo) as UserLoginSuccessObject;

  setToken(userLoginJSON.token);


  return (
    <div>
      <h2>Quiz Page</h2>
      {
        quizList && <QuizList quizList={quizList} />
      }
      <Outlet />
    </div>
  )
}

export default QuizPage;