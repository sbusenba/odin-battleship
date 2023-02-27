const firebutton = () => {
    const render=(status,clickFN) => {
        const fireButton = document.createElement('div')
            fireButton.classList.add('fire-button')
            fireButton.classList.add(`${status}`)
            if (status === 'armed'){ 
                fireButton.addEventListener('click',clickFN)
            }
        return fireButton;
    }


return {render};
}
module.exports = firebutton;