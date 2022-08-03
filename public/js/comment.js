const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#new-comment").value.trim();

  // event target data attribute gives us the post id target
  const postId = event.target.getAttribute('data-id');

  
  console.log(postId);
  
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
      headers: { 
        'Content-Type': 'application/json' 
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to add comment!");
    }
  }
};

document.querySelector(".comment-form").addEventListener("submit", newCommentFormHandler);