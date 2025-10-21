import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProviderItems, UserProviderUser, UserProviderUsers, UserProviderUi } from './context/index.js'
import Layout from './context/Layout.jsx'
import Navbar from './Components/UI/Navbar.jsx'
import Sidebar from './Components/UI/Sidebar.jsx'
import ProductList from './pages/ProductList.jsx'
import MyCart from './pages/MyCart.jsx'
import Chat from './pages/Chat.jsx'
import Home from './pages/Home.jsx'
import UserPage from './pages/UserPage.jsx'
import Error404 from './pages/404.jsx'
import ItemPage from './pages/ItemPage.jsx'

import AuthRedirect from './Components/UI/AuthRedirect.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const CoffeeCalc = React.lazy(() => import('./pages/CoffeeCalc.jsx'))
const CoffeeWorld = React.lazy(() => import('./pages/CoffeeWorld.jsx'))

// prettier-ignore
function App() {

  return (
    <Router> 
      <UserProviderUi>
        <UserProviderUser >
          <UserProviderItems>
            <UserProviderUsers>
              <> 
                <Navbar />
                <Sidebar />
              </> 
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={ <AuthRedirect /> } />
                  <Route exact path="/reset-password" element={ <ResetPassword /> } />
                  <Route exact path="*" element={ <Error404 /> } />
                    <Route element={ <Layout /> }>
                      <Route exact path="/users/:user" element={ <UserPage />} />
                      <Route exact path="/items/:id" element={ <ItemPage />} />
                      <Route exact path="/Home" element={ <Home /> } />
                      <Route exact path="/ProductList" element={ <ProductList /> } />
                      <Route exact path="/MyCart" element={ <MyCart /> } />
                      <Route exact path="/CoffeeCalc" element={ <CoffeeCalc /> } />
                      <Route exact path="/Chat" element={ <Chat /> } />
                      <Route exact path="/CoffeeWorld" element={ <CoffeeWorld /> }/>
                    </Route> 
                </Routes>
              </Suspense>
            </UserProviderUsers>
          </UserProviderItems>
        </UserProviderUser>
      </UserProviderUi>
    </Router>
  );
}

export default App