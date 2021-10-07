let panier = [0,0,0,0,0,0,0];
let titresCours = ["UX/UI", "PHP 8", "React JS", "Node JS", "MySQL","Python","VueJS",];

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


let notifZone = document.createElement('ul');
notifZone.classList.add('notification_container');
document.querySelector('body').appendChild(notifZone);

const courses = document.getElementsByClassName('course__item');
const infoCours = document.getElementsByClassName('info__card');
const carts = document.getElementsByClassName('add-to-cart');

document.getElementById('empty-cart').addEventListener('click', resetPanier);
function resetPanier(event){
    event.preventDefault();
    for (let i =0; i<panier.length; i++){
        panier[i]=0;
    }
    notif("Le panier a été vidé avec succès");
    affichage();
}

for (let i = 0; i < carts.length; i++) {

    const cart = carts[i];

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('suppr');
    deleteButton.classList.add('hidden');
        
    infoCours[i].appendChild(deleteButton);


    cart.addEventListener('click', function (event) {
            const target = event.target;
            
            
            event.preventDefault();
            if (panier[i]<10){
                panier[i]++;
                notif("Le cours "+titresCours[i]+" a été ajouté au panier !");
            }
            else{
                notif("Le cours "+titresCours[i]+" n'est plus en stock", 5000);
            }

            affichage(); 
    
        })
    
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
    infoCours.forEach(function(item, index, array){
        let stock = item.querySelector('.stock');
        stock.textContent = (10-panier[index]);
        let deleteButton = item.querySelector('.suppr');
        if (panier[index]<1){
            deleteButton.classList.add('hidden');
        } else {
            deleteButton.classList.remove('hidden');
        }
    })
}

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