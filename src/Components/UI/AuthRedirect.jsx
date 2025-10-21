import { useUserData } from '../../context'
import Hero from '../../pages/Hero';
import Home from '../../pages/Home';

const AuthRedirect = () => {
  const { loggedIn } = useUserData();
  return loggedIn ? <Home /> : <Hero />;
};

export default AuthRedirect;