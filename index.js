import { sunglasses, setSunglasses } from "./data/sunglasses.js";
import { sunglassesOptions, models, lenses, frames } from "./data/sunglassesOptions.js";

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

function render(sunglassesNew) {
    
    sunglassesNew = {...sunglassesNew}

    let price = `$${sunglassesNew.model.price + sunglassesNew.lenses.price + sunglassesNew.frame.price}`
    
  
    productDetailsEl.innerHTML = `
    <h1>${sunglassesNew.model.name}</h1>
    <p>Custom: ${sunglassesNew.lenses.color} lenses, ${sunglassesNew.frame.color} frames</p>
    <p>${price}</p>
    `
    
    const currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)
    
    const currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)
    
    const currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)
    
}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        let siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", function(event) {
    let clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        let currName = clickedItem.dataset.name

        let {name, price, thumbImg, cssClass} = models
        .filter(function(item) {
            return item.name === currName
        })[0]
        
        sunglassesNew = {...sunglassesNew, model: {name: name, price: price, thumbImg: thumbImg, cssClass: cssClass}}
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {

            let {color, price, cssClass} = lenses
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            sunglassesNew = {...sunglassesNew, lenses: {color: color, price: price, cssClass: cssClass}}
        } 
        
        //frames
        else {
            let {color, price, cssClass} = frames
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            sunglassesNew = {...sunglassesNew, frame: {color: color, price: price, cssClass: cssClass}}
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)