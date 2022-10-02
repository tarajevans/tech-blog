async function commentFormHandler(event) {
    event.preventDefault();
  console.log(">>>>>ADD COMMENT");
    const comment_text = document.getElementById('comment_body').value.trim();
    const url = window.location.href.split("?")[0];
    const urlSplit = url.split('/');
  
    const post_id = urlSplit[urlSplit.length - 1];
    console.log(">>>>>POST ID: "  + comment_text);
  
    if (comment_text) {
      const response = await fetch('/api/dashboard/comment', {
        method: 'POST',
        body: JSON.stringify({
          post_id: post_id,
          comment_text: comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
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