import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useAuthentication} from '../hooks/apiHooks';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs);

      console.log('Login result:', loginResult);

      localStorage.setItem('token', loginResult.token);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
