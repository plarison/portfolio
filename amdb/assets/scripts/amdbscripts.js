const apiKey = 523532;

const apiArtistSearch = "https://www.theaudiodb.com/api/v1/json/" + apiKey + "/search.php?s=";
const apiAllAlbum = "https://www.theaudiodb.com/api/v1/json/"  + apiKey + "/searchalbum.php?s=";
const apiMvids = "https://www.theaudiodb.com/api/v1/json/"  + apiKey + "/mvid.php?i=";
const apiTrackList = "https://www.theaudiodb.com/api/v1/json/"  + apiKey + "/track.php?m=";
const apiOneTrack = "https://www.theaudiodb.com/api/v1/json/"  + apiKey + "/track.php?h=";

//let searchTerm = "evanescence";  //clear after debugging
const url = window.location.href;
const searchTerm = url.slice((url.indexOf("?search=")+8), url.indexOf("&x="));


let output = "";

let callArtist = apiArtistSearch + searchTerm;
let callAllAlbums = apiAllAlbum + searchTerm;
let callMvids = "";
let callTrackList = ""; 

//let artistID = "";
let albumIndex = 0;
let trackIndex = 0;
let currentTrackList = [];
let objArtist = {};




//Runs at page load.  Gets the data from the API at theaudiodb.com
async function getArtistInfo(file) {
	//initial API call uses the 'search artist' 
  let thisArtist = await fetch(file);
  let rawJSON = await thisArtist.text();
  let initObj = JSON.parse(rawJSON);   //stores the returned API data
  
  objArtist = JSON.parse(JSON.stringify(initObj.artists[0]));  //formats the data
      	
	  //API call to add albums to objArtist
      await populateAlbums(callAllAlbums);
	  
	  //format music video url using numeric ID, then add to objArtist
      callMvids = apiMvids + objArtist.idArtist;
	  await populateMvids(callMvids);
  
  //remove first/last quotes from values
	for (let i = 0; i < objArtist.length-3; i++) {
  objArtist[i] = objArtist[i].slice(1,-1);} 
  
  if (objArtist.strDisbanded = "ul") {
	objArtist.strDisbanded = "Current";
  }
  
  objArtist.albumList.sort(function(x, y) {
	   return x.intYearReleased - y.intYearReleased;
  });
  
 
async function populateAlbums(file) {
  let allAlbums = await fetch(file);
  let rawJSON = await allAlbums.text();
  let objDiscography = JSON.parse(rawJSON);
  objArtist.albumList = []; 
  
 
  for (let i = 0; i < objDiscography.album.length; i++) {
	//format API call for Tracks using numeric ID
	callTrackList = apiTrackList + objDiscography.album[i].idAlbum;
	
	//add album data to objArtist
    objArtist.albumList[i] = {idAlbum : objDiscography.album[i].idAlbum,
    idArtist : objDiscography.album[i].idArtist,
    strAlbum : objDiscography.album[i].strAlbum,
    intYearReleased : objDiscography.album[i].intYearReleased,
	strGenre : objDiscography.album[i].strGenre,
    strStyle : objDiscography.album[i].strStyle,
    strMood : objDiscography.album[i].strMood,
    strSpeed : objDiscography.album[i].strSpeed,
	strReleaseFormat : objDiscography.album[i].strReleaseFormat,
    strLabel : objDiscography.album[i].strLabel,
    intSales : objDiscography.album[i].intSales,
    strDescription : objDiscography.album[i].strDescriptionEN,
	strAlbumThumb : objDiscography.album[i].strAlbumThumb}
    	
	objArtist.albumList[i].albumArt = {strAlbumThumb : objDiscography.album[i].strAlbumThumb,
	strAlbumThumbHQ : objDiscography.album[i].strAlbumThumbHQ,
	strAlbumThumbBack : objDiscography.album[i].strAlbumThumbBack,
	strAlbumCDart : objDiscography.album[i].strAlbumCDart,
	strAlbumSpine : objDiscography.album[i].strAlbumSpine,
	strAlbum3DCase : objDiscography.album[i].strAlbum3DCase,
	strAlbum3DFlat : objDiscography.album[i].strAlbum3DFlat,
	strAlbum3DFace : objDiscography.album[i].strAlbum3DFace,
	strAlbum3DThumb : objDiscography.album[i].strAlbum3DThumb}
	
	
  }   
}

async function  populateMvids(file) {
  let mVids = await fetch(file);
  let rawJSON = await mVids.text();
  let initObj = JSON.parse(rawJSON);
  let objVids = JSON.parse(JSON.stringify(initObj.mvids));
  objArtist.videoList = [];
  
  for (let i = 0; i < objVids.length; i++) {
    objArtist.videoList[i] = {};
    objArtist.videoList[i].idAlbum = objVids[i].idAlbum;
    objArtist.videoList[i].strAlbum = objVids[i].strAlbum;
    objArtist.videoList[i].idTrack = objVids[i].idTrack;
	objArtist.videoList[i].strTrack = objVids[i].strTrack;
    objArtist.videoList[i].strMusicVid = objVids[i].strMusicVid;
  }
}

}



function buttonInfoArtist() {
	//hide album only divs
	document.getElementById("albumpicker").style.display = "none";
	document.getElementById("albumname").style.display = "none";
	document.getElementById("albumbar").style.display = "none";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	let a = objArtist;
	
	
	//populate display pane
	
	//replace or remove escape characters
	if (typeof a.strBiographyEN != "undefined") {
	a.strBiographyEN = a.strBiographyEN.replace(/\\n\\n/g, "<br><br>");
	a.strBiographyEN = a.strBiographyEN.replace(/\\/g, "");
	} else { 
		a.strBiographyEN = "Unavailable"
	}
	
	//create contents of display pane
	let artistInfo = "<img id=\"displayPaneImage\" src=" + a.strArtistWideThumb + " alt=\"Band Image\"> <br>" + 
		"<p><b>Origin: </b>" + a.strCountry + "<br><b>Genre: </b>" + 
		a.strGenre + "<br><b>Style: </b>" + a.strStyle + "<br><b>Mood: </b>" + 
		a.strMood + "<br><b>Active: </b>" + a.intFormedYear + "-" + a.strDisbanded 		
		
		//Check if band or solo artist
		if (a.intMembers==1) { 
			artistInfo += "<br><b>Born: </b>" + a[7];

			if (a.intDiedYear == "ul") {
			let d = new Date();
				let age = d.getFullYear()-a.intBornYear;
				artistInfo += "<br><b>Age: </b>" + age;
				} else {
				artistInfo += "<br><b>Died: </b>" + a.intDiedYear;
				}
				
			} else {
			artistInfo += "<br><b>Members: </b>" + a.intMembers;
			}
		
		artistInfo += "<br><b>Official Site: </b>" + a.strWebsite + "<br><b>Biography:</b><br>" + a.strBiographyEN + "</p>";  
	
	document.getElementById("displayPane").innerHTML = artistInfo;
	window.scrollTo(0, 0);
	document.getElementById("displayPane").scrollTo(0, 0);
}

function buttonAlbums(){
	//hide album only divs
	document.getElementById("albumpicker").style.display = "none";
	document.getElementById("albumname").style.display = "none";
	document.getElementById("albumbar").style.display = "none";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	let a = objArtist.albumList;
	
	let albumString = "<table id=\"albumtable\"><colgroup><col span=\"1\" style=\"width: 30%;\"><col span=\"1\" style=\"width: 70%;\"></colgroup>";
	let albumThumb = "";
	let singleAlbum = "";
	
	for (let i = 0; i < a.length; i++) {		
		albumThumb = "<img id=\"albumThumb\" src=" + a[i].strAlbumThumb + " alt=\"AlbumThumb\">";
		singleAlbum = "<b>Title: </b>" + a[i].strAlbum + "<br>";
		singleAlbum += "<b>Year: </b>" + a[i].intYearReleased + "<br>";
		singleAlbum += "<b>Format: </b>" + a[i].strReleaseFormat + "<br>";
		if (typeof a[i].strLabel != "undefined") {
		singleAlbum += "<b>Label: </b>" + a[i].strLabel;
		}
		albumString += "<tr onclick=\"selectAlbum(" + a[i].idAlbum + ")\"><td>" + albumThumb + "</td><td>" + singleAlbum + "</td></tr>";
		}
	albumString += "</table>";
	document.getElementById("displayPane").innerHTML = albumString;
}

