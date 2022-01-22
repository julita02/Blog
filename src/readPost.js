
const containerDiv = document.querySelector('.div-container');

const id = new URLSearchParams(window.location.search).get('id');
const putForm = document.querySelector('.putForm');

const deleteBtn = document.querySelector('.delete');
const updateBtn = document.querySelector('.update');


const renderDetails = async()=>{
  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();
  console.log(post);
let template = ' ';
   template += ` 
  <div class="row row-cols">
 
  <div class="col"> <img class="img col" src="${post.imageUrl}"></div>  
  <div class="col"><h2>${post.title} </h2> <hr>
  <p>${post.content}</p><hr>
  <h6>Author: ${post.author}  </h6>
  <div>
  </div>
   `
  containerDiv.innerHTML= template;


};
deleteBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/posts/' + id, {
    method: 'DELETE'
  });
  window.location.replace("index.html");
})

updateBtn.addEventListener('click', async (e) => {
  e.preventDefault(e);

  const data = {
    
    title: putForm.title.value,
    imageUrl : putForm.image.value,        
    content: putForm.body.value,
    author: putForm.author.value,

  }

  const res = await fetch('http://localhost:3000/posts/' + id, {
    method: 'PUT',
	headers:{
	'Content-Type':'application/json'
	},
	body: JSON.stringify(data)
})
  window.location.replace("index.html");
})

window.addEventListener('DOMContentLoaded', renderDetails);