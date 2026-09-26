import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postUser(inputs);
      console.log('Register result:', registerResult);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
