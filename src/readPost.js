
const containerDiv = document.querySelector('.div-container');

const id = new URLSearchParams(window.location.search).get('id');

const deleteBtn = document.querySelector('.deleteBtn');



const renderDetails = async () => {
  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();
  console.log(post);
  let template = ' ';
  template += ` 
  <div class="row row-cols">
 
  <div class="col"> <img class="img col" src="${post.imageUrl}"></div>  
  <div  name=title class="col"><h2>${post.title} </h2> <hr>
  <div  name=content>${post.content}</div><hr>
  <h6  name=author >Author: ${post.author}  </h6>
  <div>
  <div class="row"> <a href = "/Update.html?id=${post.id}"> Edit</div>
  </div>
 
   `
  containerDiv.innerHTML = template;
};

const Response = async res => {
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson && await res.json();

  // check for error res
  if (!res.ok) {
    // get error message from body or default to res status
    const error = (data && data.message) || res.status;
    return Promise.reject(error);
  }

}

const deletePost = async () => {
  await fetch('http://localhost:3000/posts/' + id, {
    method: 'DELETE'
  })
    .then(Response)
    .catch(error => {

      console.error('There was an error!', error);
    });

  window.location.replace("index.html");
}
deleteBtn.addEventListener('click', deletePost)


window.addEventListener('DOMContentLoaded', renderDetails);