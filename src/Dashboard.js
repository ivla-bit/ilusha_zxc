import React, { useState } from 'react';

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
    backgroundColor: '#3D405B',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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

  const buttonStyle = {
    backgroundColor: '#3D405B',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '10px 0',
    textDecoration: 'none',
    display: 'block',
  };

  const darkButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#30343C',
  };

  const blueButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3D405B',
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [language, setLanguage] = useState('uk');
  const [theme, setTheme] = useState('light');
  const [avatar, setAvatar] = useState(null);

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
    // Реализуйте здесь вашу логику выхода пользователя
    // ...

    // Закрыть модальное окно
    closeModal('logout');
  };

  const handleSettingsSave = () => {
    // Реализуйте здесь вашу логику сохранения настроек
    // ...

    // Закрыть модальное окно
    closeModal('settings');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'uk' ? 'en' : 'uk';
    setLanguage(newLanguage);
    // Ваша логика переключения языка
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Ваша логика переключения темы
  };

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

  const openChat = () => {
    // Реализуйте здесь вашу логику перехода в чат
    // Например, использовать react-router для перехода на страницу чата
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
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <div style={cardStyle}>
          <h1 style={headerStyle}>Особистий кабінет</h1>

          {/* Ваш код для данных пользователя */}
          <div>
            <label>Ім'я:</label>
            <span>Іван</span>
          </div>
          <div>
            <label>Прізвище:</label>
            <span>Іванов</span>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                backgroundColor: 'lightgray',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleAvatarClick}
            >
              {avatar ? (
                <img src={avatar} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                'Аватар студента'
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} id="avatar-input" />
          </div>
          
        </div>
      </div>

      <div style={rightColumnStyle}>
      <button style={blueButtonStyle} onClick={() => openModal('settings')}>
            Налаштування
          </button>
        <button style={darkButtonStyle} onClick={() => openModal('logout')}>
          Вийти
        </button>
        <button style={blueButtonStyle} onClick={openChat}>
          Перейти в чат
        </button>
        {isLogoutModalOpen && (
          <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
              <p>Ви дійсно хочете вийти?</p>
              <button style={blueButtonStyle} onClick={handleLogout}>
                Так
              </button>
              <button style={darkButtonStyle} onClick={() => closeModal('logout')}>
                Ні
              </button>
            </div>
          </div>
        )}
        {isSettingsModalOpen && (
          <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
              <p>Налаштування</p>
              <label>Мова:</label>
              <button style={blueButtonStyle} onClick={toggleLanguage}>
                {language === 'uk' ? 'Українська' : 'English'}
              </button>
              <label>Тема:</label>
              <button style={blueButtonStyle} onClick={toggleTheme}>
                {theme === 'light' ? 'Світла' : 'Темна'}
              </button>
              <button style={blueButtonStyle} onClick={handleSettingsSave}>
                Зберегти
              </button>
              <button style={darkButtonStyle} onClick={() => closeModal('settings')}>
                Скасувати
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
