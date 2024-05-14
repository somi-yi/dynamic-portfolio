import React from 'react';
import { motion } from 'framer-motion';


export const ProjectsCard = ({ title, description, imgUrl, index, gitUrl, previewUrl }) => {
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 2,
                delay: index * 0.3  
            }
        }
    };

    return (
 
        <motion.div
            
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            style={{ marginBottom: '20px' }}
        >
            <div className="proj-imgbx" >
                <img src={imgUrl} alt={title} />        
                <div className="proj-txtx">
                    <h4>{title}</h4>
                   <a href={gitUrl} target="_blank" rel="noopener noreferrer">
                        <h5>gitUrl</h5>
                    </a>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                        <h5>previewUrl</h5> 
                    </a>
                </div>
                    
             </div>
                <div>
              
                    <h5 className="text-xl font-semibold mb-2">{title}</h5>
                    <span className="text-[#ADB7BE]">{description}</span>
                </div> 
            
        </motion.div>

    );
};
