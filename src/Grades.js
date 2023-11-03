import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Grades() {

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

  const journalStyle = {
    width: '90%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    border: '1px solid #ccc',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    border: '1px solid #ccc',
  };

  const tableRowStyle = {
    borderBottom: '1px solid #ccc',
  };

  const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ccc',
  };

  const subjects = ['Математика', 'ООП', 'Асемблер', 'Англійська', 'Програмування'];
  const dates = ['01.10.2023', '02.10.2023', '03.10.2023', '04.10.2023', '05.10.2023'];
  const scores = [
    [95, 88, 76, 90, 82],
    [87, 92, 78, 85, 90],
    [89, 91, 82, 88, 76],
    [92, 94, 88, 91, 85],
    [86, 90, 80, 88, 92],
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/project1/getGrades.php`)
      .then((response) => {
        const responseData = response.data;
  
        if (Array.isArray(responseData)) {
          
          const transformedData = [];
  
          responseData.forEach((item) => {
            const existingItem = transformedData.find((i) => i.subject === item.subject);
  
            if (existingItem) {
              // Если предмет уже существует, добавляем оценку
              existingItem.dates.push(item.date);
              existingItem.grades.push(item.grade);
            } else {
              
              transformedData.push({
                subject: item.subject,
                dates: [item.date],
                grades: [item.grade],
              });
            }
          });
  
          setData(transformedData);
        } else {
          console.error('Данные из сервера не являются массивом:', responseData);
        }
      })
      .catch((error) => {
        console.error('Ошибка при запросе данных:', error);
      });
  }, []);
  

  return (
    <div style={containerStyle}>
      <div style={journalStyle}>
      <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <h1 style={headerStyle}>Журнал з оцінками</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, border: 'none' }}>Предмет</th>
              {data[0]?.dates.map((date, index) => (
                <th key={index} style={tableHeaderStyle}>
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} style={tableRowStyle}>
                <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{row.subject}</td>
                {row.grades.map((grade, columnIndex) => (
                  <td key={columnIndex} style={tableCellStyle}>
                    {grade}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
  
  
  
}

export default Grades;
