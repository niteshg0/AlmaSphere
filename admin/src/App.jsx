import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import Home from './Home/Home';
import Layout from './Layout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Home />} />
      </Route>
    )
  );


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
