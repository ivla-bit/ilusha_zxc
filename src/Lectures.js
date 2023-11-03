import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Lectures() {
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

  const topics = {
    'Математика': 'Алгебра та аналіз',
    'ООП': 'Наслідування та поліморфізм',
    'Асемблер': 'Основи асемблерного програмування',
    'Англійська': 'Граматика та розмовна мова',
    'Програмування': 'Архітектура програмних систем',
  };

  const lectureDates = {
    'Математика': '20.10.2023',
    'ООП': '22.10.2023',
    'Асемблер': '25.10.2023',
    'Англійська': '27.10.2023',
    'Програмування': '30.10.2023',
  };

  const examDates = {
    'Математика': '15.11.2023',
    'ООП': '18.11.2023',
    'Асемблер': '21.11.2023',
    'Англійська': '24.11.2023',
    'Програмування': '27.11.2023',
  };

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/project1/getLections.php`)
      .then((response) => {
        setLectures(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);
  if (!Array.isArray(lectures)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
      <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <h2 style={headerStyle}>План лекцій та контрольних робіт</h2>
        <ul style={lectureListStyle}>
          {lectures.map((lecture) => (
            <li key={lecture.subject} style={lectureItemStyle}>
              <div style={subjectStyle}>{lecture.subject}</div>
              <div>Тема лекції: {lecture.lectureTheme}</div>
              <div style={dateStyle}>Дата лекції: {lecture.lectureDate}</div>
              <div style={dateStyle}>Дата контрольної роботи: {lecture.testWork}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Lectures;
