let dbUrl = "http://localhost:3000/posts"
let pageUrl= "http://localhost:3000/posts?_limit=3&_page=1"
const container = document.getElementById( "blogpost" );


const parseLinkHeader = linkHeader =>  Object.fromEntries( linkHeader.split( ", " ).map( header => header.split( "; " ) ).map( header => [ header[1].replace( /"/g, "" ).replace( "rel=", "" ), header[0].slice( 1, -1 ) ] ) );



const parseRoute = url => Object.fromEntries( url.replace( `${ dbUrl }?`, "" ).split( "&" ).map( attribute => [ attribute.split( "=" )[ 0 ].slice( 1 ), attribute.split( "=" )[ 1 ] ] ) );



const pageNumber = url => parseRoute( url ).page || 1;

const fetchPosts = url => {
    container.innerHTML = ``;
    fetch( url )
        .then( res => res.json().then( data => [ data, res.headers.get( "Link" ) ] ) )
        .then( pageData => {
            pageData[ 0 ].forEach( posts => renderPosts( posts ) );
             if ( !pageData[ 1 ] ) { document.getElementById( "page-number" ).innerHTML = "Page 1 of 1"; }
            else {
             document.getElementById( "page-number" ).innerHTML = `Page ${ pageNumber( pageUrl) } of ${ pageNumber( parseLinkHeader( pageData[ 1 ] ).last ) }`;
             }
        } );
}

const renderPosts = posts => {
   
    let postBlog = document.createElement( "div" );

    postBlog.classList.add( "col" );

    postBlog.innerHTML = `
    <div class="post">
    
      
    <div class=""> <img class="col img" src="${posts.imageUrl}"></div>   
    <h2> ${posts.title}  </h2>
    <div class="col ">${posts.content.slice(0,100)}&nbsp; <a href = "/readPost.html?id=${posts.id}"> ... read more </a><hr>
    <h6>Author: ${posts.author}  </h6>
    </div></div>    
           </div>  

    `    
    container.append( postBlog );
}


const paginate = direction => {
    fetch( pageUrl).then( res => {
        let linkHeaders = res.headers.get( "Link" );
        if ( linkHeaders ) {
            let headersObject = parseLinkHeader( res.headers.get( "Link" ) );
            if ( !!headersObject[ direction ] ) {
             pageUrl= headersObject[ direction ];
                fetchPosts( headersObject[ direction ] );
            }
        }
    } );
}

const searchPosts = searchFormSubmission => {
    searchFormSubmission.preventDefault();
 pageUrl= `http://localhost:3000/posts?${ searchFormSubmission.target.elements.filter.value }=${ searchFormSubmission.target.elements.query.value }&_limit=${ searchFormSubmission.target.elements.limit.value }&_page=1`;
    fetchPosts( pageUrl);
}

document.addEventListener( "DOMContentLoaded", () => {
    fetchPosts( pageUrl);
    document.getElementById( 'search' ).addEventListener( 'submit', searchPosts );
    document.getElementById( 'first' ).addEventListener( 'click', () => paginate( "first" ) );
    document.getElementById( 'back' ).addEventListener( 'click', () => paginate( "prev" ) );
    document.getElementById( 'forward' ).addEventListener( 'click', () => paginate( "next" ) );
    document.getElementById( 'last' ).addEventListener( 'click', () => paginate( "last" ) );
} );