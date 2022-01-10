import {cartData} from './data.js';

let tableContainer = document.getElementById('table-body')
let changeOrders = document.getElementsByClassName('change-order')
let amountElements = document.getElementsByClassName('amount')
let shippingPrice = document.getElementById('shipping')
let totalPrice = document.getElementById('total-price');
let submitBtn = document.getElementById('submit');
const inputs = document.querySelectorAll("input");
const selectCountry = document.querySelectorAll('select')


const cart = async () => {

    let template = ''

    cartData.forEach(item => {

        template+=`
        <tr>
            <td class="img">
                <img src="${item.image_url}" alt="${item.name}">
            </td>
            <td>
                <div class="flex flow">
                    <div class="flow" style="--flow-space: 0.3rem">
                        <p class="name fs-200">${item.name}</p>
                        <p class="">
                            <span class="price fs-300 text-light">$${item.price}</span>
                            <span class="former-price fs-100 strikethrough">$${item.former_price}</span>
                        </p>
                    </div>
                    <div class="price-control text-primary">
                        <button class="decrement change-order" data-change="decrement">-</button>
                        <input class="amount" type="number" min="1" max="10000" maxlength="5" size="6" placeholder="1" value="${item.no_ordered ? item.no_ordered : ""}"></span>
                        <button class="increment change-order" data-change="increment">+</button>
                    </div>
                </div>
            </td>
        </tr>

        `
    })

  tableContainer.innerHTML = template;

}

const loadCartButton = (e) => {
    
    // change order buttons
    Array.from(changeOrders).forEach((btn) => {
        
        btn.addEventListener('click', () => {

            let parentNode = btn.parentNode

            let inputAmount = parentNode.querySelector('input')
            let amount = parseInt( inputAmount.value, 10)
            amount = isNaN(amount) ? 0 : amount
            
            let buttonCommand = btn.getAttribute('data-change')
            
            if (buttonCommand == 'increment') {
                if (amount < 10000) amount++;
            } else if (buttonCommand == 'decrement') {
                if (amount > 0) amount--;
            }
            inputAmount.value = amount
            
            inputAmount.dispatchEvent(new Event('change', { 'bubbles': true }))

        })
    })


}


const getCartTotal = () => {
    Array.from(amountElements).forEach(amount => {
        amount.addEventListener('change', (e) => {
            getValuesOnLoad()
        })
        
    })
    
}

const calculateTotal = (cartArray) => {
    let shipping = 0
    let priceTotal = cartArray.reduce((acc, curr) => { return acc + (curr.price * curr.order);  }, 0)
    
     if (priceTotal > 0) {
        shipping = 19
        priceTotal += shipping
    }
    shippingPrice.innerText = `$${shipping}`
    return priceTotal
}

const getValuesOnLoad = () => {
    let total = 0;
    let cartArray = []

    Array.from(amountElements).forEach(amount => {
        
        let parent = amount.parentNode.parentNode
        let price = parseFloat(parent.querySelector('p span.price').innerText.split('$')[1], 10)
        let order = amount.value ? parseInt(amount.value, 10) : 0;
        cartArray.push({price, order})
    })
    total = calculateTotal(cartArray)
    
    totalPrice.innerText = `$${total.toFixed(2)}`
}

const formValidation = () => {
    let formError = false
    let formElements = Array.from(document.myForm.elements)

    formElements.forEach(field => {
        field.addEventListener('input', () => {
            validateInput(field)
        })
        
    })

    // inputs.forEach(input => {
    //     console.log(input)
    //     input.addEventListener('input', () => {
            
    //         validateInput(input)
    //     })
    // })

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        
        
        formElements.forEach(field => {
            validateInput(field)
        })

        let errorMessages = document.querySelectorAll('.error')
        errorMessages.forEach(errorMessage => {
            
            if (!!errorMessage.innerText) {
                formError = true
            } else {
                formError = false
            }
        })
        if (!formError) alert('Your order has been placed successfully')
    return formError
    })
    
}

const validateInput = (input) => {
    
    if (input.type !== 'checkbox' && input.type !== 'submit') {
        
        let error = input.parentNode.nextElementSibling
        let label = input.parentNode.previousElementSibling.innerText

        if (input.value.trim() == "") {
            error.textContent = `${label} cannot be blank`
        } else {
            const emailRegex = /\S+@\S+\.\S+/
            if (input.type === 'email' && !emailRegex.test(input.value)) {
                error.innerText = "Please enter valid email"
            } else if (input.type === 'number' && isNaN(input.value)) {
                error.innerText = "Valid numbers only!"
            }else {
                error.innerText = ""
            }
        }



        
    }
}


window.addEventListener('DOMContentLoaded', () => {
    cart();
    formValidation();
    loadCartButton();
    getCartTotal();
    getValuesOnLoad();
})


