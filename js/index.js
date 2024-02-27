let userName
let selectedFoods = {}
let typeFood
let foodQuantity
let addMore
let total = 0
const menu = ["hamburguesas", "pizzas", "ensaladas"]
const validateUserName = (name) => /^[a-zA-Z]+$/.test(name.trim()) && name.length >= 3;
const validateFoodQuantity = (quantity) => {
    if (!isNaN(quantity) && parseInt(quantity) > 0) {
        return true
    } else {
        alert('Error, ingrese un numero valido')
        return false
    }
}

do {
    userName = prompt("Bienvenido a La Cocina del Club, ¿Cuál es su nombre?");
} while (!validateUserName(userName));

do {
    typeFood = prompt(`${userName}, ¿Qué va a ordenar?\n\nMenú:\n- Hamburguesas\n- Pizzas\n- Ensaladas`).toLowerCase();
    if (!menu.includes(typeFood)) {
        alert("Error, ingrese una opción válida");
        continue
    }
    do {
        foodQuantity = prompt(`¿Cuantas ${typeFood} va a ordenar?`)
    } while (!validateFoodQuantity(foodQuantity));

    if (selectedFoods[typeFood]) selectedFoods[typeFood] += parseInt(foodQuantity)
    else selectedFoods[typeFood] = parseInt(foodQuantity)

    do {
        addMore = prompt('¿Desea pedir algo mas?\n\n-Si\n-No').toLowerCase()
    } while (addMore !== 'si' && addMore !== 'no');

    if (addMore === 'no') break
} while (true)

for (let type in selectedFoods) {
    if (type === 'hamburguesas') {
        total += 5000 * selectedFoods[type];
    } else if (type === 'pizzas') {
        total += 3500 * selectedFoods[type];
    } else if (type === 'ensaladas') {
        total += 2000 * selectedFoods[type];
    }
}

alert(`El costo total de su pedido es: $${total}. \n\n¡Que lo disfrutes ${userName}!`);