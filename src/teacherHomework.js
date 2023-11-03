import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function TeacherHomework() {

  const styles = {
    backLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    arrowIcon: {
      width: '20px', 
      height: '20px',
      marginRight: '5px', 
      background: 'none', 
      border: 'none', 
    },
  };

  const [homeworkData, setHomeworkData] = useState({
    'Математика': {
      assignment: 'Завдання 1: Розв\'язати квадратне рівняння',
      deadline: '15.11.2023',
      question: '',
      file: null,
    },
    'ООП': {
      assignment: 'Завдання 1: Створити класи використовуючи ООП',
      deadline: '16.11.2023',
      question: '',
      file: null,
    },
    'Асемблер': {
      assignment: 'Завдання 1: Написати програму на асемблері',
      deadline: '17.11.2023',
      question: '',
      file: null,
    },
    'Англійська': {
      assignment: 'Завдання 1: Підготувати презентацію на тему "Англійська література"',
      deadline: '18.11.2023',
      question: '',
      file: null,
    },
    'Програмування': {
      assignment: 'Завдання 1: Розробити програмне забезпечення',
      deadline: '19.11.2023',
      question: '',
      file: null,
    },
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    width: '70%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    overflowY: 'auto',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const homeworkListStyle = {
    listStyle: 'none',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
  };

  const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const handleFileChange = (subject, e) => {
    const file = e.target.files[0];
    setHomeworkData({
      ...homeworkData,
      [subject]: { ...homeworkData[subject], file },
    });
  };

  const handleQuestionChange = (subject, e) => {
    const question = e.target.value;
    setHomeworkData({
      ...homeworkData,
      [subject]: { ...homeworkData[subject], question },
    });
  };

  const handleSubmit = (subject) => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', homeworkData[subject].question);
    formData.append('file', homeworkData[subject].file);

    axios.post('http://localhost:80/project1/saveHomework.php', formData)
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
     <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <h2 style={headerStyle}>Домашні завдання</h2>
        <ul style={homeworkListStyle}>
        
          {Object.keys(homeworkData).map((subject) => (
            <li key={subject}>
              <strong>{subject}</strong>
              <p>{homeworkData[subject].assignment}</p>
              <p>Запитання: {homeworkData[subject].question}</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(subject, e)}
                style={inputStyle}
              />
              <textarea
                placeholder="Задайте ваше запитання"
                value={homeworkData[subject].question}
                onChange={(e) => handleQuestionChange(subject, e)}
                style={inputStyle}
              />
              <button style={submitButtonStyle} onClick={() => handleSubmit(subject)}>
                Відправити
              </button>
              <p>Крайній термін: {homeworkData[subject].deadline}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeacherHomework;
