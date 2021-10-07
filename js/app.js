//initialisation du panier qui stocke les cours dans chaque élement d'un tableau
let panier = [0,0,0,0,0,0,0];
//initialisation des titres des cours qui stocke les titres dans chaque élement d'un tableau
let titresCours = ["UX/UI", "PHP 8", "React JS", "Node JS", "MySQL","Python","VueJS"];

// boucle qui permet que à chaque fois on rajoute un élement à nos 2 tableaux panier et titreCours, cela permet donc de créer un nouveau cours avec son cours prix etc ...
for (i=5; i<titresCours.length; i++){
    let nouveauCours = document.createElement('div');
    nouveauCours.classList.add('course__item');
    nouveauCours.innerHTML = `<figure class="course_img">
        <img src="img/courses/${titresCours[i]}.png">
        </figure>
        <div class="info__card">
        <h4>${titresCours[i]}</h4>
        <figure class="mark m_4">
        <img src="img/rates.png">
        </figure>
        <p>
        <span class="price">200 €</span>
        <span class="discount">9.99 €</span>
        </p>
        <p>
        Disponible: <span class="stock">10</span>
        </p>
        <a href="#" class="add-to-cart" data-id="5"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
        </div>`;
    document.querySelector('.course__item').parentNode.appendChild(nouveauCours);
}

//notifZone est une variable ul qui crée une liste de notis et lui applique la classe notification_container pour ainsi utiliser son style dans le fichier css
let notifZone = document.createElement('ul');
notifZone.classList.add('notification_container');
document.querySelector('body').appendChild(notifZone);

// création de 3 variables pour récuperer des éléments du fichier HTML
const courses = document.getElementsByClassName('course__item');    //balise contenant un cours
const infoCours = document.getElementsByClassName('info__card');    //infos sur un cours
const carts = document.getElementsByClassName('add-to-cart');       //bouton ajouter au panier

//récupération de l'id empty-card qui est l'id du bouton --> Vider le panier 
document.getElementById('empty-cart').addEventListener('click', resetPanier);

//fonction qui va vider le panier en intitialisant tous les cours ajouter dans le panier à 0
function resetPanier(event){
    event.preventDefault();
    for (let i = 0; i<panier.length; i++){
        panier[i]=0;
    }
    notif("Le panier a été vidé avec succès");
    affichage();
}

//boucle qui va être l'intéraction principale entre l'utilisateur et le site pour la fonction d'ajouter et supprimer les cours dans le panier 

for (let i = 0; i < carts.length; i++) {

    const cart = carts[i];
    cart.style.position = 'static';
    cart.style.display = 'inline-block';

    //creation du bouton supprimer en lui ajoutant la class suppr et hidden 
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('suppr');
    deleteButton.classList.add('hidden');
    //Style css du bouton delete 
    deleteButton.style.backgroundColor = '#ca0020';
    deleteButton.style.color = '#ffffff';
    deleteButton.style.border = '2px solid #000000';
    deleteButton.style.display = 'inline-block';
    deleteButton.style.width = '70px';
    deleteButton.style.padding = '0px';
    
    infoCours[i].appendChild(deleteButton);

    //evenement de lorsqu'on clique sur le bouton ajouter dans la card de notre cours, cela ajoute dans le panier 
    //en récupérant l'élément de notre tableau en tant qu'indice
    cart.addEventListener('click', function (event) {
            const target = event.target;
            
            
            event.preventDefault();
            
            // condition de limitation de notre nombre d'achat de notre cours avec notre indice de notre tableau
            if (panier[i]<10){
                panier[i]++;
                notif("Le cours "+titresCours[i]+" a été ajouté au panier !");
            }

            //condition de sinon l'élement dépasse plus de 10 alors on aura une notification le cours + titresCours[i] + n'est plus en stock avec les sec qui est le temps que la notif s'affiche et disparaissent
            else{
                notif("Le cours "+titresCours[i]+" n'est plus en stock", 5000);
            }
            
            affichage(); 
    
        })
    
    //evenement de lorsqu'on clique sur le bouton delete de la card de notre cours, cela enleve un au nombre d'items dans le panier 
    //en récupérant l'élément de notre tableau en tant qu'indice
    deleteButton.addEventListener('click', function (event) {
        const target = event.target;
        
        event.preventDefault();

        panier[i]--;
        notif("Le cours "+titresCours[i]+" a été retiré du panier !");
        
        affichage();

    })

}

function affichage(){
    let infoCours = document.querySelectorAll('.info__card');
    // pour chaque cours 
    infoCours.forEach(function(item, index, array){
        let stock = item.querySelector('.stock');
        stock.textContent = (10-panier[index]);
        //actualise le nombre d'item disponible 
        let deleteButton = item.querySelector('.suppr');
        if (panier[index]<1){
            deleteButton.classList.add('hidden');

        } 
        // cache le bouton supprimer lorqu'on a pas ajouter de cours 
        else {
            deleteButton.classList.remove('hidden');
        }
    })
}

//fonction notification qui prend en paramètre le message de la notif qui est dans un un p et le temps que le notification sera actif
function notif(message, ms=3000){
    let contenu = document.createElement('li');
    contenu.classList.add('content');

    let img = document.createElement("img");
    img.src = "img/info.png";
    contenu.appendChild(img);

    p = document.createElement('p');
    p.textContent = message;
    contenu.appendChild(p);

    notifZone.prepend(contenu);

    let elem = notifZone.querySelector('.content');
    
    setTimeout(function(){
        elem.parentNode.removeChild(elem);
    },ms);
}

affichage(panier);