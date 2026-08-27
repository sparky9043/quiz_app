# Progress Notes
## I'll be using this as a way to keep track of my progress

### 8/27/2026
1. Create endpoint on `/api/quizzes/:id`
2. Create `getOneQuizById` functions in `service` and `queries`
3. Ensure `getOneQuizById` takes 2 arguments: 1) quiz id and 2) teacher id
4. Ensure that only people who have access to the quiz can get it
    Example:
        Teacher Created the quiz -> Quiz ID matches the Teacher ID -> Access Granted
        Teacher Did not create the quiz -> Quiz ID will not match the Teacher ID -> Access Forbidden
        Student was given teacher id -> Quiz ID matches Teacher ID -> Access Granted
        Student was not given teacher id -> Quiz ID will not match the Teacher ID -> Access Forbidden
    
    Of course, if the teacher id or the quiz id doesn't exist, this will return Not Found
5. Initialize frontend in the `frontend` folder
6. Initialize `vitest` and `react-testing-library` for the frontend
7. Create workflows to include `frontend` in the `pipeline.yml` folder
8. Include `npm test` in the pipeline