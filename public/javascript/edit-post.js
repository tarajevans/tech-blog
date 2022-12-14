async function editFormHandler(event) {
  event.preventDefault();

  const title = document.getElementById('post-title').value.trim();
  const content_txt = document.getElementById('post-content').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content_txt: content_txt,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  });
}

document.getElementById("btnSavePost").addEventListener("click", editFormHandler);

