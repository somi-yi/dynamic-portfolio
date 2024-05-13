import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { Newsletter } from "./Newsletter";

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                   <Newsletter></Newsletter>
                    <Col size={12} sm={6}>
                        <h1 className="home-logo">Somi Yi</h1>
                    </Col>
                    <Col size={12} sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/qin-yi-bbaa412a5/"><img src={navIcon1} alt="Icon" /></a>
                            <a href="https://www.facebook.com/profile.php?id=100088658677316"><img src={navIcon2} alt="Icon" /></a>
                            <a href="https://www.instagram.com/somiyiya/"><img src={navIcon3} alt="Icon" /></a>
                        </div>
                        <p>Copyright 2024. All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}