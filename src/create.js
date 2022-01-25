
const form = document.querySelector('form');

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

const createPost = async (e) =>
{
  e.preventDefault();

  const doc = {
    title: form.title.value,
    imageUrl : form.image.value,        
    content: form.body.value,
    author: form.author.value,

  }
const Post = {
  method : 'POST',
  
  body: JSON.stringify(doc),
  headers: { 'Content-Type': 'application/json' }
}
  await fetch('http://localhost:3000/posts',Post)
  .then(Response)
.catch(error => {
   
    console.error('There was an error!', error);
});

  

  window.location.replace('/index.html');

}

form.addEventListener('submit',createPost);
