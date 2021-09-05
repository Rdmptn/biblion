export const SmallPost = (post) => {
  
  return (
    
    <div class="card border-success mb-3 text-white bg-dark small-post-card">
      <div class="row g-0">
        <div class="col-sm-3 book-cover-holder">
          <img src={post.cover_url} class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">{post.title} by {post.author}</h5>
            <h6 class="card-title">Posted By: {post.name}</h6>
            <p class="card-text">{post.summary}</p>
            <p class="card-text">{post.opinion}</p>
            <a href={`/Posts/${post.id}`} class="btn btn-outline-success">View Post Details</a>
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

export default SmallPost;
