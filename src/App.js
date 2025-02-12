import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentForm from "./pages/StudentForm";
import StudentHome from "./pages/StudentHome";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students" element={<StudentHome />} />
        <Route path="/students/add" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
