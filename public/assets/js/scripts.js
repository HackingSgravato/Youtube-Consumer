// site url (don't include final slash)
const site_url = 'https://youtube-consumer.herokuapp.com';
const key = 'AIzaSyA0P39w6XbeC0SMptn7WX9i6BkgheFQD-Y';

function draw_result_card(video_id, video_title, video_thumbnail, publisher_name){

    // download button
    const download_button = document.createElement('button');
    download_button.classList = 'btn btn-light';
    download_button.type = 'button';
    download_button.innerHTML = 'Download';
    download_button.addEventListener('click', function(){
        document.location.href = `${site_url}/download?URL=${video_id}`;
    });

    // download button container
    const download_button_container = document.createElement('div');
    download_button_container.classList = 'd-flex justify-content-end';
    
    download_button_container.appendChild(download_button);

    // thumbnail
    const thumbnail = document.createElement('img');
    thumbnail.src = video_thumbnail;
    thumbnail.style = 'margin-top: 7px;';

    // thumbnail container
    const thumbnail_container = document.createElement('div');
    thumbnail_container.classList = 'collapse';
    const thumbnail_container_id = 'thumbnail_' + video_id;
    thumbnail_container.id = thumbnail_container_id;

    thumbnail_container.appendChild(thumbnail);

    // show thumbnail button
    const show_thumbnail_button = document.createElement('a');
    show_thumbnail_button.classList = 'btn btn-info btn-sm';
    show_thumbnail_button.setAttribute('data-bs-toggle', 'collapse');
    show_thumbnail_button.setAttribute('aria-expanded', 'false');
    show_thumbnail_button.setAttribute('aria-controls', '#' + thumbnail_container_id);
    show_thumbnail_button.setAttribute('href', '#' + thumbnail_container_id);
    show_thumbnail_button.setAttribute('role', 'button');
    show_thumbnail_button.innerHTML = 'Thumbnail';

    // show thumbnail button container
    const show_thumbnail_button_container = document.createElement('div');

    show_thumbnail_button_container.appendChild(show_thumbnail_button);
    show_thumbnail_button_container.appendChild(thumbnail_container);

    // publisher name
    const publisher_name_element = document.createElement('h6');
    publisher_name_element.classList = 'text-end text-danger card-subtitle mb-2';
    publisher_name_element.innerHTML = publisher_name;

    // video title
    const video_title_element = document.createElement('h4');
    video_title_element.classList = 'text-center card-title';
    video_title_element.innerHTML = video_title;

    // previous elements container (actually the card body)
    const card_body = document.createElement('div');
    card_body.classList = 'card-body';

    card_body.appendChild(video_title_element);
    card_body.appendChild(publisher_name_element);
    card_body.appendChild(show_thumbnail_button_container);
    card_body.appendChild(download_button_container);

    // card
    const card = document.createElement('div');
    card.classList = 'card';

    card.appendChild(card_body);

    const search_results_container = document.getElementById('search_results_container');
    search_results_container.appendChild(card);
}

function perform_search(){
    event.preventDefault();

    // clear previous search results
    clear_search_results();

    const keyword = document.getElementsByName('Search')[0].value;
    if (keyword.length == 0){
        return;
    }

    const search_query = keyword.replace(' ', '%20');
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search_query}&key=${key}`)
    .then(response => response.json())
    .then(data => {
        const videos = data.items;
        for (const video of videos){
            const video_id = video.id.videoId;
            const video_title = video.snippet.title;
            const video_thumbnail = video.snippet.thumbnails.default.url;
            const publisher_name = video.snippet.channelTitle;

            draw_result_card(video_id, video_title, video_thumbnail, publisher_name);
        }
    });
}

function show_zero_results_modal(){
    const zero_results_modal = new bootstrap.Modal(document.getElementById('zero_results_modal'));
    zero_results_modal.show();
}

function show_alert_if_no_results(){
    const search_results_container = document.getElementById('search_results_container');
    if (search_results_container.childElementCount == 0){
        show_zero_results_modal();
    }
}

function clear_search_results(){
    const search_results_container = document.getElementById('search_results_container');
    search_results_container.innerHTML = '';
}