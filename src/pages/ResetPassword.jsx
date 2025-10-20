import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { myFetch } from '../utils/myFetch'
import Button from '../Components/UI/Button'

//prettier-ignore
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const resetToken = queryParams.get('token');

  const navigate = useNavigate()

  const handleResetPassword = async e => {
    e.preventDefault()
    if (!newPassword) {
      setMessage('Please enter a new password.')
      return
    }
    try {
      const data = await myFetch({url: 'https://localhost:5000/reset-password', method: "POST", data: {token: resetToken, newPassword: newPassword}})
      setMessage(data.message || 'Error resetting password.')
      setTimeout(() => navigate("/"), 2000) 
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleResetPassword}>
      <h3>Reset Password</h3>
      <label htmlFor="password"> Password:
        <input id="password" title="8-16 Characters. English only. 1 Big letter and 1 number atleast." type={!showPassword ? "password" : "text"} name="password" style={{width: "15rem"}} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input__one" pattern="^(?=[A-Za-z0-9]*[A-Z])(?=[A-Za-z0-9]*[0-9])[A-Za-z0-9]{8,16}$" required />
      </label>
      <label htmlFor="showPassword"> {!showPassword ? "Show Password" : "Hide Password"}
        <input type="checkbox" id="showPassword" onClick={() => setShowPassword(prev => !prev)}/>
      </label>
      <Button type="submit"> Reset Password </Button>
      <p>{message}</p>
      <p>{message === 'Password successfully reset.' && 'Redirecting to login page...'}</p>
    </form>
  )
}

export default ResetPassword