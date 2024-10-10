let allPets = async() => {
    let res =await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    let data =await res.json()
    showPetsItem(data.pets)
}




let sorting = async () => {
  let res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  let data = await res.json();
  
  let sortedPets = data.pets.sort((a, b) => b.price - a.price); 
  
  showPetsItem(sortedPets);
};


let showPetsItem = (data) => {
    document.querySelector("#spinner").style.display = "none"
    let showPetsCard = document.querySelector("#all-items")
        showPetsCard.innerHTML = ""

        if(data.length === 0){
            let div = document.createElement("div")
            div.classList = "col-span-12 lg:col-span-12 w-12/12 lg:w-9/12 my-52 py-20 mx-auto rounded-lg p-3 grid grid-cols-1 lg:grid-cols-1"
            div.innerHTML = `<div class=" flex justify-center">
            <img class="text-center" src="./images/error.webp" alt="">
            </div>
          <h1 class="text-3xl my-5 text-center">No Information Available</h1>
          <p class="text-xs text-center text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>`
            showPetsCard.appendChild(div)
            return
        }

    data.forEach(element => {

        let {image, pet_name, breed, date_of_birth, gender, price ,petId} = element

          

        let div = document.createElement("div")
        div.classList = "card bg-base-100 px-3 py-3 w-auto border-2 shadow-xl"
        div.innerHTML = `
                  <img
                    src="${image}"
                    alt="Shoes"
                    class="rounded-xl" />
                <div class="">
                  <h2 class="my-3 text-sm font-bold ">${pet_name !== undefined && pet_name !== null ? pet_name : 'Unknown Pet Name'}</h2>
                  <div class="flex gap-1">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=oYhzeDCgzsVo&format=png" alt="">
                    <p class="text-xs mb-2 text-gray-600">Breed: ${breed !== undefined && breed !== null ? breed : 'Unknown Pet Breed'}</p>
                  </div>
                  <div class="flex gap-1">
                    <img class="w-4 h-4"  src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt="">
                    <p class="text-xs mb-2 text-gray-600">Birth: ${date_of_birth !== undefined && date_of_birth !== null ? date_of_birth : 'Unknown Birth'}</p>
                  </div>
                  <div class="flex gap-1">
                    <img class="w-4 h-4"  src="https://img.icons8.com/?size=80&id=70834&format=png" alt="">
                    <p class="text-xs mb-2 text-gray-600">Gender: ${gender !== undefined && gender !== null ? gender : 'Unknown Gender'}</p>
                  </div>
                  <div class="flex gap-1">
                    <img class="w-4 h-4"  src="https://img.icons8.com/?size=24&id=85801&format=png" alt="">
                    <p class="text-xs mb-2 text-gray-600">Price : ${price !== undefined && price !== null ? price  : 'Not Available'} $</p>
                  </div>
                  <div class="card-actions mt-2">
                    <button onclick="likePets('${image}')" class="btn btn-outline mr-3 text-xs btn-sm">
                      <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=82788&format=png" alt="">
                    </button>
                    <button id="${petId}" onclick="popup()" class="btn btn-outline btn-success btn-sm">Adopt</button>
                    <button onclick="detailsModal(${petId})" class="btn btn-outline btn-success btn-sm">Details</button>
                  </div>
                </div>`

              showPetsCard.appendChild(div)
              

    });
}




let intervalId = ""; 

let closePopup = () => {
  let modal = document.querySelector("#my_modal_2");
  modal.close();
  modal.style.display = "none";

  clearInterval(intervalId);
}

