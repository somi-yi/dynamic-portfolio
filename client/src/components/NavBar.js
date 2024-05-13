import { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from '../assets/img/logo.GIF';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export const NavBar = ({ isHidden }) => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const data = ["Example 1", "Example 2", "Example 3", "..."];
    const { isLoggedIn, logout } = useContext(AuthContext); 

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    };

    const onLoginClick = () => {
        navigate('/login'); 
    };

    const navbarClass = isHidden ? 'full-navbar-hidden' : '';

    const handleLoginLogoutClick = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
                    method: 'GET', 
                    credentials: 'include', // include cookies
                });
                if (response.ok) {
                    logout();  // Update context or state to reflect logged out status
                    navigate('/');  // Navigate user to home or login page
                } else {
                    console.error("Logout failed: ", response);
                }
            } catch (error) {
                console.error("Failed to logout: ", error);
            }
        } else {
            navigate('/login');  // Navigate to login page
        }
    };

    
    return (

        <Navbar expand="lg" className={`${scrolled ? "scrolled" : ""} ${navbarClass}`} >
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={HashLink} smooth to="/#home" onClick={() => onUpdateActiveLink('home')} className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}>Home</Nav.Link>
                        {/* <Nav.Link as={HashLink} smooth to="/#skills" onClick={() => onUpdateActiveLink('skills')} className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}>Skills</Nav.Link> */}
                        <Nav.Link as={HashLink} smooth to="/#projects" onClick={() => onUpdateActiveLink('projects')} className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}>Projects</Nav.Link>
                        {/* <Nav.Link as={HashLink} smooth to="/#connect" onClick={() => onUpdateActiveLink('connect')} className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'}>Contact</Nav.Link>
                        <Nav.Link as={HashLink} smooth to="/#newsletter" onClick={() => onUpdateActiveLink('newsletter')} className={activeLink === 'newsletter' ? 'active navbar-link' : 'navbar-link'}>Subscribe</Nav.Link> */}
                        <Nav.Link as={HashLink} to="/comments" onClick={() => onUpdateActiveLink('comments')} className={activeLink === 'comments' ? 'active navbar-link' : 'navbar-link'}>Comments</Nav.Link>

                    </Nav>
                    <Nav className="ms-auto">
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/qin-yi-bbaa412a5/"><img src={navIcon1} alt="" /></a>
                            <a href="https://www.facebook.com/profile.php?id=100088658677316"><img src={navIcon2} alt="" /></a>
                            <a href="https://www.instagram.com/somiyiya/"><img src={navIcon3} alt="" /></a>
                        </div>
                        <Button onClick={handleLoginLogoutClick} variant="outline-light" className="vvd">
                            <span>{isLoggedIn ? 'Log Out' : 'Log In'}</span>
                        </Button>
                    </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
