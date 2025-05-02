const productNumber = new URLSearchParams(window.location.search).get("productNumber")
 const details = document.getElementById('details')
 
async function getData() {
    const res = await  fetch('https://starbucks-data-nine.vercel.app/menus')
    const data = await res.json()
    searchProduct(data)
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
        <div class="bg-[#1F3933] flex w-full">
            <img src="${findProduct.imageURL}" alt="${findProduct.name}" class="h-80 object-cover rounded-full mx-40" />  
            <h1 class="text-2xl flex items-center justify-center text-[#fff] font-bold">${findProduct.name}</h1>
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