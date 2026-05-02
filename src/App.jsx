import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage        from './pages/Home/HomePage'
import LoginPage       from './pages/Login/LoginPage'
import AlbumPage       from './pages/Album/AlbumPage'
import ExplorePage     from './pages/Explore/ExplorePage'
import UserPage        from './pages/User/UserPage'
import EditProfilePage from './pages/EditProfile/EditProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<HomePage />}        />
        <Route path="/login"               element={<LoginPage />}       />
        <Route path="/album/:id"           element={<AlbumPage />}       />
        <Route path="/explorar"            element={<ExplorePage />}     />
        <Route path="/usuario/:handle"     element={<UserPage />}        />
        <Route path="/usuario/editar"      element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
