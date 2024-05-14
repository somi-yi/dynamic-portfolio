import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { ProjectsCard } from "./ProjectsCard";
import ProjectTag from "./ProjectTag";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import projImg6 from "../assets/img/project-img6.png";
import 'animate.css';

export const Projects = () => {

    const projects = [

        {
            id: 1,
            title: "Dynamic Portflio",
            description: "Showcasing design and development skills",
            imgUrl: projImg1,
            tag: ["All", "Web"],
            gitUrl: "https://github.com/somi-yi/dynamic-portfolio.git",
            previewUrl: "/",
        },
        {
            id: 2,
            title: "FullStack E-Commence Dashboard",
            description: "Display and analyse transaction data",
            imgUrl: projImg2,
            tag: ["All", "Web"],
            gitUrl: "https://github.com/somi-yi/full-stack-e-commence-dashboard.git",
            previewUrl: "https://e-commence-dashboard-frontend.onrender.com",
        },
        {
            id: 3,
            title: "Assessments Mangement",
            description: "CRUD operation for assessments",
            imgUrl: projImg3,
            tag: ["All", "Web"],
            gitUrl: "/",
            previewUrl: "/",
        },
        {
            id: 4,
            title: "To-do list",
            description: "Design& Development",
            imgUrl: projImg4,
            tag: ["All", "Web"],
            gitUrl: "/",
            previewUrl: "/",
        },
        {
            id: 5,
            title: "Heathy Eating Game Applocation",
            description: "My dissertation project is in process",
            imgUrl: projImg5,
            tag: ["All", "Mobile"],
            gitUrl: "/",
            previewUrl: "/",
        },
       {
            id: 6,
            title: "Weather Application",
            description: "In process",
            imgUrl: projImg6,
            tag: ["All", "Mobile"],
            gitUrl: "/",
            previewUrl: "/",
        },
       
    ];
    
   const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 2
            }
        }
    };
     
    const [tag, setTag] = useState("All");

    const filteredProjects = projects.filter((project) =>
        tag === "All" ? true : project.tag.includes(tag)
    );

    const handleTagChange = (newTag) => {
    setTag(newTag);
    };



    return (
        <section className="project" id="projects" >
            <Container>
                <Row>
                    <Col>
                        <div>

                            <h2>Projects</h2>
                            <p>Embarking on a journey of transformation, I transitioned my career path to focus on programming and software development. This pivot was driven by a fascination with technology and its limitless possibilities. </p>
                            <Tab.Container id="projects-tabs" defaultActiveKey="All" className="mt-5" >
                                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="All" onClick={() => handleTagChange("All")}>All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Web" onClick={() => handleTagChange("Web")}>Web</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Mobile" onClick={() => handleTagChange("Mobile")}>Mobile</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content id="slideInUp" >
                        
                                    <Tab.Pane eventKey="All">
                                        <Row >
                                            {filteredProjects.map((project, index) => (
                                                <Col xs={12} sm={6} md={4} key={project.id}>
                                                    <ProjectsCard key={project.id} index={index} {...project} />
                                                </Col>
                                             ))}
                                        </Row> 
                                    </Tab.Pane> 
                                    <Tab.Pane eventKey="Web">
                                        <Row>
                                             {filteredProjects.map((project, index) => (
                                                <Col xs={12} sm={6} md={4} key={project.id}>
                                                    <ProjectsCard key={project.id} index={index} {...project} />
                                                </Col>
                                             ))}
                                        </Row> 
                                    </Tab.Pane> 
                                    <Tab.Pane eventKey="Mobile">
                                        <Row >
                                             {filteredProjects.map((project, index) => (
                                                <Col xs={12} sm={6} md={4} key={project.id}>
                                                    <ProjectsCard key={project.id} index={index} {...project} />
                                                </Col>
                                             ))}
                                        </Row> 
                                    </Tab.Pane> 
                                    
                                </Tab.Content>
                            </Tab.Container> 

                        </div>
                    </Col>
                    
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )

}