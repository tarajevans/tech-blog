function createPostPostHandler(event){
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content_txt = document.getElementById("content_txt").value.trim();

    if (title && content_txt){
        const response = fetch("/api/dashboard/createPost", {
          method: "post",
          body: JSON.stringify({
            title: title,
            content_txt: content_txt,
          }),
          headers: { "Content-Type": "application/json" },
        });
    }
}


document.getElementById("create-post-btn").addEventListener("click", createPostPostHandler);