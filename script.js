const loadPhone = async (searchText = 'a', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  displayPhones(data.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

//   clear the container
phoneContainer.textContent = ''

//   display the show all button 
const button = document.getElementById('show-all-btn')

    if(phones.length > 12 && !isShowAll) {
        button.classList.remove('hidden')
    }else {
        button.classList.add("hidden")
    }

  if(!isShowAll) {
    phones = phones.slice(0,12)
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
                    <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.brand}</h2>
                      <p>${phone.phone_name}</p>
                      <div class="card-actions">
                        <button onClick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
    phoneContainer.appendChild(phoneCard)
  });
  loadingAnimation(false)
};

const searchHandle = (isShowAll)=> {
    const searchField = document.getElementById("search-field")
    const searchText = searchField.value;
    // alert(searchText)
    loadingAnimation(true)
    loadPhone(searchText,isShowAll)
}

const loadingAnimation = (isLoading)=> {
    const loading = document.getElementById('loading')
    if(isLoading) {
        loading.classList.remove('hidden')
    }else{
        loading.classList.add("hidden")
    }
}

const showAllBtn = () =>{
    searchHandle(true);
}

const handleShowDetail = async (id)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  showModal(data.data)
}

const showModal = (phone)=>{
  const phoneName = document.querySelector(".modal_phone_name")
  const phoneImage = document.querySelector("#modal_image_container")
  const phoneDetails = document.querySelector("#modal_phone_details")
  phoneImage.innerHTML = `
  <img src= "${phone.image}" class= "mx-auto">
  `

  phoneDetails.innerHTML = ` 
    <p> <span class = 'font-bold'>Storage:</span> ${phone.mainFeatures.storage}</p>
    <p> <span class = 'font-bold'>Display:</span> ${phone.mainFeatures.displaySize}</p>
    <p> <span class = 'font-bold'>Memory:</span> ${phone.mainFeatures.memory}</p>
    <p> <span class = 'font-bold'>Slug:</span> ${phone.slug}</p>
    <p> <span class = 'font-bold'>Release Date:</span> ${phone?.releaseDate ? phone.releaseDate : "N\\A"}</p>
    <p> <span class = 'font-bold'>Brand:</span> ${phone.brand}</p>
    <p> <span class = 'font-bold'>GPS:</span> ${phone.others?.GPS ? phone.others?.GPS: "N\\A" }</p>

  `
  console.log(phone);
  phoneName.innerText = phone.name
  my_modal_3.showModal()
}

loadPhone()


