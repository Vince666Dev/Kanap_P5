// const urlParam = new URLsearchParams(window.location.search);
// const id = urlParam.get('id');

// constantes pour transformer l'id des produits dans l'url en strings 
const str = document.location.href
const url = new URL(str);
const id = url.searchParams.get("id");
const qteInvalid = false;


// fetch avec variable de l'id pour récupérer l'id de l'article cliqué sur la page index
fetch(`http://localhost:3000/api/products/${id}`)
    .then( response => response.json())
    .then(function(productsData) {

        
        // injection dans le HTML des variables images, alt, name, price, description dans leur emplacement respectifs.
        document.querySelector(".item__img").innerHTML = `<img src="${productsData.imageUrl}" alt="${productsData.altTxt}">`;
        document.getElementById("title").innerHTML = productsData.name;
        document.getElementById("price").innerHTML = productsData.price;
        document.getElementById("description").innerHTML = productsData.description;
        
        // boucle qui va récupérer les "color" présentent dans "colors"
        for (let color of productsData.colors) {

            // on crée un élément HTML "option" auquel on définie en attribut "value", une de nos "color"
            let option = document.createElement("option");
            option.value = color;
            option.textContent = `${color}`;
            document.querySelector('#colors').appendChild(option);
        }
        
        // on crée l'evenement d'écoute du click sur le bouton ajouter au panier pour récupérer l'id, la couleur et la quantité choisie.
        let btn = document.getElementById("addToCart");
        btn.addEventListener("click", function() {
            let colorUserValue = document.getElementById("colors").value;
            let quantityUserValue = document.getElementById("quantity").value;

            

        // on crée l'object produit qui sera ajouté au local storage
            let newProduct = {
            id : id,
            name: productsData.name,
            color : colorUserValue,
            quantity : quantityUserValue
            };
            
            
        // conditions de choix de couleur et quantité pour pouvoir ajouter au panier    
            
            let addedProducts = localStorage.getItem("userCart");
            addedProducts = JSON.parse(localStorage.getItem("userCart")) || [];
            
            
            if(newProduct.color === "") {
                alert("Merci de sélectionner une couleur");
            }else if (newProduct.quantity <= 0 ) {
                alert("Merci de choisir au moins 1 article");
            }else if (newProduct.quantity > 100 ) {
                alert("Merci de choisir une quantité entre 1 et 100");
            }else{
                if (newProduct === null) {
                    addedProducts = [];
                    addedProducts.push(newProduct);
                    localStorage.setItem("userCart", JSON.stringify(addedProducts));
                    console.log(addedProducts)
                }
                // if ((quantityUserValue.quantity + addedProducts.quantity) > 100 ) {
                //     alert("Quantité maximale de cet article atteinte");
                // }
                else {
                    addedProducts = JSON.parse(newProduct);
                    addedProducts = newProduct.filter (function(element, index) {
                        if (newProduct.id === element.id && newProduct.color === element.color) {
                            newProduct.quantity += element.quantity;
                            if ((newProduct.quantity + element.quantity) > 100 ) {
                                alert("Quantité Maximale Atteinte");
                                qteInvalid = true;
                                return false;
                            }
                        }else{
                            addedProducts.push(newProduct);
                            localStorage.setItem("userCart", JSON.stringify(addedProducts));
                            console.log(addedProducts)
                        }
                    })
                }
                
            };

            

            // newProduct = localStorage.getItem("userCart");
            // addedProducts.JSON.parse("userCart");
            // if(userProduct.id === element.id && userProduct.color === element.color){
            //     userProduct.quantity += element.quantity;
            // };

            // addedProducts.JSON.parse(userCart);
            // addedProducts.filter(function (element){
            //     if(newProduct.color === element.color && newProduct.id === element.id) {
            //         newProduct.quantity += element.quantity;
            //     }
            // }
            
        })

        //  couleur vide
        
// //  quantité mini   
//         }else if (userProduct.quantity === 0) {
//             alert("Merci de sélectionner au moins 1 article");
// // quantité max       
//         }else if (userProduct.quantity < 1 || userProduct.quantity > 100 ) {
//             alert("La quantité doit être comprise entre 1 et 100 articles");
//         }
    })
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //     // Ajout au panier
    //     let addToCart = document.getElementById("addToCart");
    //     addToCart.addEventListener("click", () => {
    //         let userQuantityProduct = document.getElementById("quantity").value;
    //         let userColorProduct = document.getElementById("colors").value;
            
        
    //         //  Récupération du panier
    //     let basketUser = localStorage.getItem("basket");
    // //  couleur vide
    //         if(userProduct.color ==="") {
    //             alert("Merci de sélectionner une couleur");
    // //  quantité mini   
    //         }else if (userProduct.quantity === 0) {
    //             alert("Merci de sélectionner au moins 1 article");
    // // quantité max       
    //         }else if (userProduct.quantity < 1 || userProduct.quantity > 100 ) {
    //             alert("La quantité doit être comprise entre 1 et 100 articles");
    //         }
    //     })
            
            
            
        //     //  Le produit choisi par l'utilisateur {objet}
        // let userProduct = {
        //     id : id,
        //     name : "value".name,
        //     quantity : userQuantityProduct,
        //     color : userColorProduct,
        // }

        //         // Aucun produit dans le panier
        
        //     if(basketUser === null){
        //             basket = [];
        //             confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
        //             basket.push(userProduct);                                       
        //             localStorage.setItem("basket", JSON.stringify(basket));    
        //     }
        
        //         // Un produit est déjà présent dans le panier
        
        //     else{
        //         basket = JSON.parse(basketUser);

        //         basket = basket.filter(function (element, index){
        
        //             // Si un doublon je n'ajoute pas le produit
        
        //                 if(userProduct.id === element.id && userProduct.color === element.color){
        //                     userProduct.quantity += element.quantity;
        //                     if ((userProduct.quantity + element.quantity) > 100){
        //                         alert(`Quantité incorrecte, merci de ne pas dépasser 100 articles. ${element.quantity} déjà présent dans le panier.`);
        //                         qteInvalid = true;
        //                         return false;
        //                     }                   
        //                     confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
        //                     return false;
        //                 }
        
        //             // Si pas de doublon alors j'ajoute le produit
        
        //                 else{
        //                     confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
        //                     return true;
        //                 }
        //             })
        
        //         // Ajout et stockage du produit
        
        //             if(qteInvalid === false){
        //                 basket.push(userProduct);
        //                 localStorage.setItem("basket", JSON.stringify(basket));
        //             }
        //         }            
        //     }
        // })
        // })
        //         .catch(function(err){
        //                 alert("Une erreure est survenue " + err);
        // })


