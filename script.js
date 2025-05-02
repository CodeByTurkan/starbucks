const menus = document.getElementById('menus')
const menuWithPic = document.getElementById('menuWithPic')
const coffeeTypes = document.getElementById('coffeeTypes')
const loader = document.getElementById('loader')
const showCards = document.getElementById('showCards')

let allCoffee = []
async function getData() {
    const res = await fetch('https://starbucks-data-nine.vercel.app/menus')
    const data = await res.json()
    allCoffee = data
    showProducts(data)
    showProductsWithPic(data)
    console.log(data);
    loader.style.display = 'none';
    showCards.style.display = 'block';
}
getData()

function showProducts(data) {
    let code =  ''
    data.map(elm => {
        code += 
        `
            <h3 class="font-bold text-lg">${elm.name}</h3>
        `
        elm.children.map(item=>{
            code += `
            <div onclick="showCoffeeTypes('${item.id}', '${elm.name}')">
                <a  class="text-gray-600 " >${item.name}</a>
            </div>
            `
        })

    })
    menus.innerHTML = code
}


//<h1 class = "text-3xl mb-8 font-bold">Menu</h1>

function showProductsWithPic(data) {
    let code = '';
    data.map(elm => {
      
        code += `
            <div class="mb-8 ">
               
                <h3  class="font-bold text-2xl ">${elm.name}</h3>
                 <hr class="border-b my-6 border-gray-200"/>
                <div class="grid grid-cols-1 min-[768px]:grid-cols-2 gap-4">
        `;
        elm.children.map(item => { 
            code += `

           

                <div onclick="showCoffeeTypes('${item.id}', '${elm.name}')" class="flex items-center gap-3">  
                    <div class="w-20 h-20 lg:w-30 lg:h-30 lg:rounded-full  rounded-full overflow-hidden flex items-center justify-center">
                         <img class="object-cover scale-[1.8]" src="${item.categoryImageURL}" alt="">
                    </div>
                    <a  class="text-lg font-medium">${item.name}</a>
                </div>
            `;
            // onclick id number edir ona gore toString yerine onclikcde etrafina '' yaziriq.
            
    console.log(item.id)
        });

        code += `
                </div>
            </div>
        `;
    });
    menuWithPic.innerHTML = code;
}
function showCoffeeTypes(id, name) {
    menuWithPic.classList.add('hidden')
    let code = ''
    
    let findCoffee = allCoffee.find(elm => elm.name == name).children.find(item => item.id == id )

// data -> drinks == drinks -> childreddaki hotcoffee == hot coffee

    
    findCoffee.children.map(elm => {
        // hot coffee -> childrendaki brewed coffee name - > productsdaki blonde roast
         code += 
         `
         <div class="mb-8">
                <h3 class="font-bold text-2xl mb-4">${elm.name}</h3>
                 <hr class="border-b my-6 border-gray-200"/>
                <div class="grid grid-cols-2 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-3  min-[1280px]:grid-cols-4 gap-4">
        
         `;
         elm.products.map( last => {
            code += `
            <div onclick="window.location.href='details.htm?productNumber=${last.productNumber}'"  class="flex flex-col items-center gap-3">
                 <div class="w-20 h-20 lg:w-30 lg:h-30 lg:rounded-full  rounded-full overflow-hidden flex items-center justify-center">
                         <img class="object-cover scale-[1.8]" src="${last.imageURL}" alt="">
                    </div>
                <a class="text-lg font-medium">${last.name}</a>
            </div>
        `;
         }

         )
         code += `
         </div>
     </div>
 `;
    });

    coffeeTypes.innerHTML = code;
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


// modal
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
