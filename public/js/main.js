const socket = io();

const messages = [];

const products = [];

function updateProducts(products) {
    let productsToList = "";
    products.forEach(i => {
        productsToList = productsToList + 
        `<div>
            <tbody>
                <tr>
                    <td scope="row"> ${i.id} </td>
                    <td> ${i.title} </td>
                    <td> ${i.price} </td>
                    <td><img src= ${i.thumbnail} alt= ${i.title} style="width:8rem;"></td>
                </tr>
            </tbody> 
        </div>`
    });
    document.querySelector("#productsList").innerHTML = productsToList;
}

socket.on("UPDATE_PRODUCTS", productsArray => {
    productsArray.forEach(i => {
        products.push(i)
    })
    updateProducts(products)
})

function updateMessages(messages) {
    let messagesToList = "";
    messages.forEach(i => {
        messagesToList = messagesToList + 
        `<div class="fw-bold">${i.id}(${i.date}):</div>
        <div>${i.content}</div>`
    });
    document.querySelector("#messagesList").innerHTML = messagesToList;
}

function sendNewMessage() {
    const message = document.querySelector("#message").value;
    const email = document.querySelector("#email").value;
    const date = new Date()
    if (message == "" || email == "") return;
    const messageObject = {
        email,
        message,
        date
    }
    socket.emit("NEW_MESSAGE_CLI", messageObject)
    document.querySelector("#message").value = "";
}

socket.on("NEW_MESSAGE", data => {
    messages.push(data)
    updateMessages(messages)
})

socket.on("UPDATE_DATA", messagesArray => {
    messagesArray.forEach(i => {
        messages.push(i)
    })
    updateMessages(messages)
})

