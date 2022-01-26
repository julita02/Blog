
const containerDiv = document.querySelector('.div-container');

const id = new URLSearchParams(window.location.search).get('id');
const putForm = document.getElementById('putForm');

const deleteBtn = document.querySelector('.delete');
const updateBtn = document.querySelector('.update');


const renderDetails = async()=>{
  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();
  // console.log(post);
let template = ' ';
   template += ` 
  <div class="row row-cols">
 
  <div class="col"> <img class="img col" src="${post.imageUrl}"></div>  
  <div contenteditable="true" name=title class="col"><h2>${post.title} </h2> <hr>
  <div contenteditable="true" name=content>${post.content}</div><hr>
  <h6 contenteditable="true" name=author >Author: ${post.author}  </h6>
  <div>
  </div>
   `
  containerDiv.innerHTML= template;
};

const Response =async res => {
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson && await res.json();

  // check for error res
  if (!res.ok) {
      // get error message from body or default to res status
      const error = (data && data.message) || res.status;
      return Promise.reject(error);
  }

}

 const deletePost =async () => {
  await fetch('http://localhost:3000/posts/' + id, {
    method: 'DELETE'
  })
  .then(Response)
.catch(error => {
   
    console.error('There was an error!', error);
});

  window.location.replace("index.html");
}
deleteBtn.addEventListener('click',deletePost)



 const UpdatePost =async (e) => {
  e.preventDefault(e);
 const data = {    
    title: putForm.title.value,           
    content: putForm.content.value,
    author: putForm.author.value,
  }
  const putPost ={
    method: 'PUT',
	headers:{	'Content-Type':'application/json'	},
	body: JSON.stringify(data)
}
 await fetch('http://localhost:3000/posts/' + id,putPost )
 .then(Response)
.catch(error => {
 
  console.error('There was an error!', error);
});
 
  window.location.replace("index.html");
}

updateBtn.addEventListener('click',UpdatePost)
window.addEventListener('DOMContentLoaded', renderDetails);