import type { Quiz } from "../../types/quiz";
import { Navigate, Outlet } from "react-router";
import type { UserLoginSuccessObject } from "../../types/user";
import QuizList from "./QuizList";
import quizService from "../../service/quizService";
import { useQuery } from "@tanstack/react-query";

let token: string;

const setToken = (newToken: string) => {
  token = newToken;
}

const QuizPage = () => {
  const userLoginInfo = localStorage.getItem('userLoginSuccess');
  const quizQuery = useQuery<Quiz[]>({ queryKey: ['quizzes'], queryFn: () => quizService.getQuizzes(token) });
  
  if (!userLoginInfo) {
    return <Navigate to='/login' />
  }

  const userLoginJSON = JSON.parse(userLoginInfo) as UserLoginSuccessObject;

  setToken(userLoginJSON.token);


  if (!quizQuery.data) {
    return <div>
      You have no quizzes
    </div>
  }

  const quizList = quizQuery.data;

  return (
    <div>
      <h2>Quiz Page</h2>
      {
        quizQuery.data && <QuizList quizList={quizList} />
      }

      <Outlet />
    </div>
  )
}

export default QuizPage;