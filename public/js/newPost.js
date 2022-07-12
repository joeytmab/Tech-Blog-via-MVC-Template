const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    
  
    if (title && post_content ) {
  
      const response = await fetch(`/api/dashboard`, {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //check if all good
      if (response.ok) {
        document.location.replace('/dashboard');
  
      } else {
        alert('Error creating new post!');
      }
    }
  };

document.querySelector('.newPost-form').addEventListener('submit', newPostHandler);