import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { Quiz } from "../../types/quiz";
import type { UserLoginSuccessObject } from "../../types/user";

const QuizCreateForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccessObjectJSON = localStorage.getItem('userLoginSuccess');
      
      if (loginSuccessObjectJSON) {
        const loginSuccessObjectParsed: UserLoginSuccessObject = JSON.parse(loginSuccessObjectJSON);
        
        const teacherId = loginSuccessObjectParsed.id;

        if (!teacherId || loginSuccessObjectParsed.type !== 'teacher') {
          throw new Error('invalid teacher id or student user');
        }

        const quizRequest = {
          title,
          teacher_id: Number(teacherId),
        }

        const response = await axios
          .post<Quiz>('/api/quizzes', quizRequest, {
            headers: {
              "Authorization": `Bearer ${loginSuccessObjectParsed.token}`,
            },
          });
        
        navigate(`/dashboard/quiz/${response.data.id}`);
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

  };

  const [title, setTitle] = useState<string>('');

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button type="submit">create quiz</button>
    </form>
  )
};

export default QuizCreateForm;