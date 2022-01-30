
const blogForm = document.getElementById('createBlog');

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
    title: blogForm.title.value,
    imageUrl : blogForm.image.value,        
    content: blogForm.body.value,
    author: blogForm.author.value,

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


blogForm.addEventListener('submit',createPost);


 window.addEventListener('mouseup',function(event){
        var createBlog = document.getElementById('createBlog');
        if(event.target != createBlog && event.target.parentNode != createBlog){
            createBlog.style.display = 'none';
        }
  });  