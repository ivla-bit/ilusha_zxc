
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function TeacherGrades() {

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

  const initialScores = [
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
  
  
  const [grades, setGrades] = useState({
    subjects,
    dates,
    scores: initialScores,
  });

  const [editingData, setEditingData] = useState(null);

  const handleEditClick = () => {
    setEditingData({ ...grades });
  };

  

  const handleSaveClick = () => {
    

    
    axios.post(`http://localhost:80/project1/saveGrades.php`, editingData)
      .then((response) => {
       
        console.log('Data saved successfully:', response.data);

       
        setGrades({ ...editingData });
        setEditingData(null);
      })
      .catch((error) => {
       
        console.error('Error saving data:', error);
      });
  };

  return (
    <div style={containerStyle}>
      <div style={journalStyle}>
      <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <h1 style={headerStyle}>Журнал з оцінками</h1>
        <button onClick={handleEditClick}>Редагувати</button>
        <button onClick={handleSaveClick}>Зберегти</button>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, border: 'none' }}></th>
              {grades.dates.map((date, index) => (
                <th key={index} style={tableHeaderStyle}>
                  {editingData ? (
                    <input
                      type="text"
                      value={editingData.dates[index]}
                      onChange={(e) => {
                        const updatedData = { ...editingData };
                        updatedData.dates[index] = e.target.value;
                        setEditingData(updatedData);
                      }}
                    />
                  ) : (
                    date
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.subjects.map((subject, rowIndex) => (
              <tr key={rowIndex} style={tableRowStyle}>
                <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>
                  {editingData ? (
                    <input
                      type="text"
                      value={editingData.subjects[rowIndex]}
                      onChange={(e) => {
                        const updatedData = { ...editingData };
                        updatedData.subjects[rowIndex] = e.target.value;
                        setEditingData(updatedData);
                      }}
                    />
                  ) : (
                    subject
                  )}
                </td>
                {grades.scores[rowIndex].map((score, columnIndex) => (
                  <td key={columnIndex} style={tableCellStyle}>
                    {editingData ? (
                      <input
                        type="text"
                        value={editingData.scores[rowIndex][columnIndex]}
                        onChange={(e) => {
                          const updatedData = { ...editingData };
                          const newValue = parseInt(e.target.value, 10);
                          updatedData.scores[rowIndex][columnIndex] = isNaN(newValue) ? '' : newValue;
                          setEditingData(updatedData);
                        }}
                      />
                    ) : (
                      score
                    )}
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

export default TeacherGrades;