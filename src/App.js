import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Teacher from './teacher';
import Student from './student';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import Dashboard65 from './Dashboard65';
import Chat from './Chat';
import Lectures from './Lectures';
import TeacherLectures from './teacherLectures';
import Grades from './Grades';
import Homework from './Homework';
import TeacherHomework from './teacherHomework';
import TeacherGrades from './teacherGrades';
import Documentation from './Documentation';
function App() {

  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" exact element={<Registration />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} />
          <Route path="/Dashboard65" element={<Dashboard65 />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Lectures" element={<Lectures />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/Homework" element={<Homework />} />
          <Route path="/teacherLectures" element={<TeacherLectures />} />
          <Route path="/teacherHomework" element={<TeacherHomework />} />
          <Route path="/teacherGrades" element={<TeacherGrades />} />
          <Route path="/Documentation" element={<Documentation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
