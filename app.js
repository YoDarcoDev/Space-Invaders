const container = document.querySelector('.grille');
let toutesLesDivs;
let alienInvaders = [];


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


        console.log(i);
}

createGrilleEtAliens();