import React, { useEffect, useState } from "react";
import { StarFill } from 'react-bootstrap-icons';

export const Commentable = () => {
    const [comments, setComments] = useState([]);
    const [totalRatings, setTotalRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [tagSummary, setTagSummary] = useState({}); 

    // Fetch comments from the backend
    const fetchComments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-comments`);
            const data = await response.json();
            setComments(data.comments);
            calculateRatings(data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const fetchTagSummary = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/tag-summary`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            
            const sortedTags = Object.entries(data).sort((a, b) => b[1] - a[1]);
            const sortedTagSummary = Object.fromEntries(sortedTags);  
            
            setTagSummary(sortedTagSummary);
        } catch (error) {
            console.error("Error fetching tag summary:", error);
        }
    };

    const calculateRatings = (comments) => {
        let total = 0;
        comments.forEach(comment => {
            total += comment.rating;
        });
        setTotalRatings(comments.length); // Update total ratings count
        setAverageRating(comments.length > 0 ? total / comments.length : 0); // Update average rating
    };

    // Use useEffect to call fetchComments on component mount
    useEffect(() => {
        fetchComments();
        fetchTagSummary();
    }, []);


    useEffect(() => {
        fetchTagSummary().then(data => {
            if (data) {
                setTagSummary(data);
            }
        });
    }, []);

    return (
        <div className="commentable-container">
            <div className="ratings-summary">
                <div className="total-ratings">
                    <span style={{ fontWeight: 'bold', color: '#0dd4c3' }} >Wow !</span> Rated <span style={{ fontWeight: 'bold', fontSize: '50px', color: '#0dd4c3' }}>{totalRatings}</span> Times !
                </div>
                <div className="average-rating">
                    Average Rating:
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <StarFill key={index} color={index < averageRating ? "#ffc107" : "#e4e5e9"} />
                    ))}
                </div>
            </div>
            <div className="tag-summary"style={{ fontSize: '1.0em' }}>
                {Object.entries(tagSummary).map(([tag, count]) => (
                    <span key={tag} className="tag-count">
                        <span className="tag-summary-button">{tag}</span> mentioned <span style={{ fontWeight: 'bold', fontSize: '60px', color: '#0dd4c3' }}>{count}</span>times !
                    </span>
                ))}
            </div>

            {comments.map((comment) => (
                <div className="card" key={comment.id}>
                    <div className="card-body">
                        <h5 className="card-title">
                            {comment.username}
                            <small className="text-muted"> ({comment.role})</small>
                        </h5>
                        <p className="card-text" style={{ fontSize: '1.1em' }} >{comment.content}</p>
                        <div className="comment-tags">
                            {comment.tags && comment.tags.map((tag, index) => (
                                <span key={index} className="comment-tag" style={{ fontSize: '1.0em' }}>{tag}</span>
                            ))}
                        </div>
                        <div className="comment-metadata">
                            <span className="rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarFill
                                        key={star}
                                        color={star <= comment.rating ? "#ffc107" : "#e4e5e9"}
                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                    />
                                ))}
                            </span>
                            <span className="timestamp" >
                                {new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};