function buttonMedia(){
	//hide album only divs
	document.getElementById("albumpicker").style.display = "none";
	document.getElementById("albumname").style.display = "none";
	document.getElementById("albumbar").style.display = "none";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	let a = objArtist.videoList;
	let vidThumbs = "";
	let artistImages = "";
	let mediaString = "";
	
	for (let i in objArtist.videoList){
		
			let str = objArtist.videoList[i].strMusicVid;
			let vidID = str.slice(str.indexOf("?v=")+3);
			let imgLink = "https://img.youtube.com/vi/" + vidID + "/0.jpg"
			vidThumbs += "<h3 style=\"text-align: center; margin-bottom: 0;\">" + objArtist.videoList[i].strTrack + "</h3><br><img id=\"displayPaneVidThumb\" onclick=\"trackByID(" + objArtist.videoList[i].idTrack + ")\" src=" + imgLink + " alt=\"Youtube Thumbnail\"> <br>"
	} 
	
	
	if (objArtist.strArtistBanner != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistBanner + " alt=\"ArtistBanner\"> <br>"
	}
	if (objArtist.strArtistWideThumb != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistWideThumb + " alt=\"ArtistWideThumb\"> <br>"
	}
	if (objArtist.strArtistThumb != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistThumb + " alt=\"ArtistThumb\"> <br>"
	}
	if (objArtist.strArtistLogo != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistLogo + " alt=\"ArtistLogo\"> <br>"
	}
	if (objArtist.strArtistCutout != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistCutout + " alt=\"ArtistCutout\"> <br>"
	}
	if (objArtist.strArtistClearart != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistClearart + " alt=\"ArtistClearart\"> <br>"
	}
	if (objArtist.strArtistFanart != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistFanart + " alt=\"ArtistFanart\"> <br>"
	}
	if (objArtist.strArtistFanart2 != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistFanart2 + " alt=\"ArtistFanart2\"> <br>"
	}
	if (objArtist.strArtistFanart3 != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistFanart3 + " alt=\"ArtistFanart3\"> <br>"
	}
	if (objArtist.strArtistFanart4 != "null"){
		artistImages += "<img id=\"displayPaneImage\" src=" + objArtist.strArtistFanart4 + " alt=\"ArtistFanart4\"> <br>"
	}
	
	mediaString = "<h1 style=\"text-align: center;\">Music Videos</h1>" + vidThumbs + "<br><h1 style=\"text-align: center;\">Artist Images</h1><br>" + artistImages;
	
	document.getElementById("displayPane").innerHTML = mediaString;
	
}

function buttonInfoAlbum(z){
	
	let a = objArtist.albumList;
	
	//From onclick string, used to indicate next or previous
	if (z == 1 | z == -1){
	  if (albumIndex < a.length) {
	  albumIndex += z;
	  }
	}
	
	//ensure album only divs are displayed
	document.getElementById("albumpicker").style.display = "block";
	document.getElementById("albumname").style.display = "block";
	document.getElementById("albumbar").style.display = "block";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	document.getElementById("prevTrack").style.display = "none";
	document.getElementById("prevTrackArrow").style.display = "none";
	document.getElementById("nextTrack").style.display = "none";
	document.getElementById("nextTrackArrow").style.display = "none";
		
	//populate display pane
	//Display album name at top
	document.getElementById("lblAlbumName").innerHTML = a[albumIndex].strAlbum;
	//set albumpicker images
	document.getElementById("activeAlbum").src = a[albumIndex].strAlbumThumb;
	if (albumIndex < a.length-1) {  //check if last album
	document.getElementById("nextAlbumCover").src = a[albumIndex+1].strAlbumThumb;
	document.getElementById("nextAlbumCover").style.display = "inline";
	document.getElementById("nextAlbumArrow").style.display = "inline";	
	} else {	
	document.getElementById("nextAlbumCover").style.display = "none";
	document.getElementById("nextAlbumArrow").style.display = "none";		
	}
	if (albumIndex > 0) {	//check if first album
	document.getElementById("prevAlbumCover").src = a[albumIndex-1].strAlbumThumb;
	document.getElementById("prevAlbumCover").style.display = "inline";
	document.getElementById("prevAlbumArrow").style.display = "inline";	
	} else {
	document.getElementById("prevAlbumCover").style.display = "none";
	document.getElementById("prevAlbumArrow").style.display = "none";	
	}
	
	
	//replace or remove escape characters
	if (typeof a[albumIndex].strDescription != "undefined") {	
	a[albumIndex].strDescription = a[albumIndex].strDescription.replace(/\\n\\n/g, "<br><br>");
	a[albumIndex].strDescription = a[albumIndex].strDescription.replace(/\\/g, "");
	} else { 
		a[albumIndex].strDescription = "Unavailable"
	}
	
	//sales figures are frequently missing
	if (typeof a[albumIndex].intSales == 0) {
			a[albumIndex].intSales = "Unavailable"
	}
	
	//create contents of display pane
	let albumInfo = "<p><b>Release: </b>" + a[albumIndex].intYearReleased + "<br><b>Genre: </b>" + a[albumIndex].strGenre + "<br><b>Style: </b>" + a[albumIndex].strStyle + "<br><b>Mood: </b>" + a[albumIndex].strMood + "<br><b>Tempo: </b>" + a[albumIndex].strSpeed + "<br><b>Format: </b>" + a[albumIndex].strReleaseFormat + "<br><b>Record Label:</b>" + a[albumIndex].strLabel + "<br><b>World Sales: </b>" + a[albumIndex].intSales + "<br><b>Album Description: </b><br>" + a[albumIndex].strDescription + "</p>";  
	
	document.getElementById("displayPane").innerHTML = albumInfo;
}


