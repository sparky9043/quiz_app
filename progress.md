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
4. Create the following pages and their child components:
    - `Home.tsx` + `Home.test.tsx`
    - `LoginPage.tsx` + `LoginPage.test.tsx`
        - This consists of the title and a child component `LoginForm.tsx` which has the testing file `LoginForm.test.tsx`
5. Ensure that `<Link>` component from `react-router` can be tested
    - `render(<Component />, { wrapper: BrowserRouter })` can let you render the target component within the `BrowserRouter` wrapper.
    - However, I still don't know how to click between links. But maybe this can be done in e2e testing with `playwright`? Still debating
6. Learned how to correctly type input elements when using `React Testing Library`
    ```typescript
        const inputElement = screen.getByLabelText('some-input');
        // This element has a generic type of "HTML Element" which doesn't have
        // access to value

        // Alternate solution
        const inputElement = screen.getByLabelText<HTMLInputElement>('some-input');
        // By letting TS know that this element will be an Input Element
        // we now have access to inputElement.value
    ```

### 9/1/2026
1. Finally figured out how to use `<MemoryRouter>` with `initialEntries` as a way to mock paths.
    - First use `render` function with `<MemoryRouter initialEntries=['/path']>` and wrap it around the desired component
    - This will render the component statically with the desired path
2. Figured out how to use `<MemoryRouter>` and combine it with React Router components to render specific path rendering including `<Outlet>`
    - Example: If the goal is to trigger the target component to render its child component when a specific path is triggered, one must do both: render `<MemoryRouter>` with specific `initialEntries` and `Route` components
    
    Here is a short example:
    ```mdx
        <MemoryRouter initialEntries={['/path/child']}>
            <Routes>
                <Route path='/path' element={<Parent />} >
                    <Route path='child' element={<Child />} />
                </Route>
            </Routes>
        </MemoryRouter>
    ```
    - The above code does 2 things: provides the path to go to using the `MemoryRouter` and tells what to trigger when the path is there. The `Route` component triggers the component and its children to be rendered upon specified path
3. Created basic `ProtectedRoute` component, which will render its children as `<Outlet />`
4. Created more tests for `DashboardPage`, `QuizPage` to ensure that each of the components are properly wrapped around `BrowserRouter` and the tests run correctly

### Potential To-Do for next time
1. Create Pages that require login and then render quizzes in those pages
2. Create unit tests for the renders using `React Testing Library`
3. If using `useEffect` to render data goes well, try using `React Query` instead
