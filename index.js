// This code was created using the Thinkful GitHub API example as a source. I spent well over a week trying to make it from scratch, see my YouTube repo for this

// YouTube API Key
const API_KEY = 'AIzaSyAhE7phirGx9wlS2auDO9cIcG_s0NY8ra8';
// YouTube Search URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


// function to gather data from request
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      part: 'snippet',
      key: API_KEY
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

// function to return HTML Div for each result
// for each result, add a div with the image using jQuery
function renderResult(result) {
  return `
    <div>
        <img src=${result.snippet.thumbnails.medium.url}>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}">${result.snippet.title}</a>  
    </div>
  `;
}

// function to add each HTML Div to page using .html
function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

// function to listen for entry submission
function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    // find the value of the entry in the input box with class .js-query 
    const queryTarget = $(event.currentTarget).find('.js-query');
    // add query variable = text entry
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // call the API using the query variable as arg1 and the displayGitHubSearchData function as a callback using the results
    getDataFromApi(query, displayGitHubSearchData);
  });
}
// add watchSubmit function to page load
$(watchSubmit);
