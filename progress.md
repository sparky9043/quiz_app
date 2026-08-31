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


### 8/31/2026
1. Change `user` type names from `NewUser` to `NewUser` request for clarity
2. Install React Router on the frontend
3. Review how to use data mode in React Router
    - Create a `tsx` file for App Routes
    - Use `createBrowserRouter` method to provide a set of routes and their respective components and export the route as default
    - Use the App Routes inside the main and pass it into `<RouterProvider router={AppRoutes}>`
    - Note: This is the recommended approach, as opposed to the original declariative mode
