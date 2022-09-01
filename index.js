//event listener
// document.querySelector('car-form').addEventListener('submit',
// handleSubmit)
//Dom render functions
function renderOneCar(car){
    //build car
    let card=document.createElement('li')
    card.className='card'
    card.innerHTML=`
    <img src ="${car.imageURL}">
    <div class="content">
    <h4>${car.name}</h4>
    <p>
    $<span class="like-count">
    ${car.likes}</span>Liked
    </p>
    <p>${car.description}</p>
    </div>
    <div id="buttons">
    <button id="like">Like</button>
    <button id="delete">Delete car</button>
    </div>
    `

}
//add animal card to DOM
document.querySelector('#car-list').appendChild(card)
function initialize(){
  carData.forEach (car=>
    renderOneCar(car)) 
}
initialize()