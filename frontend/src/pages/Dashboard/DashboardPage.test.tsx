import { render, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { MemoryRouter, Route, Routes } from "react-router";
import QuizPage from "../Quiz/QuizPage";

describe('DashboardPage Component', () => {
  it('renders Dashboard header if on /dashboard', () => {
    const dashboardRoute = '/dashboard';

    render(
      <MemoryRouter initialEntries={[dashboardRoute]}>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('renders Quiz header if on /dashboar/quiz', () => {
    const quizRoute = '/dashboard/quiz'

    render(
      <MemoryRouter initialEntries={[quizRoute]}>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage />}>
            <Route path='quiz' element={<QuizPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Quiz Page/i)).toBeInTheDocument();
  });
});