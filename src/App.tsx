import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./pages/Layout/Layout.tsx";
import ListsPage from "./pages/ListsPage/ListsPage.tsx";
import {todosLoader} from "./loaders/todosLoader.ts";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<ListsPage />} loader={todosLoader}/>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
