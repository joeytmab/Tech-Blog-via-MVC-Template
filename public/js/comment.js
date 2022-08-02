const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#new-comment").value.trim();

  // Get the current post ID from event target data attribute
  const postId = event.target.getAttribute('data-id');

  // console.log(content);
  console.log(postId);
  
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/dashboard');
      location.reload();
    } else {
      alert("Failed to add comment!");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentFormHandler);