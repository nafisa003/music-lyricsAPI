document.getElementById('btn-search').addEventListener('click',()=>{
   const song= document.getElementById('song-name').value;
   getSongs(song);

})

function getSongs(songName)
{
    fetch(`https://api.lyrics.ovh/suggest/${songName}/`)
    .then(res=>res.json())
    .then(res=>{
        //  data=data.Array.slice(0,2);
        const songsToSuggest=res.data.slice(0,9);
        // console.log(songsToSuggest);
        let searchList= document.getElementById('search-container');
        searchList.innerText='';
        songsToSuggest.map(el=>{
        let songName=el.title;
        let songArtist=el.artist.name;
        
        let suggestion=document.createElement('div');
        suggestion.innerHTML+=`<div class="search-result col-md-8 mx-auto py-1" >
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"><span id="song-title">${songName}</span></h3>
                <p class="author lead">Album by <span id="song-artist">${songArtist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="fetchLyrics('${songName}','${songArtist}')">Get Lyrics</button>
            </div>
        </div>
    </div>`;
    searchList.appendChild(suggestion);
    })
    })
}
    
const fetchLyrics=(song,artist)=>    
{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then(res=>res.json())
    .then(data=>
        // document.getElementById('song-lyrics').innerText=data.lyrics
        document.getElementById('search-container').innerText=data.lyrics
        );
    
}
