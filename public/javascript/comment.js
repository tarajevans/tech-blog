async function commentFormHandler(event) {
  event.preventDefault();
console.log(">>>>>ADD COMMENT");
  const comment_text = document.getElementById('comment_body').value.trim();
  const url = window.location.href.split("?")[0];
  const urlSplit = url.split('/');

  const post_id = urlSplit[urlSplit.length - 1];
  console.log(">>>>>POST ID: "  + comment_text);

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id: post_id,
        comment_text: comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    });

//console.log(JSON.stringify(response));
    const obj = await response.json();
    console.log("OBJ: " + JSON.stringify(obj));
console.log("RESPONSE: "+JSON.stringify(response));
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

function edit(id) {
  console.log(">>>>>EDIT");
  let myEditButton = document.querySelector("#btnEdit_" + id);
  let myCommentTextArea = document.querySelector("#comment_text_area_" + id);

  if (myEditButton.innerHTML === "EDIT") {
    document.querySelector("#comment_text_div_" + id).style.display = "none";
    myCommentTextArea.style.display = "block";
    myEditButton.innerHTML = "SAVE";
  } else {
    //SAVE THE CHANGES
    console.log("commentid: "+id);
    fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_text: document.querySelector("#comment_text_area_" + id).value
      }),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then((response)=>{
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    });
  }
};

function del(id){
  fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  });
}


//this code runs at load/reload
document.getElementById('create-comment-btn').addEventListener('click', commentFormHandler);