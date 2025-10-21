import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { myFetch } from '../../utils/myFetch'
import { useUserData } from '../../context/'
import styles from './login.module.css'
import Button from '../UI/Button'
import Svgs from '../../svg/Svgs'

// prettier-ignore
const Login = ({ setLoggedIn }) => {
  const [isOnLogin, setIsOnLogin] = useState(true); // login <=> signup
  const [formInputs, setFormInputs] = useState({ user: '', password: '', email: '', verificationCode: '' });
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUserData();
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsOnLogin(prevIsLogin => !prevIsLogin);
    setFormInputs({ user: '', password: '', email: '', verificationCode: '' });
    setIsCodeSent(false);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prevData => ({ ...prevData, [name]: value }));
  };

  const handleIsForgotPassword = () => {
    setIsForgotPassword(prev => !prev);
    setMessage('')
  };

  const regexUsername = /^[A-Za-z0-9]{3,16}$/;  
  const regexPassword = /^(?=[A-Za-z0-9]*[A-Z])(?=[A-Za-z0-9]*[0-9])[A-Za-z0-9]{8,16}$/; 

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { user, password } = formInputs;
    if (!regexUsername.test(user) || !regexPassword.test(password)) {
      setMessage("Invalid Fields");
      return;
    }

    const userObjectToFetch = { user, password };
    const data = await myFetch({ url: "https://localhost:5000/login", method: "POST", data: userObjectToFetch })
    if (data.message) {
      setMessage(data.message); return
    } 
    
    const userData = await myFetch({ url: `https://localhost:5000/user/${data._id}` })
    if (userData.message) {
      setMessage(userData.message); return
    } 
    
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('lastActivityTime', Date.now().toString());
    setMessage('');
    navigate("/Home");
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { user, password, email } = formInputs;
    if (!regexUsername.test(user) || !regexPassword.test(password) || !email.trim()) {
      setMessage("All fields are required"); return
    }

    setMessage("Awaiting Server...")
    const userObjectToFetch = { user, password, email };
    const userObject = await myFetch({ url: "https://localhost:5000/register", method: "POST", data: userObjectToFetch })
    if (userObject.message) {
      setMessage(userObject.message); return
    }

    setIsCodeSent(true); 
    setMessage("Please enter the verification code sent to your email.");
  };

  const handleVerifyCode = async () => {
    const { email, verificationCode, password, user } = formInputs;
    if (!verificationCode.trim() || !regexUsername.test(user) || !regexPassword.test(password) || !email.trim()) {
      setMessage("Verification code is required."); return
    }
    
    const userToVerify = { email, verificationCode, password, user }
    const data = await myFetch({ url: 'https://localhost:5000/verify', method: 'POST', data: userToVerify })
    if (data.message) {
      setMessage(data.message); return
    } 

    setIsCodeSent(false);
    const userData = await myFetch({ url: `https://localhost:5000/user/${data._id}` })
    if (userData.message) {
      setMessage(userData.message); return
    }
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('lastActivityTime', Date.now().toString());
    setMessage('');
    navigate('/Home');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('Awaiting server...');
    const { email } = formInputs

    if (!email.trim()) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      const data = await myFetch({ url: 'https://localhost:5000/forgot-password', method: 'POST', data: { email } })
      if (data.message) {
        setMessage(data.message || 'Something went wrong. Please try again.'); return
      } 

      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  let nameInputClassName = 'input__one';
  let passwordInputClassName = 'input__one';
  if (regexUsername.test(formInputs.user)) nameInputClassName += ` validInput`;
  else if (formInputs.user.length !== 0) nameInputClassName += ` invalidInput`;
  if (regexPassword.test(formInputs.password)) passwordInputClassName += ` validInput`;
  else if (formInputs.password.length !== 0) passwordInputClassName += ` invalidInput`;

  return (
      <form onSubmit={isForgotPassword ? handleForgotPassword : !isOnLogin ? handleSubmitRegister : handleSubmitLogin}>

        {isCodeSent ? 
          <div className={styles.inputAndLabel__wrapper}>
            <input aria-label='verification code' type='text' name='verificationCode' value={formInputs.verificationCode} onChange={handleInputChange} className='input__one' required />
            <label> Verification Code: </label>
            <Button type='button' handler={handleVerifyCode}>Verify Code</Button>
          </div>
    
          :

          !isForgotPassword ?

            <>
              <div className={styles.inputAndLabel__wrapper}>
                <input aria-label='username' title='3-16 Characters. English only.' type='text' name='user' value={formInputs.user} onChange={handleInputChange} className={nameInputClassName} pattern={regexUsername.toString().slice(1, -1)} placeholder='Enter Username ' required autoFocus/>
                <label> Username: </label>
              </div>
              <div className={styles.inputAndLabel__wrapper}>
                <input aria-label='password' title='8-16 Characters. English only. 1 Big letter and 1 number atleast.' type={!showPassword ? 'password' : 'text'} name='password' value={formInputs.password} onChange={handleInputChange} className={passwordInputClassName} pattern={regexPassword.toString().slice(1, -1)} placeholder='Enter Password' required />
                <label> Password: </label>
              </div>
              <span onClick={() => setShowPassword(prev => !prev)} style={{ display:'inline-block', width:'2.4rem', position:'relative', top:'0.4rem'}}> { showPassword ? <Svgs name='show-password'/> : <Svgs name='hide-password'/> }</span>
              {!isOnLogin && (
                <div className={styles.inputAndLabel__wrapper}>
                  <input aria-label='Email' type='email' name='email' value={formInputs.email} onChange={handleInputChange} className='input__one' placeholder='Enter Email' required />
                  <label> Email: </label>
                </div>
              )}
            </> 

            :

            <div className={styles.inputAndLabel__wrapper}>
              <input aria-label='Email' type='email' name='email' value={formInputs.email} onChange={handleInputChange} className='input__one' placeholder='Enter Email' required />
              <label> Enter Email: </label>
            </div>
        }  
      
        {!isCodeSent && <Button type='submit' >{isForgotPassword ? 'Reset Password' : isOnLogin ? 'Login' : 'Sign Up'}</Button >}

        <p style={{ color: 'red' }}>{message}</p>

        {!isForgotPassword && 
          <p>
            {isOnLogin ? "Don't have an account? " : 'Already have an account? '}
            <span className={styles.underline} onClick={handleToggleForm}> {isOnLogin ? 'Sign-up' : 'Login'} </span>
          </p>
        }
        <span className={styles.underline} onClick={handleIsForgotPassword}>{!isForgotPassword ? 'Forgot password?' : 'Back to login'}</span>
        <div>{message}</div>
        <hr/>
      </form>
  );
};

export default Login