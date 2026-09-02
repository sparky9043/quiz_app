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
5. Use `useEffect` hook with authorization header and JSON Web Token to properly fetch desired quizzes for successful outcome

### 9/2/2026
1. Install and configure `tailwindcss`
2. Learned that learned that when you import `tailwind` through a css file, you're injecting several things at once:
    ```css
        @import 'tailwindcss';
    ```
    This line is equivalent to 4 lines in one:
    ```css
        @layer theme, base, components, utilities; /* establishes hierarchy of priority of styles */

        @import 'tailwindcss/theme.css' layer(theme); /* imports all of design tokens and calls it "theme" */
        @import 'tailwindcss/preflight.css' layer(base); /* imports all of resets and calls it "base" */
        @import 'tailwindcss/utilities.css' layer(utilities); /* imports all of utility classes and calls it "utilities" */
    ```
3. In order to get rid of unnecessary resets, you need to get rid of `@import 'tailwindcss/preflight.css layer(base)`. This will help me remove forceful resets by tailwind
4. If I want to import my own resets, I have couple of options:
    a. I can import my own `reset.css` file and import it into my project (i.e. `React`)
    b. I can create my own css file and use `@layer name` to create my own styles. Here is an example:
    ```css
        /* custom-style.css */
        @layer reset {
            body {
                margin: 0;
                padding: 0;
            }

            /* and other resets */
        }

        /* tailwind-import-file.css */
        @layer reset, ...; /* include it */

        @import './relative/path/custom-style.css';

    ```
5. Deployed application on render and debugged a deployment error. The error happened because the `frontend` folders dependencies were not installed and, therefore, any command that used any features in the frontend were throwing errors
6. Used `app.use(express.static('dist'))` to serve the application with a frontend "shell" made by building the application in the frontend:
    a. Run `npm run build` in the `frontend/` directory, which will create a `dist` folder
    b. Run `cp -r dist ../backend`, which will copy the entire directory. The `-r` flag is responsible for the "recursive" copying of the entire directory.
    c. Instruct the Express app file to use the static files in the `dist/` directory by calling `app.use(express.static('dist'))` function

### Potential To-Do for next time
1. Consider refactoring all `axios` functions to `service` functions
2. Consider switching `useEffect` with React Query. But maybe do this after deploying?
3. Once all the login functions work barely, consider deploying to render
4. `DashboardPage.test.tsx` and `QuizPage.test.tsx` are throwing errors. Find out why.