function buttonArt(){
	let albumImages = "";
	let mediaString = "";
	
	a = objArtist.albumList;
	
	//ensure album only divs are displayed
	document.getElementById("albumpicker").style.display = "block";
	document.getElementById("albumname").style.display = "block";
	document.getElementById("albumbar").style.display = "block";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	
	
	if (a[albumIndex].albumArt.strAlbumThumb != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbumThumb + " alt=\"strAlbumThumb\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbumThumbHQ != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbumThumbHQ + " alt=\"strAlbumThumbHQ\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbumThumbBack != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbumThumbBack + " alt=\"strAlbumThumbBack\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbumCDart != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbumCDart + " alt=\"strAlbumCDart\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbumSpine != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbumSpine + " alt=\"strAlbumSpine\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbum3DCase != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbum3DCase + " alt=\"strAlbum3DCase\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbum3DFlat != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbum3DFlat + " alt=\"strAlbum3DFlat\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbum3DFace != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].albumArt.strAlbum3DFace + " alt=\"strAlbum3DFace\"> <br>"
	}
	if (a[albumIndex].albumArt.strAlbum3DThumb != null){
		mediaString += "<img id=\"displayPaneImage\" src=" + a[albumIndex].strAlbum3DThumb + " alt=\"strAlbum3DThumb\"> <br>"
	}
	
	document.getElementById("displayPane").innerHTML = mediaString;
}


function selectAlbum(id) {

	//ensure album only divs are displayed
	document.getElementById("albumpicker").style.display = "block";
	document.getElementById("albumname").style.display = "block";
	document.getElementById("albumbar").style.display = "block";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	for (let i=0; i < objArtist.albumList.length; i++) {
		if (objArtist.albumList[i].idAlbum == id) {
			albumIndex = i;
			break;
		}
	}
	
	document.getElementById("btninfoalbum").click();
	document.getElementById("btninfoalbum").focus();
}

async function populateTrackList(file) {
  let theTracks = await fetch(file);
  let rawJSON = await theTracks.text();
  let initObj = JSON.parse(rawJSON);
  let objTrackList = JSON.parse(JSON.stringify(initObj.track));
   
   
  for (let k = 0; k < objTrackList.length; k++) {
    
	currentTrackList[k] = {idTrack : objTrackList[k].idTrack,
			idAlbum : objTrackList[k].idAlbum,
			idLyric : objTrackList[k].idLyric,
			strTrack : objTrackList[k].strTrack,
			intDuration : objTrackList[k].intDuration,
			strMusicVid : objTrackList[k].strMusicVid,
			intTrackNumber : objTrackList[k].intTrackNumber,
			strDescription : objTrackList[k].strDescriptionEN};
  }
}  

async function buttonTracks(){
	//Info not retrieved until button is clicked to avoid excessive API calls
	
	
	//format API call for Tracks using numeric ID, then call 
	callTrackList = apiTrackList + objArtist.albumList[albumIndex].idAlbum;
	await populateTrackList(callTrackList)	
	trackIndex = parseInt(trackIndex);
		
	//ensure album only divs are displayed
	document.getElementById("albumpicker").style.display = "block";
	document.getElementById("albumname").style.display = "block";
	document.getElementById("albumbar").style.display = "block";
	document.getElementById("lblAlbumNameTop").style.display = "none";
	
	function convertMilliseconds(mil) {
		let output = "";
		seconds = Math.floor((mil / 1000) % 60),
		minutes = Math.floor((mil / (1000 * 60)) % 60),
		hours = Math.floor((mil / (1000 * 60 * 60)) % 24);
/*
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
		*/
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		
		if (hours == 0) {
			output = minutes + ":" + seconds;
		} else {
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			output = hours + ":" + minutes + ":" + seconds;
		}
			
		return output;
	}
	
	let trackstring = '<table id="tracktable"><colgroup><col id="tracknum" span="1"><col id="trackname" span="1"><col id="tracktime" span="1"></colgroup><tbody>';
	
	for (let i in currentTrackList) {	
		trackstring += "<tr onclick=\"clickTrack(" + i + ") \"><td style=\"padding-top: 1%; padding-bottom: 1%; \">"
		
		trackstring += String(i).padStart(2, '0') + ")</td><td style=\"overflow: hidden;\">" + currentTrackList[i].strTrack + "</td>";
		let dur = convertMilliseconds(currentTrackList[i].intDuration);
		trackstring += "<td style=\"text-align: right;\">" + dur + "</td></tr>";
		//trackstring += "</h3>";
	}
	trackstring += "</tbody></table>"
	document.getElementById("displayPane").innerHTML = trackstring;
	
}

function clickTrack(index)  {
	trackIndex = index;
	trackByIndex() 
	}

	
async function oneTrack(idNum) {
	
	let call = apiOneTrack+idNum;
	let initial = await fetch(call);
	let rawJSON = await initial.text();
	let initObj = JSON.parse(rawJSON);
	let objTrack = JSON.parse(JSON.stringify(initObj.track[0]));
	
	
	
	//Match album index to selected track's album
	let id = objTrack.idAlbum;
	
	for (let i=0; i < objArtist.albumList.length; i++) {
		if (objArtist.albumList[i].idAlbum == id) {
			albumIndex = i;
			break;
		}
	}
	
	//populate album track list
	callTrackList = apiTrackList + objArtist.albumList[albumIndex].idAlbum;
	await populateTrackList(callTrackList)	
	
	
		
}


function trackByIndex(z) {
	
	trackIndex = parseInt(trackIndex);
	//From onclick string, used to indicate next or previous
	if (z == 1 | z == -1){
	  if (trackIndex < currentTrackList.length) {
	  trackIndex += z;
	  }
	}
	
	let displayString = "";
		
	if (currentTrackList[trackIndex].strMusicVid != null) {
		displayString += "<h3>Music Video:</h3>";
		
		let str = currentTrackList[trackIndex].strMusicVid;
		let vidID = str.slice(str.indexOf("?v=")+3);
		
		displayString += '<div class=\"ytcontainer\"><iframe class=\"responsive-iframe\" src="https://www.youtube.com/embed/' + vidID + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
		
		//displayString += "<div class=\"ytcontainer\"><iframe class=\"responsive-iframe\" src=\"" + currentTrackList[trackIndex].strMusicVid + "\"></iframe></div><br>";
	}
	
	if (currentTrackList[trackIndex].strDescription != null) {
		//replace/remove escape characters
		currentTrackList[trackIndex].strDescription = currentTrackList[trackIndex].strDescription.replace(/\\n\\n/g, "<br><br>");
		currentTrackList[trackIndex].strDescription = currentTrackList[trackIndex].strDescription.replace(/\\/g, "");
	displayString += "<h3>Track Description:</h3>";
	displayString += currentTrackList[trackIndex].strDescription;
	} else {
		displayString += "<h3>No description available";
	}
		
	document.getElementById("displayPane").innerHTML = displayString;
	
	
	document.getElementById("lblAlbumName").innerHTML = String(currentTrackList[trackIndex].intTrackNumber).padStart(2, '0') + ") " + currentTrackList[trackIndex].strTrack;
	document.getElementById("lblAlbumNameTop").innerHTML = objArtist.albumList[albumIndex].strAlbum;
	
	//Convert album picker to tracks mode
	document.getElementById("albumpicker").style.display = "block";
	document.getElementById("albumname").style.display = "block";
	document.getElementById("albumbar").style.display = "block";
	document.getElementById("lblAlbumNameTop").style.display = "block";
	
	document.getElementById("nextAlbumCover").style.display = "none";
	document.getElementById("nextAlbumArrow").style.display = "none";
	document.getElementById("prevAlbumCover").style.display = "none";
	document.getElementById("prevAlbumArrow").style.display = "none";
		
	//populate display pane
	//Display album name at top
	document.getElementById("lblAlbumNameTop").innerHTML = objArtist.albumList[albumIndex].strAlbum;
	//set albumpicker images
	document.getElementById("activeAlbum").src = objArtist.albumList[albumIndex].strAlbumThumb;
	if (trackIndex < currentTrackList .length-1) {  //check if last track
	document.getElementById("nextTrack").style.display = "inline";
	document.getElementById("nextTrackArrow").style.display = "inline";	
	} else {	
	document.getElementById("nextTrack").style.display = "none";
	document.getElementById("nextTrackArrow").style.display = "none";		
	}
	if (trackIndex > 0) {	//check if first track
	document.getElementById("prevTrack").style.display = "inline";
	document.getElementById("prevTrackArrow").style.display = "inline";	
	} else {
	document.getElementById("prevTrack").style.display = "none";
	document.getElementById("prevTrackArrow").style.display = "none";	
	}
	document.getElementById("displayPane").scrollTo(0, 0);
}

