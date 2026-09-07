import { render, screen } from "@testing-library/react";
import QuizList from "./QuizList";

const quizList = [
  {
    id: 1,
    teacher_id: 1,
    title: 'How to train your dragon',
    timestamp: '2026-01-01 00:00:00',
  },
  {
    id: 2,
    teacher_id: 1,
    title: 'How to lose weight in 4 easy steps',
    timestamp: '2026-01-01 00:00:00',
  },
]

describe('QuizList component', () => {
  it('Renders quiz titles as list', () => {
    render (
      <QuizList quizList={quizList} />
    )

    expect(screen.getByText(/How to train your dragon/i)).toBeInTheDocument();
  });
});