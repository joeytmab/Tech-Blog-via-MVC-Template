
//BUTTONHANDLERS
  
// handle event to display new post form (new post button)
const newBtnHandler = async (event) => {
  
  document.location.replace('/api/dashboard/new');
};

// handle event to display edit current post
const editBtnHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  document.location.replace(`/api/dashboard/edit/${id}`);
};

// handle event to delete current post
const deleteBtnHandler = async (event) => {

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

//listener for all edit and delete buttons created for posts

const editBtns = document.querySelectorAll(".edit-btn");
const delBtns = document.querySelectorAll(".del-btn");



  //document.query selectors, one for creating, editing, and deleting post 
document.querySelector("#new-btn").addEventListener("click", newBtnHandler);
 
editBtns.forEach(btn => {
  btn.addEventListener("click", editBtnHandler);
  });

delBtns.forEach(btn => {
  btn.addEventListener("click", deleteBtnHandler);
  }); 
