import cx from 'classnames';
import { Component } from "react";

export default class LikeDislike extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likeCount: 100,
            dislikeCount: 25,
            liked: false,
            disliked: false,
        };
    }

    likeAction() {
        const notLikedAndNotDisliked = !this.state.liked && !this.state.disliked;
        const liked = this.state.liked;
        const disliked = this.state.disliked;

        if (liked) {
            this.setState({
                ...this.state,
                likeCount: this.state.likeCount - 1,
                liked: false,
            });
        } else if (notLikedAndNotDisliked) {
            this.setState({
                ...this.state,
                likeCount: this.state.likeCount + 1,
                liked: true,
            });
        } else if (disliked) {
            this.setState({
                ...this.state,
                likeCount: this.state.likeCount + 1,
                dislikeCount: this.state.dislikeCount - 1,
                liked: true,
                disliked: false,
            });
        }
    }

    dislikeAction() {
        const notLikedAndNotDisliked = !this.state.liked && !this.state.disliked;
        const liked = this.state.liked;
        const disliked = this.state.disliked;
        if (disliked) {
            this.setState({
                ...this.state,
                dislikeCount: this.state.dislikeCount - 1,
                disliked: false,
            });
        } else if (notLikedAndNotDisliked) {
            this.setState({
                ...this.state,
                dislikeCount: this.state.dislikeCount + 1,
                disliked: true,
            });
        } else if (liked) {
            this.setState({
                ...this.state,
                likeCount: this.state.likeCount - 1,
                dislikeCount: this.state.dislikeCount + 1,
                liked: false,
                disliked: true,
            });
        }
    }

    render() {
        const { likeCount, dislikeCount, liked, disliked } = this.state;
        const likesCounter = cx({ ["like-button"]: true, ['liked']: liked })
        const dislikesCounter = cx({ ["dislike-button"]: true, ['disliked']: disliked })

        return (
            <>
                <div>
                    <button
                        id="likeButton"
                        onClick={this.likeAction.bind(this)}
                        className={likesCounter}
                    >
                        Like | <span className='likes-counter'>{likeCount}</span>
                    </button>
                    <button
                        id="dislikeButton"
                        onClick={this.dislikeAction.bind(this)}
                        className={dislikesCounter}
                    >
                        Dislike | <span className='dislikes-counter'>{dislikeCount}</span>
                    </button>
                </div>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color: #585858;
                        border: 1px solid #BDBDBD;
                        border-radius: 0;
                        margin: 0 4px 0 0;
                    }

                    .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color: #585858;
                        border: 1px solid #BDBDBD;
                        border-radius: 0;
                    }

                    .likes-counter {
                        margin: 4px 0;
                    }

                    .dislikes-counter {
                        margin: 4px 0;
                    }

                    .liked {
                        font-weight: bold;
                        color: #1565c0;
                        font-weight: 700;
                    }

                    .disliked {
                        font-weight: bold;
                        color: #1565c0;
                        font-weight: 700;
                    }
                `}</style>
            </>
        );
    }
}
