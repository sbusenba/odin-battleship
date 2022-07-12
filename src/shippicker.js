const shipPicker = ()=>{
    const render = (ship)=>{
        let display = document.createElement("div")
        display.classList.add("ship-display")
        display.style.height = '200px';
        display.style.width = '200px';
        display.style.backgroundColor= "azure";
        let shipDisplay = document.createElement("div")
        shipDisplay.classList.add('draggable-ship')
        for (let i=0;i<ship.length;i++){
            const cell = document.createElement('div');
            cell.classList.add("cell")
            shipDisplay.appendChild(cell)
        }
        shipDisplay.style.display= 'flex';
        /*if (ship.facing ==='north' || ship.facing ==='south'){
            shipDisplay.style.flexDirection = 'column';
        } else {
            shipDisplay.style.flexDirection = 'row';
        }*/
        display.appendChild(shipDisplay)
        return display;
    }



return render;
}
module.exports = shipPicker;