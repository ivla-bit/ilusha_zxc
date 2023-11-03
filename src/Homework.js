import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DatabasePage = () => {
  const [serverData, setServerData] = useState([]); // Used for data from the server

  useEffect(() => {
    
    axios.get("http://localhost:80/project1/getHomework.php")
      .then(response => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          setServerData(response.data);
        } else {
          console.error("Data from the server is not an array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const headerStyle = {
    backgroundColor: "#f2f2f2",
  };

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

  return (
    <div style={{ margin: "20px" }}>
     <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
      <table style={tableStyle}>
      
        <thead>
          <tr>
            <th style={{ ...cellStyle, ...headerStyle }}>Предмет</th>
            <th style={cellStyle}>Файл</th>
            
            <th style={cellStyle}>Повідомлення</th>
          </tr>
        </thead>
        <tbody>
  {serverData.map((item, index) => (
    <tr key={index}>
      <td style={cellStyle}>{item.subject}</td>
      <td style={cellStyle}>
        <a href={`http://localhost:80/project1/${item.file}`} download>
          {item.file}
        </a>
      </td>
      
      <td style={cellStyle}>{item.message}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default DatabasePage;