async function trackByID(idNum) {
		
	//find track index
	if (currentTrackList == undefined || currentTrackList.length == 0) {//ensure track list is populated and try again
		await oneTrack(idNum);
		for (let i in currentTrackList) {  
		
			if (currentTrackList[i].idTrack == idNum) {
				trackIndex = i;
				break;
			}
		}
	} else {
	for (let i in currentTrackList) {  
			if (currentTrackList[i].idTrack == idNum) {
				trackIndex = i;
				break;
			} else {  //ensure track list is populated and try again
				await oneTrack(idNum);
				if (currentTrackList[i].idTrack == idNum) {
				trackIndex = i;
				break;
				}
			}
		}
	}
	
	trackByIndex()
	
	
}
	
function updateArrows() {
	
	let tiprev = parseInt(trackIndex)-1;
	let tinext = parseInt(trackIndex)+1;
	
	
	let next = "trackByID(" + currentTrackList[tinext].idTrack + ")";
	let prev = "trackByID(" + currentTrackList[tiprev].idTrack + ")";
			
	document.getElementById("activeAlbum").src = objArtist.albumList[albumIndex].strAlbumThumb;
	document.getElementById("nextAlbumCover").onclick = next;
	document.getElementById("nextAlbumArrow").onclick = next;
	document.getElementById("prevAlbumCover").onclick = prev;
	document.getElementById("prevAlbumArrow").onclick = prev;
	
	if (trackIndex < currentTrackList.length-1) {  //check if last track
	document.getElementById("nextAlbumCover").style.display = "inline";
	document.getElementById("nextAlbumArrow").style.display = "inline";	
	document.getElementById("nextAlbumCover").onclick = next;
	document.getElementById("nextAlbumArrow").onclick = next;
	} else {	
	document.getElementById("nextAlbumCover").style.display = "none";
	document.getElementById("nextAlbumArrow").style.display = "none";		
	}
	if (trackIndex > 0) {	//check if first track
	document.getElementById("prevAlbumCover").style.display = "inline";
	document.getElementById("prevAlbumArrow").style.display = "inline";	
	document.getElementById("prevAlbumCover").onclick = prev;
	document.getElementById("prevAlbumArrow").onclick = prev;
	} else {
	document.getElementById("prevAlbumCover").style.display = "none";
	document.getElementById("prevAlbumArrow").style.display = "none";	
	}
	
}

function testclick(){
	alert("Clicked");
}

async function onLoad(){
	
	await getArtistInfo(callArtist);
	document.getElementById("overL").style.display = "none";
	document.getElementById("btninfoartist").click();
	document.getElementById("btninfoartist").focus();
	
	//Display artist name at top
	document.getElementById("lblArtistName").innerHTML = objArtist.strArtist;
	
	
}