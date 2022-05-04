const { ipcRenderer } = require('electron')
const ipc = ipcRenderer;


// vars
var isLeftMenuActive = false;


// identify elements
const mySideBar = document.getElementById('mySideBar');
const maxResBtn = document.getElementById('maxResBtn')


//minimize app
minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minimizeApp')    
})

//minimize app
maxResBtn.addEventListener('click', ()=>{
    ipc.send('maximizeRestoreApp')    
})

//close app
closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')    // <<-- will send a param to the main.js file   (async)
    //console.log('closeAppReached')
})


//------------------------------------------
//------------------------------------------

//recieving changes from Main.js
    //isMaximized
    //isRestored

ipc.on('isMaximized', ()=> { changeMaxResBtn(true)} )
ipc.on('isRestored', ()=> { changeMaxResBtn(false)} )

// some function
function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoreBtn')
    }else{
        maxResBtn.title = 'Maximize'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')
    }
}




//------------------------------------------
//------------------------------------------


//Toggle menu
// expand and retract

showHideMenu.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySideBar.style.width = '0px'
        isLeftMenuActive = false

    }else{
        mySideBar.style.width = '280px'
        isLeftMenuActive = true
    }
})