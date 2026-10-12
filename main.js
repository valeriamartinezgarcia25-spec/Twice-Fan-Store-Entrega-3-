const PRECIO_ALBUM = 65000;
const PRECIO_PHOTOCARDS = 15000;
const COSTO_ENVIO = 12000;
const DESCUENTO = 0.1; // 10%
const MINIMO_DESCUENTO = 150000;

function pedirCantidad(producto, stock) {
    let cantidad = 0;
    let valido = false;
    while (!valido) {
        const respuesta = prompt("¿Cuántos " + producto + " quieres? (Stock: " + stock + ")\nEscribe 0 para cancelar");
        if (respuesta === null) {
            cantidad = 0;
            valido = true;
        } else {
            cantidad = parseInt(respuesta);

            if (isNaN(cantidad) || cantidad < 0) {
                alert("Cantidad inválida, escribe un número");
            } else if (cantidad > stock) {
                alert("Solo quedan " + stock + " " + producto);
            } else {
                valido = true;
            }
        }
    }

    return cantidad;
}
const calcularSubtotal = (cantidad, precio) => cantidad * precio;

const calcularDescuento = function (subtotalCompra) {
    if (subtotalCompra >= MINIMO_DESCUENTO) {
        return subtotalCompra * DESCUENTO;
    } else {
        return 0;
    }
};

function mostrarResumen(nombreCliente, albumes, photocards, subtotalCompra, descuentoCompra, totalCompra) {
    let resumen = "Resumen de " + nombreCliente + ":\n";
    resumen = resumen + "Álbumes: " + albumes + "\n";
    resumen = resumen + "Photocards: " + photocards + "\n";
    resumen = resumen + "Subtotal: $" + subtotalCompra + "\n";
    resumen = resumen + "Descuento: $" + descuentoCompra + "\n";
    resumen = resumen + "Envío: $" + COSTO_ENVIO + "\n";
    resumen = resumen + "TOTAL: $" + totalCompra;

    console.log(resumen);
    alert(resumen);
}

function mostrarCuotas(totalCompra) {
    console.log("Opciones de pago:");

    for (let cuotas = 1; cuotas <= 3; cuotas++) {
        const valorCuota = Math.round(totalCompra / cuotas);

        if (cuotas === 1) {
            console.log("- De contado: $" + valorCuota);
        } else {
            console.log("- " + cuotas + " cuotas de $" + valorCuota);
        }
    }
}

let stockAlbum = 10;
let stockPhotocards = 20;
let cantidadAlbum = 0;
let cantidadPhotocards = 0;
let subtotal = 0;
let cantidad = 0;
let seguirComprando = true;

const nombre = prompt("¿Cómo te llamas?");
alert("Hola " + nombre + ", bienvenido/a a la Twice Fan Store");

while (seguirComprando) {

    const opcion = prompt(
        "MENÚ\n\n" +
        "1 - Álbum ($" + PRECIO_ALBUM + ") - Stock: " + stockAlbum + "\n" +
        "2 - Pack de photocards ($" + PRECIO_PHOTOCARDS + ") - Stock: " + stockPhotocards + "\n" +
        "3 - Ver carrito y pagar\n" +
        "0 - Salir"
    );

    switch (opcion) {

        case "1":
            cantidad = pedirCantidad("álbumes", stockAlbum);

            if (cantidad > 0) {
                stockAlbum = stockAlbum - cantidad;
                cantidadAlbum = cantidadAlbum + cantidad;
                subtotal = subtotal + calcularSubtotal(cantidad, PRECIO_ALBUM);
                console.log("Agregaste " + cantidad + " álbum(es). Subtotal: $" + subtotal);
            } else {
                console.log("No se agregaron álbumes");
            }
            break;

        case "2":
            cantidad = pedirCantidad("packs de photocards", stockPhotocards);

            if (cantidad > 0) {
                stockPhotocards = stockPhotocards - cantidad;
                cantidadPhotocards = cantidadPhotocards + cantidad;
                subtotal = subtotal + calcularSubtotal(cantidad, PRECIO_PHOTOCARDS);
                console.log("Agregaste " + cantidad + " pack(s) de photocards. Subtotal: $" + subtotal);
            } else {
                console.log("No se agregaron photocards");
            }
            break;

        case "3":
            if (subtotal === 0) {
                alert("Tu carrito está vacío, agrega algo primero");
            } else {
                const descuento = calcularDescuento(subtotal);
                const total = subtotal - descuento + COSTO_ENVIO;

                mostrarResumen(nombre, cantidadAlbum, cantidadPhotocards, subtotal, descuento, total);
                mostrarCuotas(total);

                alert("¡Gracias por tu compra!");
                seguirComprando = false; 
            }
            break;

        case "0":
        case null: 
            alert("¡Hasta pronto!");
            console.log("El usuario salió sin comprar");
            seguirComprando = false;
            break;

        default:
            alert("Opción no válida, elige entre 0 y 3");
            break;
    }
}

console.log("Fin del simulador");