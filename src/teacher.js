import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('uk');

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
    backgroundColor: theme === 'dark' ? '#003366' : '#3498db',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const cardStyle = {
    width: '100%',
    height: '100%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    color: theme === 'dark' ? 'white' : 'black',
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
    backgroundColor: theme === 'dark' ? 'black' : 'lightgray',
    color: theme === 'dark' ? 'white' : 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const avatarInputLabelStyle = {
    display: 'none',
  };

  const modalContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const modalContentStyle = {
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    color: theme === 'dark' ? 'white' : 'black',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: theme === 'dark' ? 'white' : 'black',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '10px 0',
    textDecoration: 'none',
  };

  const pulsatingChatButtonStyle = {
    ...buttonStyle,
    animation: 'pulse 1.5s infinite',
  };

  const [avatar, setAvatar] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById('avatar-input').click();
  };

  const uploadAvatar = (file) => {
    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('avatar', file);
  
    axios.post('http://localhost:80/project1/saveTeacherAvatar.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        
        console.log('Аватар успешно загружен');
      })
      .catch(error => {
        console.error('Ошибка при загрузке аватара:', error);
      });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        uploadAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openModal = (modalType) => {
    if (modalType === 'logout') {
      setIsLogoutModalOpen(true);
    } else if (modalType === 'settings') {
      setIsSettingsModalOpen(true);
    }
  };

  const closeModal = (modalType) => {
    if (modalType === 'logout') {
      setIsLogoutModalOpen(false);
    } else if (modalType === 'settings') {
      setIsSettingsModalOpen(false);
    }
  };

  const handleLogout = () => {
    
    closeModal('logout');
  };

  const handleSettingsSave = () => {
    
    closeModal('settings');
  };

  const [userData, setUserData] = useState(null);
  const userEmail = localStorage.getItem('userEmail');


useEffect(() => {
  
  axios.post('http://localhost:80/project1/getUserDataTeacher.php', { email: userEmail })
    .then(response => {
      const userData = response.data;
      console.log(response.data);
      setUserData(userData); // Обновляем состояние
    })
    .catch(error => {
      console.error(error);
    });
}, []);


useEffect(() => {
  axios.post('http://localhost:80/project1/getTeacherAvatar.php', { email: userEmail })
    .then(response => {
      const avatarData = response.data;

      // If an avatar URL is received, set it in the state
      if (avatarData) {
        setAvatar(`http://localhost/project1/${avatarData}`);
      }
    })
    .catch(error => {
      console.error(error);
    });
}, [userEmail]); 

  const toggleLanguage = () => {
    const newLanguage = language === 'uk' ? 'en' : 'uk';
    setLanguage(newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <div style={cardStyle}>
          <h1 style={headerStyle}>{language === 'uk' ? 'Особистий кабінет' : 'Personal Cabinet'}</h1>
          <div style={avatarContainerStyle} onClick={handleAvatarClick}>
            <div
              style={{
                ...avatarStyle,
                background: `url(${avatar || 'default-avatar.jpg'}) center/cover no-repeat`,
              }}
            >
              {!avatar && (language === 'uk' ? 'Аватар вчителя' : 'Teacher Avatar')}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={avatarInputLabelStyle}
              id="avatar-input"
            />
          </div>
          {userData ? (<div><label style={labelStyle}>{language === 'uk' ? 'Ім\'я' : 'First Name'}:</label>
          <span>{userData.name}</span>
          <label style={labelStyle}>{language === 'uk' ? 'Прізвище' : 'Last Name'}:</label>
          <span>{userData.secondName}</span>
          <label style={labelStyle}>{language === 'uk' ? 'По-батькові' : 'Middle Name'}:</label>
          <span>{userData.patronymic}</span>
          <label style={labelStyle}>{language === 'uk' ? 'Місце роботи' : 'Educational Institution'}:</label>
          <span>{userData.university}</span></div>) : ( <div>Loading...</div>)}
          
        </div>
      </div>

      <div style={rightColumnStyle}>
        <Link to="/chat" style={pulsatingChatButtonStyle}>
          {language === 'uk' ? 'Перейти в чат' : 'Go to Chat'}
        </Link>
        <Link to="/chat" style={pulsatingChatButtonStyle}>
          {language === 'uk' ? 'Додати інформацію' : 'Add information'}
        </Link>
        <Link to="/grades" style={buttonStyle}>
        Журнал оцінок
        </Link>
        <Link to="/teacherLectures" style={buttonStyle}>
        План лекцій
        </Link>
        <Link to="/homework" style={buttonStyle}>
        Домашні завдання
        </Link>

        <div style={{ flex: 1 }}></div>

        <div>
          <button style={buttonStyle} onClick={() => openModal('settings')}>
            {language === 'uk' ? 'Налаштування' : 'Settings'}
          </button>
          <button style={buttonStyle} onClick={() => openModal('logout')}>
            {language === 'uk' ? 'Вийти' : 'Logout'}
          </button>
          <button style={buttonStyle}>
            {language === 'uk' ? 'Довідка' : 'Help'}
          </button>
        </div>
        {isLogoutModalOpen && (
          <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
              <p>
                {language === 'uk' ? 'Ви дійсно хочете вийти?' : 'Do you really want to log out?'}
              </p>
              <button style={buttonStyle} onClick={handleLogout}>
                {language === 'uk' ? 'Так' : 'Yes'}
              </button>
              <button style={buttonStyle} onClick={() => closeModal('logout')}>
                {language === 'uk' ? 'Ні' : 'No'}
              </button>
            </div>
          </div>
        )}
        {isSettingsModalOpen && (
          <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
              <p>{language === 'uk' ? 'Налаштування' : 'Settings'}</p>
              <label>{language === 'uk' ? 'Мова' : 'Language'}:</label>
              <button style={buttonStyle} onClick={toggleLanguage}>
                {language === 'uk' ? 'Українська' : 'English'}
              </button>
              <label>{language === 'uk' ? 'Тема' : 'Theme'}:</label>
              <button style={buttonStyle} onClick={toggleTheme}>
                {theme === 'light'
                  ? language === 'uk'
                    ? 'Світла'
                    : 'Light'
                  : language === 'uk'
                  ? 'Темна'
                  : 'Dark'}
              </button>
              <button style={buttonStyle} onClick={handleSettingsSave}>
                {language === 'uk' ? 'Зберегти' : 'Save'}
              </button>
              <button style={buttonStyle} onClick={() => closeModal('settings')}>
                {language === 'uk' ? 'Скасувати' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
