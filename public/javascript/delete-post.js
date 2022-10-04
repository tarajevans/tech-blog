function deletePost(id) {
    event.preventDefault();
    fetch(`/api/posts/deletePost/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          document.location.replace("/dashboard/");
        } else {
          alert(response.statusText);
        }
      });
}