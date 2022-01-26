/******************************** Burger Menu ******************************/ 

var burger = document.querySelector('.btn-menu')
var mynav = document.querySelector('.sidebar');
var croix = document.querySelector('.btn-close-sidebar');

/* ouvrir la fenêtre */ 

burger.addEventListener('click', hasClick);

    function hasClick() {
        mynav.classList.toggle("active");
    }

/*fermer la fenêtre */

croix.addEventListener('click', hasClick2);

function hasClick2 () {
    mynav.classList.remove("active")
}