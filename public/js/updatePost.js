// handle event to update the post
const updateFormHandler = async (event) => {

  //pull values from page
  const id = event.target.getAttribute('data-id');
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  const response = await fetch(`/api/dashboard/update/${id}`, {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // refresh page; this will show the updated post title and content
    document.location.replace(`/post/${id}`);
  } else {
    alert("Post not found!")
  }
};

// delete post handler
const delBtnHandler = async (event) => {

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/dashboard/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Post not found!")
  }

};

document.querySelector("#del-btn").addEventListener("click", delBtnHandler);

document.querySelector(".updatePost-form").addEventListener("submit", updateFormHandler);