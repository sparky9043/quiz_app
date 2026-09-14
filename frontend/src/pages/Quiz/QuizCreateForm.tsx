import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { Quiz } from "../../types/quiz";

const QuizCreateForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccessObjectJSON = localStorage.getItem('userLoginSuccess');
      
      if (loginSuccessObjectJSON) {
        const loginSuccessObjectParsed = JSON.parse(loginSuccessObjectJSON);
        
        const teacherId = loginSuccessObjectParsed.id;

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
      throw error;
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