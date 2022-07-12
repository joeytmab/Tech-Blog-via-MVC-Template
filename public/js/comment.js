const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#new-comment').value.trim();

    const post_id = event.target.getAttribute('data-id');
    

    if (comment_text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);