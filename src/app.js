import reddit from './redditAPI'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');

//Form EventListner
searchForm.addEventListener('submit', e =>{

    //Get search input
    const searchValue = searchInput.value;

    //Get sort

    const sortBy = document.querySelector('input[name="sortby"]:checked').value

    const searchLimit = document.getElementById('limit').value;
    console.log(searchLimit)
    console.log(searchValue)


    //check input

    if(searchValue === ''){
        //Show a message
        showMessage('Please add a search term', 'alert-danger')
    }
    //clearup search
        clearMessage();

    //search API
    reddit.search(searchValue,sortBy,searchLimit)
    .then(data  => {

        console.log(data)
        let output = `<div class="card-columns">`
        
        //loop through results

        data.forEach(post => {
            //check for image

            const images = post.preview ? post.preview.images[0].source.url :  'https://kt-media-knowtechie.netdna-ssl.com/wp-content/uploads/2014/06/reddit-logo.png'

            output +=`<div class="card">
            <img class="card-img-top" src="${images}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncate(post.selftext,100)}</p>
              <a target="_blank" href="${post.url}" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">SubReddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score} </span>
            </div>
          </div>`
        });
        output += `</div>`
        results.innerHTML = output;
    
    })
    e.preventDefault();

})

function showMessage(message, className){

    //Creat the div
    const div = document.createElement('div')
    //Add classes
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    //get the parent container
    const parent = document.getElementById('search-container')
    
    parent.insertAdjacentElement('afterbegin',div);

    setTimeout(() =>{
        document.querySelector('.alert').remove()
    },3000)
}
function clearMessage(){
    searchInput.value = '';
}

function truncate(text, limit){
    const shortend = text.indexOf(' ',limit)
    if(shortend == -1) return text
    return text.substring(0, shortend);
}



