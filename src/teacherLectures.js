import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TeacherLectures() {

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
  
  const [lectureData, setLectureData] = useState({
    'Математика': {
      subject: "Математика",
      topic: 'Алгебра та аналіз',
      lectureDate: '20.10.2023',
      examDate: '15.11.2023',
    },
    'ООП': {
      subject : "ООП",
      topic: 'Наслідування та поліморфізм',
      lectureDate: '22.10.2023',
      examDate: '18.11.2023',
    },
    'Асемблер': {
      subject : "Асемблер",
      topic: 'Основи асемблерного програмування',
      lectureDate: '25.10.2023',
      examDate: '21.11.2023',
    },
    'Англійська': {
      subject : "Англійська",
      topic: 'Граматика та розмовна мова',
      lectureDate: '27.10.2023',
      examDate: '24.11.2023',
    },
    'Програмування': {
      subject : "Програмування",
      topic: 'Архітектура програмних систем',
      lectureDate: '30.10.2023',
      examDate: '27.11.2023',
    },
  });

  const [editingSubject, setEditingSubject] = useState(null);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const contentStyle = {
    width: '70%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const lectureListStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const lectureItemStyle = {
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const subjectStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const dateStyle = {
    color: '#666',
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
  };

  const handleSave = (subject) => {
    const data = {
      subject: lectureData[subject].subject,
      topic: lectureData[subject].topic,
      lectureDate: lectureData[subject].lectureDate,
      examDate: lectureData[subject].examDate,
    };
  
    console.log("Отправляемые данные:", data); 
  
    axios.post('http://localhost:80/project1/saveLectures.php', data)
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.error(error);
      });
  
    setEditingSubject(null);
  };

  const handleChange = (subject, field, value) => {
    setLectureData({
      ...lectureData,
      [subject]: {
        ...lectureData[subject],
        [field]: value,
      },
    });
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
      <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <h2 style={headerStyle}>План лекцій та контрольних робіт</h2>
        <ul style={lectureListStyle}>
          {Object.keys(lectureData).map((subject) => (
            <li key={subject} style={lectureItemStyle}>
              <div style={subjectStyle}>
                {editingSubject === subject ? (
                  <input
                    type="text"
                    value={lectureData[subject].subject}
                    onChange={(e) => handleChange(subject, 'subject', e.target.value)}
                  />
                ) : (
                  lectureData[subject].subject
                )}
              </div>
              <div>
                Тема лекції:
                {editingSubject === subject ? (
                  <input
                    type="text"
                    value={lectureData[subject].topic}
                    onChange={(e) => handleChange(subject, 'topic', e.target.value)}
                  />
                ) : (
                  lectureData[subject].topic
                )}
              </div>
              <div style={dateStyle}>
                Дата лекції:
                {editingSubject === subject ? (
                  <input
                    type="text"
                    value={lectureData[subject].lectureDate}
                    onChange={(e) => handleChange(subject, 'lectureDate', e.target.value)}
                  />
                ) : (
                  lectureData[subject].lectureDate
                )}
              </div>
              <div style={dateStyle}>
                Дата контрольної роботи:
                {editingSubject === subject ? (
                  <input
                    type="text"
                    value={lectureData[subject].examDate}
                    onChange={(e) => handleChange(subject, 'examDate', e.target.value)}
                  />
                ) : (
                  lectureData[subject].examDate
                )}
              </div>
              {editingSubject === subject ? (
                <button onClick={() => handleSave(subject)}>Сохранить</button>
              ) : (
                <button onClick={() => handleEdit(subject)}>Редактировать</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeacherLectures;
