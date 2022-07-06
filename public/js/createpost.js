//create new post form (POST METHOD)
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const postText = document.querySelector('#post-text').value.trim();
    
  
    if (title && postText ) {

      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, postText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');

      } else {
        alert('Error creating new post!');
      }
    }
  };

  //edit post form (NEED PUT METHOD.)
  const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const postText = document.querySelector('#post-text').value.trim();
    const postId = event.target.getAttribute('#post-id');

    if (title && postText ) {

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ postID, title, postText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');

      } else {
        alert('Error creating new post!');
      }
    }    
  }
  
  //delete post
  //via DELETE METHOD
  const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  //document.query selectors, one for creating, editing, and deleting post 
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

  document.querySelector('.edit-form-btn').addEventListener('submit', editPostHandler)
  
  document.querySelector('.delete-form-btn').addEventListener('click', deletePostHandler);