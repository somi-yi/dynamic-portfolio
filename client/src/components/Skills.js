import React, { useState, useEffect, useRef }  from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TrackVisibility from 'react-on-screen';
import html from "../assets/img/html.png"
import css from "../assets/img/css.png"
import javascript from "../assets/img/javascript.png"
import tailwind from "../assets/img/tailwind.png"
import materialui from "../assets/img/material-ui.png"
import react from "../assets/img/react.png"
import bootstrap from "../assets/img/bootstrap.png"
import git from "../assets/img/git.png"
import github from "../assets/img/github.png"
import gitlab from "../assets/img/gitlab.png"
import vscode from "../assets/img/vscode.png"
import fullstack from "../assets/img/fullstack.png"
import python from "../assets/img/python.png"
import flask from "../assets/img/flask.png"
import java from "../assets/img/java.png"
import typescript from "../assets/img/typescript.png"
import mongodb from "../assets/img/mongodb.png"
import postger from "../assets/img/postger.png"
import mysql from "../assets/img/mysql.png"
import nodejs from "../assets/img/nodejs.png"
import dbbrowser from "../assets/img/dbbrowser.png"
import postman from "../assets/img/postman.png"
import powerbi from "../assets/img/powerbi.png"


const setupIcons = () => {
    const icons = [
    { id: 1,icon: <img src={html} alt="HTML Icon" />, label: 'HTML', quadrant: 3, radius: 180,orbit: 1},
    { id: 2, icon: <img src={css} alt="Css Icon" />, label: 'CSS', quadrant: 3, radius: 200 ,orbit:2 },
    { id: 3, icon: <img src={javascript} alt="Javascript Icon" />, label: 'JavaScript', quadrant: 3, radius: 250 ,orbit:2 },
    { id: 4, icon: <img src={react} alt="React Icon" />, label: 'React JS', quadrant: 3, radius: 400 ,orbit:2 },
    { id: 5, icon: <img src={tailwind} alt="Tailwind Icon" />, label: 'Tailwind', quadrant: 3, radius: 350 ,orbit:3},
    { id: 6, icon: <img src={bootstrap} alt="Bootrap Icon" />, label: 'Bootstrap', quadrant: 3, radius: 500 ,orbit:3},
    { id: 7, icon: <img src={materialui} alt="Materialui Icon" />, label: 'Material UI', quadrant: 3, radius: 500 ,orbit:3},
    
    { id: 8, icon: <img src={python} alt="Python Icon" />, label: 'Python', quadrant: 4, radius: 180 ,orbit: 1},
    { id: 9, icon: <img src={java} alt="Java Icon" />, label: 'Java', quadrant: 4, radius: 350, orbit: 2 },
    { id: 11, icon: <img src={nodejs} alt="Nodejs Icon" />, label: 'Node.js', quadrant: 4, radius: 500 ,orbit: 2},
    { id: 10, icon: <img src={flask} alt="Flask Icon" />, label: 'Flask', quadrant: 4, radius: 400 ,orbit: 2},
    { id: 12, icon: <img src={typescript} alt="Typescript Icon" />, label: 'Typescript', quadrant: 4, radius: 400 ,orbit: 3},


    { id: 13, icon: <img src={mongodb} alt="Mongodb Icon" />, label: 'MongoDB', quadrant: 2, radius: 180 ,orbit: 1},
    { id: 14, icon: <img src={mysql} alt="Mysql Icon" />, label: 'MySQL', quadrant: 2, radius: 180,orbit: 2 },
    { id: 15, icon: <img src={dbbrowser} alt="DB Browser Icon" />, label: 'DB Browser', quadrant: 2, radius: 500,orbit: 2 },
    { id: 16, icon: <img src={postger} alt="PostgerSQL Icon" />, label: 'PostgerSQL', quadrant: 2, radius: 500, orbit: 2 },
    { id: 17, icon: <img src={powerbi} alt="PowerBI Icon" />, label: 'Power BI', quadrant: 2, radius: 550, orbit: 3 },
    
    { id: 18, icon: <img src={vscode} alt="Vscode Icon" />, label: 'VS Code', quadrant: 1, radius: 180 ,orbit: 1},
    { id: 19, icon: <img src={gitlab} alt="Gitlab Icon" />, label: 'GitLab', quadrant: 1, radius: 300 ,orbit: 2},
    { id: 20, icon: <img src={github} alt="Github Icon" />, label: 'GitHub', quadrant: 1, radius: 400,orbit: 2 },
    { id: 21, icon: <img src={git} alt="Git Icon" />, label: 'Git', quadrant: 1, radius: 400 ,orbit: 2},
    { id: 22, icon: <img src={postman} alt="Postman Icon" />, label: 'Postman', quadrant: 1, radius: 500, orbit: 3 },
    
  
  ];

    const orbits = [
        { a: 150, b: 100 }, // Smallest ellipse
        { a: 350, b: 200 }, // Middle ellipse
        { a: 500, b: 300 }  // Largest ellipse
    ];

   return icons.map(icon => {
        // Determine the ellipse for this icon based on its 'orbit' property
        if (!orbits[icon.orbit - 1]) {
            console.error(`Invalid orbit value for icon with ID ${icon.id}:`, icon);
            return icon; // 返回未修改的 icon 或处理错误
     }
     
        const extraAngle = icon.orbit === 1 ? 20 : 0;
        const { a, b } = orbits[icon.orbit - 1];
        const iconsInSameOrbitAndQuadrant = icons.filter(i => i.quadrant === icon.quadrant && i.orbit === icon.orbit);
        const angleStep = 90 / iconsInSameOrbitAndQuadrant.length;
        
        // 每个象限的起始角度偏移5度，避免落在轴上
        const angleOffset = 15;
        const startAngle = (icon.quadrant - 1) * 90 + angleOffset+ extraAngle;
        const angle = startAngle + iconsInSameOrbitAndQuadrant.indexOf(icon) * angleStep;
        const radians = angle * Math.PI / 180;

        icon.x = a * Math.cos(radians);
        icon.y = b * Math.sin(radians);
        return icon;
    });
};


