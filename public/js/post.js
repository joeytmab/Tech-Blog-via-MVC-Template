// handle event to display new post form
const newBtnHandler = async (event) => {
  document.location.replace('/api/dashboard/new');
};

// handle event to display edit current post form
const editBtnHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  document.location.replace(`/api/dashboard/edit/${id}`);
};

// handle event to delete current post
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

// Listen to new post click event
document
  .querySelector("#new-btn")
  .addEventListener("click", newBtnHandler);

const editBtns = document.querySelectorAll(".edit-btn");
const delBtns = document.querySelectorAll(".del-btn");

editBtns.forEach(btn => {
  btn.addEventListener("click", editBtnHandler);
});

delBtns.forEach(btn => {
  btn.addEventListener("click", delBtnHandler);
});




