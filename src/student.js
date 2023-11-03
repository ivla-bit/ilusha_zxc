import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Student() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    const handleLogout = () => {
        axios.post('http://localhost:80/project1/logout.php')
          .then((response) => {
            setIsLoggedIn(false);
            // Дополнительные действия после успешного выхода из сессии
          })
          .catch((error) => {
            // Обработка ошибки при выходе из сессии
            console.error(error);
          });
      };
  
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <h1>Домашняя страница Student</h1>
            <button onClick={handleLogout}>Выйти из аккаунта</button>
          </div>
        ) : (
          <div>
            <h1>Вы вышли из аккаунта</h1>
            <p>Теперь ваша сессия завершена</p>
          </div>
        )}
      </div>
    );
  }
  
  export default Student;