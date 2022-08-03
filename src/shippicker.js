const ship = require("./ship")

const shipPicker = ()=>{

    const render = (ship,startDragFunc)=>{
        let display = document.createElement("div")
        display.classList.add("ship-display")
        let shipDisplay = document.createElement("div")
        shipDisplay.classList.add('draggable-ship')
        shipDisplay.setAttribute('draggable',true)
        for (let i=0;i<ship.length;i++){
            const cell = document.createElement('div');
            cell.classList.add("cell")
            cell.classList.add("ship")
            cell.addEventListener("mousedown",startDragFunc)
            cell.setAttribute("data-index",i)
            cell.setAttribute("data-facing",'north')
            shipDisplay.appendChild(cell)
        }
        shipDisplay.style.display= 'flex';
        shipDisplay.style.flexDirection = "column"
        display.appendChild(shipDisplay)
        
        let rotateButton = document.createElement('button')
        rotateButton.innerText = "Rotate"
        rotateButton.addEventListener('click',()=>{
            if (shipDisplay.style.flexDirection=='column') {
                shipDisplay.style.flexDirection = 'row';
    
            }else{
                shipDisplay.style.flexDirection = 'column';
            }
             
            
        });
        display.append(rotateButton);
        return display;
    }



return render;
}
module.exports = shipPicker;