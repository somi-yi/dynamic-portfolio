import { useState, useEffect } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { VerifyLogin } from './Verifylogin';

export const Addcomment = () => {


    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [tags, setTags] = useState([]); // To keep track of tags for the new comment
    const [availableTags, setAvailableTags] = useState(["professional", "insightful", "creative", "smart"]); // Predefined tags
    const navigate = useNavigate();

    useEffect(() => {
        const savedTags = JSON.parse(localStorage.getItem('selectedTags'));
        if (savedTags) {
            setTags(savedTags);
        }
        // Check authentication and retrieve any pending comments
        const checkAuthAndRetrieveComment = async () => {
            const authStatus = await VerifyLogin();
            setIsAuthenticated(authStatus);

            const pendingComment = JSON.parse(localStorage.getItem('pendingComment'));
            if (pendingComment) {
                setComment(pendingComment.comment);
                setRating(pendingComment.rating);
                setTags(pendingComment.tags || []);
            }
        };

        checkAuthAndRetrieveComment();
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedTags', JSON.stringify(tags));
    }, [tags]);


    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleTagSelection = (selectedTag) => {
        setTags(prevTags =>
            prevTags.includes(selectedTag)
                ? prevTags.filter(tag => tag !== selectedTag) // Remove tag if already selected
                : [...prevTags, selectedTag] // Add new tag
        );
    };

    const handleTagCreation = (newTag) => {
        if (newTag && !availableTags.includes(newTag)) {
            setAvailableTags([...availableTags, newTag]);
            handleTagSelection(newTag);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginStatus = await VerifyLogin();

        if (loginStatus.status !== "Logged In") {
            localStorage.setItem('pendingComment', JSON.stringify({ comment, rating, tags }));
            navigate('/login'); // Redirect to login page
        } else {
            submitComment({ comment, rating, tags });
        }
    };

    const submitComment = async ({ comment, rating, tags }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/submit-comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment, rating, tags }),
                credentials: 'include',
            });

            if (response.ok) {
                // Clear the pending comment from local storage after successful submission
                localStorage.removeItem('pendingComment');
                // Set success message
                setSuccessMessage('Your comment has been submitted successfully!');
                // Reset error message
                setErrorMessage('');
            } else {
                // Set error message based on response, if possible
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit the comment.');
                // Reset success message
                setSuccessMessage('');

            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Set error message
            setErrorMessage('An error occurred while submitting your comment.');
            // Reset success message
            setSuccessMessage('');
        }
    };




    return (
        <div className='Addcomment' id="Addcomment">
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white Addcomment-form ">
                <div>
                    <label htmlFor="comment" className="form-label">Your Comment</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What are your thoughts?"
                    ></textarea>
                </div>
                <div >
                    <label className="form-label d-block">Rating</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarFill
                                key={star}
                                onClick={() => handleStarClick(star)}
                                color={star <= rating ? "#ffc107" : "#e4e5e9"}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="form-label d-block">Tags</label>
                    <div className="tags-input">
                        {availableTags.map(tag => (
                            <button
                                type="button"
                                key={tag}
                                onClick={() => handleTagSelection(tag)}
                                className={`tag-button ${tags.includes(tag) ? 'selected' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                        <input
                            className="tags-input-empty"
                            type="text"
                            onBlur={(e) => handleTagCreation(e.target.value.trim())}
                            placeholder="Create a tag" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary Submit-button">Submit</button>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </form>
        </div >
    );
}