// const selectedColor = document.getElementById("colors");
// const selectedQuantity = document.getElementById("quantity");
// const minQuantity = selectedQuantity.min || 1;
// const maxQuantity = selectedQuantity.max || 100;


// selectedColor.addEventListener("change" , (e) => {
//     console.log(e.target.value);
// })

// selectedQuantity.addEventListener("change" , (e) => {
//     console.log(e.target.value);
// })

// function validateCartInput (document, productsData) {
//     let errors = []

    // let selectedColor = document.getElementById("colors");
    // let selectedQuantity = document.getElementById("quantity");
    // let minQuantity = selectedQuantity.min || 1;
    // let maxQuantity = selectedQuantity.max || 100;

//     let color = selectedColor.value || null;
//     let quantity = selectedQuantity.valueAsNumber || 0;

//     // valider couleur
//     if (!color) {
//         errors.push( new ValidationEntryError('Veuillez choisir une couleur'))
//     } else if (!productsData.colors.includes(color)) {
//         errors.push( new ValidationEntryError('Couleur inconnue'))
//     }

//     // valider quantité
//     if (!Number.isInteger(quantity)) {
//         errors.push(new ValidationEntryError('Quantité invalide'))
//     } else if (quantity < minQuantity || quantity > maxQuantity) {
//         errors.push(new ValidationEntryError('Veuillez choisir une quantité entre 1 et 100'))
//     }

//     if (errors.length === 0) {
//         return { color, quantity }
//     }

//     const err = new ValidationError(errors)
//     throw err
//     }

// function handleAddToCart (document, productsData) {

//     const button = getElementById('addToCart')

//     button.addEventListener('click', (e) => {
//         e.preventDefault()

//     try {
//     // get validated input
//     const { color, quantity } = validateCartInput(document, productsData)

//     // WIP: feedback but nothing is save
//     const nexemplaires = quantity + ' exemplaire' + (quantity >= 2 ? 's' : '')

//     // indicate if cart is updated
//     if (saveToCart(data, color, acc => acc + quantity)) {
//         const message = `Le canapé ${productsData.name} ${productsData.color} a été ajouté en ${nexemplaires} à votre panier`

//         window.alert(message)
//     } else {
//         window.alert(`Une erreur est survenue. Le panier n'a pas été modifié.`)
//     }
//     } catch (err) {
//     console.error(err)

//     if (err instanceof ValidationError) {
//         err.showErrors()
//     }}
// })
// }
      

// let addToCart = document.getElementById("addToCart");
// addToCart.addEventListener("click", (event) => {
//     event.preventDefault();

//     let selectedColorAndQuantity = selectedColor.value // * selectedQuantity.value; //
//     console.log(selectedColorAndQuantity);
// })




// function addToCart() {
//     document
//         .getElementById("colors").selectedIndex
//         .getElementById("itemQuantity").selectedIndex;
        


// }

// function colorSelected() {
//     let select = document.getElementById("colors");
//     let index = select.selectedIndex;
//     alert(select.options[index].value);
// }

    

    // function saveBasket(basket) {
    //     localStorage.setItem("basket", JSON.stringify(basket));
    // }
    
    // function getBasket() {
    //     return JSON.parse(localStorage.getItem("basket"));
    // }
    
    // function addBasket(product) {
    //     let basket = getBasket();
    //     basket.push(product);
    //     saveBasket(basket);
    // }