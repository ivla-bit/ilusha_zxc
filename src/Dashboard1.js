import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const leftColumnStyle = {
    flex: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const rightColumnStyle = {
    flex: '30%',
    backgroundColor: '#4CAF50',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',


  };

  const cardStyle = {
    width: '100%',
    height: '100%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    textAlign: 'center',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginTop: '10px',
  };


  const avatarContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const avatarInputLabelStyle = {
    display: 'none',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '10px 0',
    textDecoration: 'none',
  };

  // Состояние для загрузки пользовательского аватара
  const [avatar, setAvatar] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById('avatar-input').click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }

  };


  

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make an HTTP GET request to fetch user data
    axios.get('http://localhost:80/project1/getUserData.php')
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  


  return (
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <div style={cardStyle}>
          <h1 style={headerStyle}>Особистий кабінет</h1>
          <div style={avatarContainerStyle} onClick={handleAvatarClick}>
            <div
              style={{
                ...avatarStyle,
                background: `url(${avatar || 'default-avatar.jpg'}) center/cover no-repeat`,
              }}
            >
              {!avatar && 'Аватар студента'}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={avatarInputLabelStyle}
              id="avatar-input"
            />
          </div>

          <label style={labelStyle}>Ім'я:</label>
          <span>{userData.name}</span>

          <label style={labelStyle}>Прізвище:</label>
          <span>{ userData.surname}</span>

          <label style={labelStyle}>По-батькові:</label>
          <span>{ userData.patronymic}</span>

          <label style={labelStyle}>Навчальний заклад:</label>
          <span>{ userData.university}</span>

          <label style={labelStyle}>Група:</label>
          <span>{ userData.group}</span>

          <label style={labelStyle}>Спеціальність:</label>
          <span>{ userData.specialty}</span>
        </div>
      </div>

      <div style={rightColumnStyle}>
        <Link to="/grades" style={buttonStyle}>
        Журнал оцінок
        </Link>
        <Link to="/lectures" style={buttonStyle}>
        План лекцій
        </Link>
        <Link to="/homework" style={buttonStyle}>
        Домашні завдання
        </Link>
        <button style={buttonStyle}>Налаштування</button>
        <button style={buttonStyle}>Вийти</button>
        <button style={buttonStyle}>Довідка</button>
      </div>
    </div>
  );
}

export default Dashboard;
