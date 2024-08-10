document.addEventListener('load', gridCreator(35));

const userChoice = document.querySelector('#submit-btn');

const resetBtn = document.querySelector('#reset-btn')

resetBtn.addEventListener('click',resetAll)

userChoice.addEventListener('click', ()=>{
    const inputValue = document.querySelector('#grid-count');
    const count = Number(inputValue.value);
    inputValue.textContent = '';

    resetAll();
    if(isNaN(count) || count < 2 || count > 100){
        alert("Please enter grid count per side between 2 and 100!");
        return;
    }else {
        gridCreator(count);
    }
})

let opacityOfColor = 0.1;
function toggleValue(isFalse){
    return !isFalse;
}

function gridCreator(count=35){
    
    let sideMeasurement = 700/count ;
    let eventDetector = false;


    let totalGrids = count**2;
    const gridContainer = document.querySelector('.sketch-container');

    for(let i= 0; i< totalGrids; i++){
        
        const divElement = document.createElement('div');

        divElement.setAttribute('style', `height:${sideMeasurement}px; 
            width: ${sideMeasurement}px;`);

        gridContainer.appendChild(divElement);  
    }
    gridContainer.addEventListener('click', (event)=>{
        colorAdd(event.target);
        eventDetector = toggleValue(eventDetector);
        if(eventDetector){
            drawMode(gridContainer);
        }            
    });
}

function drawMode(gridContainer){
    gridContainer.addEventListener('mouseover', (event)=>{
        colorAdd(event.target);  
    })
}

const blackColor = document.querySelector('#black-btn');
const colorFul = document.querySelector('#color-button');

function colorAdd(nodeElement){
    if(nodeElement.className === 'sketch-container'){
        return;
    }

    let colorSet = nodeElement.style;
    if(colorSet.backgroundColor === 'black'){
        colorSet.backgroundColor = '';
    }else {
        colorSet.backgroundColor = 'black';
        colorSet.opacity = opacityOfColor;
    }
    if(opacityOfColor <= 1){
        opacityOfColor += 0.1;
    }else {
        opacityOfColor = 1;
    }
       
}

function resetAll(){
    opacityOfColor = 0.1;
    const parentElement = document.querySelector('.container');
    parentElement.removeChild(parentElement.firstElementChild);
    
    const sketchContainer = document.createElement('div');
    sketchContainer.classList.add('sketch-container');
    parentElement.appendChild(sketchContainer);
}