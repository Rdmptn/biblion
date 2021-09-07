import { format, render, cancel, register } from '../../node_modules/timeago.js/dist/timeago.min';

export const SmallPost = (post) => {
  
  return (
    
    <div class="card border-success mb-3 text-white bg-dark small-post-card">
      <div class="row g-0">
        <div class="col-sm-3 book-cover-holder">
          <img src={post.cover_url} class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">{post.title} by {post.author} — <i>{post.topic}</i></h5>
            <h6 class="card-title">Posted By: <img src={post.image} width="24px"/> {post.name} — {format(post.created_at)}</h6>
              {post.summary.length < 200 ? <p class="card-text">{post.summary}</p> : <p class="card-text">{post.summary.slice(0,200)}...</p>}
              {post.opinion.length < 100 ? <p class="card-text">{post.opinion}</p> : <p class="card-text">{post.opinion.slice(0,100)}...</p>}
            <a href={`/Posts/${post.id}`} class="btn btn-success">View Post Details</a>
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

export default SmallPost;



// For adding comment/like counts to right side of small post if time permits

 // <div class="col-sm-1">
          // <div class="card-body">
            // <h5 class="card-title"></h5>
          // </div>
        // </div>