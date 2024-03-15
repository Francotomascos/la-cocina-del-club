let userName;
let selectedFoods = [];
let typeFood;
let foodQuantity;
let addMore;
let total = 0;
const menu = ["hamburguesas", "pizzas", "ensaladas"];
const validateUserName = (name) => /^[a-zA-Z]+$/.test(name.trim()) && name.length >= 3;
const validateFoodQuantity = (quantity) => {
    if (!isNaN(quantity) && parseInt(quantity) > 0) {
        return true;
    } else {
        alert('Error, ingrese un numero valido');
        return false;
    }
};

do {
    userName = prompt("Bienvenido a La Cocina del Club, ¿Cuál es su nombre?");
} while (!validateUserName(userName));

const init = () => {
    do {
        typeFood = prompt(`${userName}, ¿Qué va a ordenar?\n\nMenú:\n- Hamburguesas\n- Pizzas\n- Ensaladas`).toLowerCase();
        if (!menu.includes(typeFood)) {
            alert("Error, ingrese una opción válida");
            continue;
        }
        do {
            foodQuantity = prompt(`¿Cuantas ${typeFood} va a ordenar?`);
        } while (!validateFoodQuantity(foodQuantity));
        const foodObject = {
            type: typeFood,
            quantity: parseInt(foodQuantity)
        }
        selectedFoods.push(foodObject);

        do {
            addMore = prompt('¿Desea pedir algo mas?\n\n-Si\n-No').toLowerCase();
        } while (addMore !== 'si' && addMore !== 'no');

        if (addMore === 'no') break;
    } while (true);

    let orderList = "Su pedido:\n";
    selectedFoods.forEach(function (item) {
        orderList += `- ${item.quantity} ${item.type}\n`;
    });
    alert(orderList);

    let removeItem;
    do {
        removeItem = prompt("¿Desea eliminar algo de su pedido? (Si/No)").toLowerCase();
        if (removeItem === 'si') {
            let itemToRemove;
            do {
                itemToRemove = prompt("¿Qué producto desea eliminar?");
            } while (!selectedFoods.find(item => item.type === itemToRemove.toLowerCase()));
            selectedFoods = selectedFoods.filter(item => item.type !== itemToRemove.toLowerCase());
            orderList = "Su pedido actualizado:\n";
            selectedFoods.forEach(item => {
                orderList += `- ${item.quantity} ${item.type}\n`;
            });
            if (selectedFoods.length > 0) alert(orderList);
        }
    } while (removeItem !== 'no' && selectedFoods.length > 0);

    selectedFoods.forEach(item => {
        if (item.type === 'hamburguesas') {
            total += 5000 * item.quantity;
        } else if (item.type === 'pizzas') {
            total += 3500 * item.quantity;
        } else if (item.type === 'ensaladas') {
            total += 2000 * item.quantity;
        }
    });

    if (selectedFoods.length > 0) alert(`El costo total de su pedido es: $${total}. \n\n¡Que lo disfrutes ${userName}!`)
    else {
        let restart = prompt('Tu orden esta vacia, desea volver a ordenar? (Si/No)').toLowerCase()
        if (restart === 'si') init()
        else alert('Hasta pronto!')
    }
}

init()