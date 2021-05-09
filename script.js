const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.querySelector('.loader');

loader.hidden = true;
quoteContainer.hidden = false;
// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// when the fetchinf is complited
function completefetching() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get quotes from Api
var i = 0;
async function getQuote() {
    loading();
    const proxyUrl =  'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lan=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank then add unknown
        AuthorText.innerText == ''?AuthorText.innerText = 'unknown':AuthorText.innerText = data.quoteAuthor;
        //reduce font size for long quote
        quoteText.innerText.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        completefetching();
    } catch (error) {
        if (i < 5) {
            getQuote();
            i++;
        }  
        else {
            console.log('whoops no quote', error);   
        } 
        
    }
    
}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = AuthorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');

}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


