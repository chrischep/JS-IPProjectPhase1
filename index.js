document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault()
    getAllCars()
})
//event listener
document.querySelector('#car-form').addEventListener('submit',
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
    // renderOneCar(carObj)
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
    <h2>${car.name}</h2>
    <p>
    <span class="like-count">
    ${car.likes}  Liked</span>
    </p>
    <p>${car.description}</p>
    </div>
    <div id="buttons">
    <button id="like">Like</button>
    <button id="delete">Delete car</button>
    </div>
    `
        //add car card to DOM
        document.querySelector('#car-list').appendChild(card)

    card.querySelector('#like').addEventListener('click',(e)=>{
        e.preventDefault()
        // car.likes+=1
        // card.querySelector('span').textContent=car.likes
        updateLike(car.id, car.likes)
    })

    card.querySelector('#delete').addEventListener('click',(e)=>{
        e.preventDefault()
        card.remove()
        deleteCar(car.id)
    })

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
function updateLike(id,like){
    fetch(`http://localhost:3000/carData/${id}`,{
       method:'PATCH',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify({'likes':like+1})
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

// function initialize(){
// //   carData.forEach (car=>
// //     renderOneCar(car)) 
// }
// initialize()