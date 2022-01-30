
const id = new URLSearchParams(window.location.search).get('id');
const linkPost = 'http://localhost:3000/posts/'
const updateForm = document.getElementById('formBody');

let postId = 0
//Fetch data from the api
async function fetchData() {
  try {
    const response = await fetch(linkPost + id);

    const data = await response.json();
    console.log(data);

   
    let template = ' ';
    template += ` 
    <div class="row row-cols " >
    <div class="col-auto"> <img class="img col" src="${data.imageUrl}"> </div>  
    <div class="col">


   <label for="inputTitle">Title</label> <input class="form-control" id="inputTitle" minlength="5" type="text" name="title" pattern=".{5,}" required
      title="10 characters minimum" placeholder="Blog title" value="${data.title}">

      <label for="inputImageURL">ImageUrl</label> 
    <input class="form-control" type="url" name="image" id="inputImageURL" value="${data.imageUrl}" required placeholder="Image URL">


    <label for="blogContent">Blog Content</label> 
    <textarea name="body"  id="blogContent" required placeholder="Blog body">${data.content}</textarea>

    <label for="blogAuthor">Author Name</label> 
    <input class="form-control"  id="blogAuthor" pattern=".{4,10}" required title="5 to 10 characters" type="text" name="author"
      placeholder="Author Name" value="${data.author}">


    <button class="btn btn-primary">Update </button>

   
    </div>
    </div>
     `
     updateForm.innerHTML = template;
  } catch (error) {
    console.log(error)
  }

}


fetchData();

  
const updatePost = async (e) => {
  e.preventDefault();
  // debugger;
  const doc = {
    title: updateForm.title.value,
    imageUrl: updateForm.image.value,
    content: updateForm.body.value,
    author: updateForm.author.value,

  }
  
  const Put = {
    method: 'Put',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  }
  await fetch(`http://localhost:3000/posts/${id}`, Put)
    .then( res => {
      window.location.replace('/index.html');
    })
    .catch(error => {
      debugger;
      console.error('There was an error!', error);
    });

}

updateForm.addEventListener('submit', updatePost);



