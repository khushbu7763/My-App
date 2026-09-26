import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showRegister ? <RegisterForm /> : <LoginForm />}

      <button type="button" onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? 'Back to Login' : 'Create Account'}
      </button>
    </>
  );
};

export default Login;
