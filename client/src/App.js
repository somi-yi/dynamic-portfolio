import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import Contact from './components/Contact';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Comments } from './components/Comments';
import { Commentable } from './components/Commentable';
import { Addcomment } from './components/Addcomment';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


function App() {

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={
              <>
                <Banner />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/comments" element={<Comments />} />
            <Route path="/Addcomment" element={<Addcomment />} />
            <Route path="/Commentable" element={<Commentable />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;