// Récupération de l'id de commande présent dans l'url.
let orderId = new URLSearchParams (document.location.search).get("orderId");

// Affichage de l'id de la commande dans le message de confirmation de commande.
document.querySelector("#orderId").textContent = `${orderId}`;