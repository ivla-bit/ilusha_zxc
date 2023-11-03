import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #3498db;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 10px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: #3498db;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  color: #3498db;
`;

const PrimaryButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
  border: 2px solid #3498db;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
`;

const ForgotPassword = styled.a`
  font-size: 12px;
  text-decoration: none;
  color: #3498db;
  margin-top: 10px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;



function Registration() {
  const [userType, setUserType] = useState('registration');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [group, setGroup] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [patronymicError, setPatronymicError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');



  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (!name) {
      setNameError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!surname) {
      setSurnameError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setSurnameError('');
    }

    if (!patronymic) {
      setPatronymicError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setPatronymicError('');
    }

    if (!phone) {
      setPhoneError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setPhoneError('');
    }
    if (!phone || !/^[+\d]+$/.test(phone)) {
      setPhoneError('Номер телефону має містити тільки цифри');
      isValid = false;
    } else {
      setPhoneError('');
    }
    

    if (!email) {
      setEmailError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!email || !email.includes('@')) {
      setEmailError('Електронна пошта має бути валідною');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (!password || password.length < 4) { 
      setPasswordError('Пароль повинен бути не коротше 4 символів');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (userType === 'registration' && password !== confirmPassword) {
      setConfirmPasswordError('Паролі не співпадають');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      // Если данные проходят проверку, вы можете отправить их на сервер или выполнить другие действия для регистрации
      console.log('Дані для реєстрації:');
      console.log('Тип користувача:', role);
      console.log('Ім\'я:', name);
      console.log('Прізвище:', surname);
      console.log('По батькові:', patronymic);
      console.log('Номер телефону:', phone);
      console.log('Електронна пошта:', email);
      console.log('Пароль:', password);
      console.log('Університет:', university);
      console.log('Спеціальність:', specialty);
      console.log('Група:', group);

      const userData = {
        role,
        name,
        surname,
        patronymic,
        phone,
        email,
        password,
        university,
        specialty,
        group,
        workplace,
      };

      let registrationUrl = 'http://localhost:80/project1/registrationStudent.php';
      if (role === 'teacher') {
        registrationUrl = 'http://localhost:80/project1/registrationTeacher.php';
      }

      axios.post(registrationUrl, userData)
  .then((response) => {
    console.log(response.data);
    if (response.data.formType === "login") {
      // Пользователь уже зарегистрирован, перенаправляем на форму входа
      handleUserTypeChange('login');
    } else {
      console.log(response.data);
      // После успешной регистрации или входа


      if (role === 'teacher') {
        localStorage.setItem('userEmail', email);
        console.log(localStorage);

        window.location.href = 'teacher';
      } else {
        localStorage.setItem('userEmail', email);
        console.log(localStorage);

        window.location.href = 'Dashboard65';
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!email || !email.includes('@')) {
      setEmailError('Електронна пошта має бути валідною');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Поле обов\'язкове до заповнення');
      isValid = false;
    } else {
      setPasswordError('');
    }
    


    if (isValid) {
      // Если данные проходят проверку, вы можете отправить их на сервер или выполнить другие действия для входа
      console.log('Дані для входу:');
      console.log('Тип користувача:', role);
      console.log('Електронна пошта:', email);
      console.log('Пароль:', password);


      const userData1 = {
        role,    
        email,
        password,

      };

      let registrationUrl1 = 'http://localhost:80/project1/loginStudent.php';
      if (role === 'teacher') {
        registrationUrl1 = 'http://localhost:80/project1/loginTeacher.php';
      }
  
     
      axios.post(registrationUrl1, userData1)
      .then((response) => {
        if (response.data === "Авторизация успешна.") {
          


          if (role === 'teacher') {
            localStorage.setItem('userEmail', email);
            window.location.href = 'teacher';
          } else {
            localStorage.setItem('userEmail', email);
            window.location.href = 'Dashboard65';
          }
        } else {
          
          console.error(response.data.error);
          
        }
      })
      .catch((error) => {
        
        console.error(error);
        
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        
        <div>
          <Button
            onClick={() => handleUserTypeChange('registration')}
            style={{ marginRight: '10px' }}
          >
            Реєстрація
          </Button>
          <Button onClick={() => handleUserTypeChange('login')}>Увійти</Button>
        </div>
        <Label htmlFor="role">Тип користувача:</Label>
        <Select
          id="role"
          name="role"
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="student">Студент</option>
          <option value="teacher">Викладач</option>
        </Select>
        {userType === 'registration' ? (
          <FormRow>
            <FormColumn>
              <Label htmlFor="name">Ім'я:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ErrorMessage>{nameError}</ErrorMessage>
              <Label htmlFor="surname">Прізвище:</Label>
              <Input
                type="text"
                id="surname"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <ErrorMessage>{surnameError}</ErrorMessage>
              <Label htmlFor="patronymic">По батькові:</Label>
              <Input
                type="text"
                id="patronymic"
                name="patronymic"
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
              />
              <ErrorMessage>{patronymicError}</ErrorMessage>
              <Label htmlFor="phone">Номер телефону:</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <ErrorMessage>{phoneError}</ErrorMessage>
            </FormColumn>
            <FormColumn>
              <Label htmlFor="email">Електронна пошта:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrorMessage>{emailError}</ErrorMessage>

              {role === 'student' && (
                <div>
                  <Label htmlFor="university">Університет:</Label>
                  <Input
                    type="text"
                    id="university"
                    name="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                  <Label htmlFor="specialty">Спеціальність:</Label>
                  <Input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                  <Label htmlFor="group">Група:</Label>
                  <Input
                    type="text"
                    id="group"
                    name="group"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  />
                </div>
              )}
              {role === 'teacher' && (
                <div>
                  <Label htmlFor="workplace">Місце роботи:</Label>
                  <Input
                    type="text"
                    id="workplace"
                    name="workplace"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                  />
                </div>
              )}
                            <Label htmlFor="password">Пароль:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorMessage>{passwordError}</ErrorMessage>
              <Label htmlFor="confirmPassword">Підтвердіть пароль:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ErrorMessage>{confirmPasswordError}</ErrorMessage>
              <PrimaryButton onClick={handleRegistration}>Зареєструватись</PrimaryButton>
            </FormColumn>
          </FormRow>
        ) : (
          <FormColumn>
            <Label htmlFor="email">Електронна пошта:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMessage>{emailError}</ErrorMessage>
            <Label htmlFor="password">Пароль:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage>{passwordError}</ErrorMessage>
            {role === 'teacher' && (
              <div>
                <Label htmlFor="workplace">Місце роботи:</Label>
                <Input
                  type="text"
                  id="workplace"
                  name="workplace"
                  value={workplace}
                  onChange={(e) => setWorkplace(e.target.value)}
                />
              </div>
            )}
            <ForgotPassword href="#">Забули пароль?</ForgotPassword>
            <PrimaryButton onClick={handleLogin}>Увійти</PrimaryButton>
          </FormColumn>
        )}
      </FormContainer>
    </Container>
  );
  }
  
  export default Registration;
  