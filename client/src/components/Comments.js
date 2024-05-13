import { useState, useEffect } from 'react';
import { Commentable } from './Commentable';
import { Addcomment } from './Addcomment';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


export const Comments = () => {
    
    return (
    <Container id="comments">      
        
    <Commentable />   
    <Addcomment />
            
    </Container>
    );
   
};