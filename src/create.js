
const form = document.querySelector('form');

const createPost = async (e) =>
{
  e.preventDefault(e);

  const doc = {
    title: form.title.value,
    imageUrl : form.image.value,        
    content: form.body.value,
    author: form.author.value,

  }

  
  await fetch('http://localhost:3000/posts',{
    method : 'POST',
    
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/index.html');

}

form.addEventListener('submit',createPost);
