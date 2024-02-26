import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./pages/Layout/Layout.tsx";
import ListsPage from "./pages/ListsPage/ListsPage.tsx";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<ListsPage />}/>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
