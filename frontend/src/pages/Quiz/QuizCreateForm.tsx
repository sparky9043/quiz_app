const QuizCreateForm = () => {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">create quiz</button>
    </form>
  )
};

export default QuizCreateForm;