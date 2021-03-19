/*V1 of this app is made without using frameworks.
I intend V2 to use React so I can have a better understanding about some of 
the problems frameworks solve. */


//SETUP VARIABLES
//=====================


//Key provided to access reviews when I first registered to NYT website

var apiKey = "&api-key=PVnPqWozx1UIW1lsm6IEAHjyh4qxDKJR";

//URL Queries by author of title

var queryAuthor = "https://api.nytimes.com/svc/books/v3/reviews.json?author=";

var queryTitle = "https://api.nytimes.com/svc/books/v3/reviews.json?title=";

//Set variables to access different parts of the HTML document

let authorForm = document.getElementById('author-form');
let authorField = document.getElementById('author-field');
let articleList = document.getElementById('list')



//Have our Javascript do something when user submits the form

authorForm.addEventListener('submit', handleSubmit);        

async function handleSubmit(e){
    
    e.preventDefault()
    articleList.innerHTML = ``;        //Clears the list from previous form submissions where the list will generate
    

    let userAuthor = encodeURIComponent(authorField.value.trim()); //Replaces spaces with %20 for the url          
    let ourQuery = queryAuthor + userAuthor + apiKey;               //Create the query to fetch NYT data  
    
    
    fetch(ourQuery, {method:'get',})               //Use the fetch method to get data from the NYT API
    .then((resp) => resp.json())                   //and convert the response into JSON data
    .then(function(data) {
        let reviews = data.results
        
        //Create arrays of the different key values from the NYT results
        let title = reviews.map(i => i.book_title)
        let reviewer = reviews.map(i => i.byline)
        let link = reviews.map(i => i.url)
        let date = reviews.map(i => i.publication_dt)

        //Call the function to generate a list of links to the different reviews       
        generateArticleList(title,link,reviewer)
    })
}


function generateArticleList(t,l,r){

    ul = document.createElement('ul')
    
    //for loop iterates through key arrays to create a list of links

    for(var i = 0; i < t.length; i++){
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.innerHTML = l[i]
        li.appendChild(a)
        li.innerHTML =`<a href=` + l[i] +`>`+ t[i] + `</a> <small> review by `+ r[i] + `</small>`
        ul.appendChild(li)
    }

    articleList.appendChild(ul)


}























