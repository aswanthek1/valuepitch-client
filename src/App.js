import FormPage from "./Pages/FormPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserTablePage from "./Pages/UserTablePage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route element={<FormPage/>} path='/' />
      <Route element={<UserTablePage/>} path='/userList' />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
