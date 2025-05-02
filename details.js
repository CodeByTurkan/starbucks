const productNumber = new URLSearchParams(window.location.search).get("productNumber")
 const details = document.getElementById('details')
 const loader = document.getElementById('loader')
const showCards = document.getElementById('showCards')
 
    

async function getData() {
    const res = await  fetch('https://starbucks-data-nine.vercel.app/menus')
    const data = await res.json()
    searchProduct(data)
    loader.style.display = 'none';
    showCards.style.display = 'block';

  
}
getData()

let findProduct = null
function searchProduct(data) {
    let code = ''
    for (let obj of data) {
        if (obj.products) {
            for (let product of obj.products) {
                if (product.productNumber == productNumber) {
                    findProduct = product;
                    return; // we finish the function
                }
            }
        }
        if (obj.children) searchProduct(obj.children)
            // eger product bosdusa diger obja kecmek ucun childrene gir ve yeniden eyni func qaytarir yeniden products search edirik. Ynei ancaq prodcut yoc children icinede bax.
    }

    if (findProduct) {
        code = 
        `
        <div class="flex flex-col lg:flex-row items-center justify-between w-[80%] mx-auto">
            <img src="${findProduct.imageURL}" alt="${findProduct.name}" class="w-[50%] object-cover rounded-full " />  
            <h1 class="text-4xl w-[50%] flex items-center justify-center text-[#fff] font-bold">${findProduct.name}</h1>
        </div>
        `
    }
    else { code = '<p>No Product Found!</p>'}
    details.innerHTML = code
}





// accordion
let open = false;
function openAccordion(id, elm, icon) {
    const element = document.getElementById(id);
    const liId = document.getElementById(elm)
    const iconId = document.getElementById(icon)
    if (open) {
        element.style.maxHeight = "0px";
        iconId.style.transform = "rotate(0deg)";
    } else {
        element.style.maxHeight = element.scrollHeight + "px"; // dynamic height
        liId.classList.remove('pb-10')
        liId.classList.add('pb-5')
        iconId.style.transform = "rotate(180deg)";

    }

     open = !open;
}

// menu
const mobileMenu = document.getElementById('mobileMenu');
const menuBtn = document.getElementById('menuBtn');
const xBtn = document.getElementById('xBtn');


function showMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    menuBtn.classList.add('hidden')
    xBtn.classList.remove('hidden')
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    menuBtn.classList.remove('hidden')
    xBtn.classList.add('hidden')
}

// basket
const shoppingModal = document.getElementById('shoppingModal')
const backdrop = document.getElementById('backdrop')


function openModal() {
    shoppingModal.classList.remove('hidden');
    backdrop.classList.remove('hidden');
  }

  function closeModal() {
    backdrop.classList.add('hidden');
    shoppingModal.classList.add('hidden');
  }

  const coffeeName = document.getElementById('coffeeName')
  const count = document.getElementById('count')
  const totalCount = document.getElementById('totalCount')



// basket
let productInCart = null;

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addProduct() {
    if (!findProduct) return;
  
    let cart = getCart();
    const existingProduct = cart.find(p => p.name === findProduct.name);
  
    if (existingProduct) {
      existingProduct.count++;
    } else {
      cart.push({ name: findProduct.name, count: 1 });
    }
  
    saveCart(cart);
    renderCart();
  }
  
  function changeCount(name, delta) {
    let cart = getCart();
    const product = cart.find(p => p.name === name);
  
    if (product) {
      product.count += delta;
      if (product.count <= 0) {
        // Remove if count goes to 0
        cart = cart.filter(p => p.name !== name);
      }
    }
  
    saveCart(cart);
    renderCart();
  }
  
  function deleteProduct(name) {
    let cart = getCart().filter(p => p.name !== name);
    saveCart(cart);
    renderCart();
  }
  
  function renderCart() {
    const modalBody = document.querySelector(".space-y-4");
    const cart = getCart();
    modalBody.innerHTML = "";
  
    let total = 0;
  
    cart.forEach(product => {
      total += product.count;
  
      const div = document.createElement("div");
      div.className = "flex justify-between items-center border-b pb-2";
      div.innerHTML = `
        <div>
          <p class="font-medium text-gray-800">${product.name}</p>
          <p class="text-sm text-gray-500">
            Count: <span>${product.count}</span>
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <button onclick="changeCount('${product.name}', -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <button onclick="changeCount('${product.name}', 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          <button onclick="deleteProduct('${product.name}')" class="text-red-500 text-xl hover:text-red-700">&times;</button>
        </div>
      `;
      modalBody.appendChild(div);
    });
  
    totalCount.textContent = total;
  }
  
  renderCart()

