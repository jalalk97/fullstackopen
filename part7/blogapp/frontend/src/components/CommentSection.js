const CommentSection = ({ blog }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
