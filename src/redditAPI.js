export default {
    search: function(searchValue,sortBy,searchLimit){
        return fetch(`http://www.reddit.com/search.json?q=${searchValue}&sort=${sortBy}&limit=${searchLimit}`)
        .then(res => res.json())
        .then(data => data.data.children.map(data =>  data.data))
        .catch(err => console.error(error));
        
    }
}