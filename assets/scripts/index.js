////FUNCTIONS////
function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

//not currently used
//function openRedirect(url) {
//    window.location.href = url;
//}

// Function to add or remove the "sticky" class to the navbar
function toggleStickyNavbar() {
  var navbar = document.querySelector(".navbar");
  var navbarWrapper = document.querySelector(".navbar-wrapper");
  var placeholder = document.querySelector(".navbar-placeholder");

  if (window.pageYOffset >= navbarWrapper.offsetTop) {
    navbar.classList.add("sticky");
    placeholder.style.height = navbar.offsetHeight + "px";
  } else {
    navbar.classList.remove("sticky");
    placeholder.style.height = "0";
  }
}


///EVENTS///

//Load default page//
document.getElementById("defaultOpen").click();

// Sticky navbar
window.onscroll = function () {
  toggleStickyNavbar();
};
toggleStickyNavbar();


