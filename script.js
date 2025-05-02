const menus = document.getElementById('menus')
const menuWithPic = document.getElementById('menuWithPic')
const coffeeTypes = document.getElementById('coffeeTypes')
let allCoffee = []
async function getData() {
    const res = await fetch('https://starbucks-data-nine.vercel.app/menus')
    const data = await res.json()
    allCoffee = data
    showProducts(data)
    showProductsWithPic(data)
    console.log(data);
    
}
getData()

function showProducts(data) {
    let code =  ''
    data.map(elm => {
        code += 
        `
         <div>
            <h3 class="font-bold text-lg">${elm.name}</h3>
        </div>
       
        `
        elm.children.map(item=>{
            code += `
            <div  onclick="showCoffeeTypes('${item.id}', '${elm.name}')">
                <a  class="text-gray-400" >${item.name}</a>
            </div>
            `
        })

    })
    menus.innerHTML = code
}

function showProductsWithPic(data) {
    let code = '';
    data.map(elm => {
      
        code += `
            <div class="mb-8">
                <h3  class="font-bold text-2xl mb-4">${elm.name}</h3>
                <div class="grid grid-cols-2 gap-4">
        `;
        elm.children.map(item => { 
            code += `
                <div onclick="showCoffeeTypes('${item.id}', '${elm.name}')" class="flex flex-col items-center gap-2">
                    <img class="w-14 h-14 rounded-full object-contain" src="${item.categoryImageURL}" alt="">
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
                <div class="grid grid-cols-2 gap-4">
        
         `;
         elm.products.map( last => {
            code += `
            <div onclick="window.location.href='details.htm?productNumber=${last.productNumber}'"  class="flex flex-col items-center gap-2">
                <img class="w-14 h-14 rounded-full object-contain" src="${last.imageURL}" alt="">
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

