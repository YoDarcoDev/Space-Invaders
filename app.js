const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20; 


function createGrilleEtAliens() {

    let indexAttr = 0;

    for (i = 0; i < 240; i++) {     // 240 éléments cases

        if (indexAttr === 0) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', true);
            container.appendChild(bloc);
            indexAttr ++;
        }
        else if (indexAttr === 19) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', true);
            container.appendChild(bloc);
            indexAttr = 0;
        }
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }

    for (i = 1; i < 53; i++) {          // i=1 car il demarre à la 2ème case

        if (i === 13) {                 // Affiche 12 aliens par ligne, et change de ligne
            i = 21;
            alienInvaders.push(i)
        }
        
        else if (i === 33) {
            i = 41;
            alienInvaders.push(i)
        }

        else {
            alienInvaders.push(i);
        }
    }

    console.log(alienInvaders);

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    })

    toutesLesDivs[tireurPosition].classList.add('tireur')

}


createGrilleEtAliens();


// DEPLACER LE TIREUR
function deplacerLeTireur(e) {

    toutesLesDivs[tireurPosition].classList.remove('tireur');

    if (e.keyCode === 37) {

        if (tireurPosition > 220) {
            tireurPosition -= 1;
        }
    }

    if (e.keyCode === 39) {

        if (tireurPosition < 239) {
            tireurPosition += 1;
        }
    }

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

document.addEventListener('keydown',deplacerLeTireur);



// DEPLACER LES ALIENS 
let descendreRight = true;
let descendreLeft = true;


function deplacerLesAliens() {

    for (let i = 0; i < alienInvaders.length; i++) {

// Descendre une ligne a doite
        if(toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true') {

            if (descendreRight) {
                direction = 20;
                setTimeout(() => {
                    descendreRight = false;
                }, 50);
            }

            else if (descendreRight === false) {
                direction = -1;
            }

            descendreLeft = true;  // A partir du 2ème tout Left est à false 
        }

// Descendre une ligne à gauche
        else if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {

            if (descendreLeft) {
                direction = 20;
                setTimeout(() => {
                    descendreLeft = false;
                }, 50);
            }

            else if (descendreLeft === false) {
                direction = 1;
            }

            descendreRight = true;
        }
    }


    for (let i = 0; i < alienInvaders.length; i++) {

        toutesLesDivs[alienInvaders[i]].classList.remove('alien')       // on fait disparaitre tous les aliens du tableau
    }

    for (let i = 0; i < alienInvaders.length; i++) {

        alienInvaders[i] += direction                                   // on les déplace
    }

    for (let i = 0; i < alienInvaders.length; i++) {

        toutesLesDivs[alienInvaders[i]].classList.add('alien')          // on fait réaparaitre tous les aliens du tableau
    }

    // Fin de partie

    if (toutesLesDivs[tireurPosition].classList.contains('alien', 'tireur')) {
        affichage.innerText = "Game Over";
        toutesLesDivs[tireurPosition].classList.add('boom');
        clearInterval(invaderId);
    }

    for (i = 0; i < alienInvaders.length; i++) {

        if (alienInvaders[i] > toutesLesDivs.length - width) {
            affichage.textContent = "Game Over";
            clearInterval(invaderId);
        }
    }
}


invaderId = setInterval(deplacerLesAliens, 400);  // Tous les 500ms 



// LE LASER
function tirer(e) {

    let laserId;
    let laserEnCours = tireurPosition;

    function deplacementLaser() {

        toutesLesDivs[laserEnCours].classList.remove('laser');
        laserEnCours -= width;     // width -= 20 donc -20 on remonte
        toutesLesDivs[laserEnCours].classList.add('laser');

        if (toutesLesDivs[laserEnCours].classList.contains('alien')) {
            toutesLesDivs[laserEnCours].classList.remove('laser');
            toutesLesDivs[laserEnCours].classList.remove('alien');
            toutesLesDivs[laserEnCours].classList.add('boom');

            alienInvaders = alienInvaders.filter(el => el !== laserEnCours)   // alien qui n'ont pas été touché

            setInterval(() => {
                toutesLesDivs[laserEnCours].classList.remove('boom');
            }, 250);

            clearInterval(laserId);  


            // Gestion de fin de partie

            resultats ++;

            if (resultats === 36) {     // 3x12 aliens
                affichage.textContent = "Bravo, vous avez gagné !";
                clearInterval(invaderId);
            }

            else {
                affichage.innerText = `Score : ${resultats}`;
            }
        }
   
        if (laserEnCours < width) {
            clearInterval(laserId);
            setTimeout(() => {
                toutesLesDivs[laserEnCours].classList.remove('laser');
            }, 100)
        }
    }

    if (e.keyCode === 32) {
        laserId = setInterval(() => {
            deplacementLaser();
        },100)
    }
}

document.addEventListener('keyup', tirer);