let popup = () => {
  let modal = document.querySelector("#my_modal_2");
  modal.style.display = "block"; 
  modal.showModal();

  let time = 3;
  let countTime = document.querySelector("#countTime");
  countTime.innerText = time; 

  clearInterval(intervalId);

  intervalId = setInterval(function () {
    time--;
    countTime.innerText = time;

    if (time <= 0) {
      clearInterval(intervalId); 
    }
  }, 700);

  setTimeout(function () {
    closePopup();
  }, 2000);
}





    let detailsModal = async (petId) => {
      let modalPopup = document.querySelector("#my_modal_1")
      modalPopup.innerHTML = ""


      let res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
      let data = await res.json()
      let getDetails = data.petData
      let {breed, date_of_birth, price, gender, image, vaccinated_status, pet_name, pet_details} = getDetails


      let div = document.createElement("div")
      div.classList = "modal-box"
      div.innerHTML = `
      <div class="flex mb-5 justify-center">
      <img class="rounded-lg" src="${image}" alt="">
      </div>
      <h2 class="text-xxl my-3 font-bold">${pet_name}</h2>
    <div class="grid grid-cols-2">
      <div class="flex gap-1">
        <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=oYhzeDCgzsVo&format=png" alt="">
        <p class="text-xs mb-2 text-gray-600">Breed: ${breed !== undefined && breed !== null ? breed : 'Unknown Pet Breed'}</p>
      </div>
      <div class="flex gap-1">
        <img class="w-4 h-4"  src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt="">
        <p class="text-xs mb-2 text-gray-600">Birth: ${date_of_birth !== undefined && date_of_birth !== null ? date_of_birth : 'Unknown Birth'}</p>
      </div>
      <div class="flex gap-1">
        <img class="w-4 h-4"  src="https://img.icons8.com/?size=80&id=70834&format=png" alt="">
        <p class="text-xs mb-2 text-gray-600">Gender: ${gender !== undefined && gender !== null ? gender : 'Unknown Gender'}</p>
      </div>
      <div class="flex gap-1">
        <img class="w-4 h-4"  src="https://img.icons8.com/?size=24&id=85801&format=png" alt="">
        <p class="text-xs mb-2 text-gray-600">Price : ${price !== undefined && price !== null ? price  : 'Not Available'} $</p>
      </div>
      <div class="flex gap-1">
        <img class="w-4 h-4"  src="https://img.icons8.com/?size=80&id=HIcu7xch7cTZ&format=png" alt="">
        <p class="text-xs mb-2 text-gray-600">Vaccinated status: ${vaccinated_status !== undefined && vaccinated_status !== null ? vaccinated_status : 'Unknown Pet vaccinated status'}</p>
      </div>
    </div>
    <hr class="my-4">
    <div>
      <h2 class="text-xl font-bold my-3">Details Information</h2>
      <p class="text-xs mb-5 text-gray-700">${pet_details}</p>
    </div>

    
    <div class="">
      <form method="dialog">
        <button class="btn bg-green-900 text-white w-full">Close</button>
      </form>
    </div>
      `
      modalPopup.appendChild(div)
        my_modal_1.showModal()
    }






let likePets = (image) => {
    let likedPets = document.querySelector("#liked")

    let div = document.createElement("div")
    div.classList = "h-22 rounded-2xl bg-white border-2 shadow-xl p-2"
    div.innerHTML = `
            <img src="${image}"
            alt="Shoes"
            class="rounded-xl">`
    likedPets.appendChild(div)
}



let loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => category(data.categories));
  };
  
  let removeActiveClass = () => {
    let button = document.getElementsByClassName('category-btn') 
    for(let btn of button){
      btn.classList.remove("btn-success")
    }
  }

  let loadCategoryVideos = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass()
        let activeBtn = document.getElementById(`${category}`)
        activeBtn.classList.add("btn-success")

        document.querySelector("#spinner").style.display = "block"
        setTimeout(function(){
            showPetsItem(data.data)
        }, 2000)

      });
      
  };

  let category = (data) => {
    let categoryField = document.getElementById("category");
    data.forEach((element) => {
        let {category_icon, id, category} = element
      let div = document.createElement("div");
      div.classList = "flex gap-2 justify-center text-center rounded-lg py-4"
      div.innerHTML = `
      <button id="${category}" onclick="loadCategoryVideos('${category}')" class="btn px-10  category-btn">
      <img class="w-7" src="${category_icon}" alt="">
        <h1 class="text-xl font-semibold text-gray-800">${category}</h1>
      </button>
      `;
      categoryField.append(div);
    });
  };


 
  
// 
//   



let mainLode =() => {

  document.querySelector("#spinner").style.display = "block"
        setTimeout(function(){
            showPetsItem(data.data)
          }, 3000)
        }
        
        loadCategories()
  mainLode()

allPets()
















