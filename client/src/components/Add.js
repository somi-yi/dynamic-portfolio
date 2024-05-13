import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";

class AddCommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: "",
            userid: "",
            ip: "",
        };
    }

    saveComment = async (e) => {
        e.preventDefault();
        const { commentContent, userid } = this.state;
        // Assuming you will have some way to know if the user is authenticated
        if (!this.props.isAuthenticated) {
            localStorage.setItem('pendingComment', JSON.stringify({ commentContent, userid }));
            this.props.navigate('/login');
        } else {
            // Add logic to submit the comment here
            // This could be a call to your backend API
            console.log("Submit Comment:", commentContent, userid);
            // After submission, you might want to clear the form or give some feedback
        }
    };

    changeCommentContentHandler = (event) => {
        this.setState({ commentContent: event.target.value });
    };

    changeUseridHandler = (event) => {
        this.setState({ userid: event.target.value });
    };

    render() {
        return (
            <div className='add-comment-container'>
                <h2>Add Comment</h2>
                <form>
                    <div>
                        <label>User ID:</label>
                        <input
                            type="text"
                            value={this.state.userid}
                            onChange={this.changeUseridHandler}
                        />
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={this.state.commentContent}
                            onChange={this.changeCommentContentHandler}
                        ></textarea>
                    </div>
                    <button onClick={this.saveComment}>Submit</button>
                </form>
            </div>
        );
    }
}

export default (props) => <AddCommentComponent {...props} navigate={useNavigate()} />;
