document.addEventListener("DOMContentLoaded",(e)=>{
    getAllCars()
})
//event listener
document.querySelector('car-form').addEventListener('submit',
handleSubmit)

//event handlers
function handleSubmit(e){
    e.preventDefault()
    let carObj={
        name:e.target.name.value,
        imageURL:e.target.image_url.value,
        description:e.target.description.value,
        likes:0  
    }
    renderOneCar(carObj)
    saleCar(carObj)
}

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
    card.querySelector('#like').addEventListener('click',()=>{
        car.likes+=1
        card.querySelector('span').textContent=animal.likes
        updateLike(car)
    })
    
    //add car card to DOM
    document.querySelector('#car-list').appendChild(card)
}
//fetch requests
function getAllCars(){
    fetch('http://localhost:3000/carData')
    .then(res=> res.json())
    .then (carData=> carData.forEach(car=>
       renderOneCar(car) ))
    
}
function saleCar(carObj){
    fetch ('http://localhost:3000/carData',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(carObj)
    })
    .then (res=> res.json())
    .then(car=> console.log(car))
}
function updateLike(carObj){
    fetch(`http://localhost:3000/carData/${carObj.id}`,{
       method:'PATCH',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(carObj)
    })
    .then(res=> res.json())
    .then(car=> console.log(car))
}
function deleteCar(id){
    fetch(`http://localhost:3000/carData/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json' 
        }
    })
    .then (res => res.json())
    .then(car=> console.log(car))
}

function initialize(){
//   carData.forEach (car=>
//     renderOneCar(car)) 
}
initialize()