export const Skills = () => {
    const controls = useAnimation();
    const [icons] = useState(setupIcons());

    const startAnimation = () => {
        controls.start(i => ({
            x: icons[i].x,
            y: icons[i].y,
            transition: { duration: 1, ease: "easeOut" }
        }));
    };

    const whileHover = { scale: 1.1, rotate: 5, transition: { duration: 0.5 } };
    const whileTap = { scale: 0.9, rotate: -5, transition: { duration: 0.5 } };

    return (
        <section id="skills" className="skill">
            < div className="icon-container" >
                    <div className="quadrant-text" style={{ top: 0, left: '25%', transform: 'translate(-50%, 0)' }}>FRONT-END DEV</div>
                    <div className="quadrant-text" style={{ top: 0, right: '25%', transform: 'translate(50%, 0)' }}>BACK-END DEV</div>

                    <div className="quadrant-text" style={{ bottom: 0, left: '25%', transform: 'translate(-50%, 0)' }}>DATABASE</div>
                <div className="quadrant-text" style={{ bottom: 0, right: '25%', transform: 'translate(50%, 0)' }}>DEVOPS & TOOLS</div>
                  
                    <motion.div
                        className="ellipse"
                        animate={{ scale: 1 }} 
                    />
                    <div className="ellipse ellipse1"></div>
                    <div className="ellipse ellipse2"></div>
                    <div className="ellipse ellipse3"></div>
                    <div className="ellipse ellipse4"></div>
                    <div className="ellipse ellipse5"></div>
                    <div className="ellipse ellipse6"></div>
                    <div className="axis-x"></div>
                    <div className="axis-y"></div>
                        

            
            <div className="center-icon">
                <img src={fullstack} alt="fullstack Icon" />
                <p>Full Stack</p>
            </div>
          
           <TrackVisibility partialVisibility>
                {({ isVisible }) => {
                    if (isVisible) {
                        controls.set(i => ({
                                x: 0,
                                y: 0
                            }));
                            startAnimation();
                        }
                    return (
                        <div>
                        {icons.map((icon, index) => (
                                    <motion.div
                                        key={icon.id}
                                        initial={{ 
                                            x: 0,
                                            y: 0,
                                            scale: 0.8 // Start smaller
                                        }}
                                        animate={controls}
                                        custom={index}
                                        whileHover={whileHover}
                                        whileTap={whileTap}
                                        className="icon"
                                        style={{
                                            position: 'absolute',
                                            left: '50%', // Center the div in the container
                                            top: '50%', // Center the div in the container
                                            translateX: '-50%', // Offset for centering
                                            translateY: '-50%' // Offset for centering
                                        }}
                                    >
                                        {icon.icon}
                                        <p>{icon.label}</p>
                                    </motion.div>
                        ))}
                        </div>
                    );
                }}                
                </TrackVisibility>
            </div>
        </section>
    );
};
