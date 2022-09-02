const loadPhone = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
  console.log(phones)
  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.textContent = '';
  if (dataLimit && phones.length > 9) {
    // phones  = phones.slice(0,9);
    document.getElementById('show-all').classList.remove('d-none');
  }
  else {
    document.getElementById('show-all').classList.add('d-none');
  }

  if (phones.length === 0) {
    document.getElementById('no-phone').classList.remove('d-none')
  }
  else {
    document.getElementById('no-phone').classList.add('d-none')
  }

  phones.forEach(phones => {


    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phones.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">'${phones.phone_name}'</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phones.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">
        Show  Details
        </button>
        </div>
      </div>
        `;
    phonesContainer.appendChild(phoneDiv)

  })
  loading(false)
}
const procesSearch = dataLimit => {
  loading(true)
  const  searchField = document.getElementById('search-text');
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
  searchField.value = '';

}
const search = () => {
  ;
}

document.getElementById("search-text")
  .addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
      procesSearch()
    }
  });

const loading = (isLoading) => {
  if (isLoading) {
    document.getElementById('loading').classList.remove('d-none')


  }
  else {
    document.getElementById('loading').classList.add('d-none')
  }
}
const loadPhoneDetails = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json()
  displayPhonedetails(data.data)

};
const displayPhonedetails = (phone) => {

  console.log(phone)
  const modalTitle = document.getElementById('phoneModalLabel');
  modalTitle.innerText = phone.name ? phone.name : 'no phone';
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <img src=" ${phone.image}" alt="">
  <h5> Release Date: ${phone.releaseDate}  </h5>
  <h5> Storage     : ${phone.mainFeatures.memory}</h5>
  <h5> ChipSet     : ${phone.mainFeatures.chipSet}</h5>
  <h5> Display Size: ${phone.mainFeatures.displaySize}</h5>
   
  `;
}

loadPhone('apple')