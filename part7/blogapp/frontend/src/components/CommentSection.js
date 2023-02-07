import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";

const CommentSection = ({ blog }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    if (blog.comments.some((c) => c === comment)) {
      dispatch(notify("Someone has already posted this comment", "alert"));
    } else {
      dispatch(postComment({ id: blog.id, comment }));
      dispatch(notify(`comment '${comment}' posted`));
    }
    setComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
