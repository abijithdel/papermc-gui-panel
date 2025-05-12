const ServerConsole = document.getElementById('console')
const statusbox = document.getElementById('status')
const playerbox = document.getElementById('players')
const cmdinput = document.getElementById('cmd')
const running = document.getElementById('runngin')
const start_BTN = document.getElementById('start-btn')

const socket = io();

function removeAnsiCodes(text) {
    return text.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, '');
}

socket.on('server-log', log => {
    const p = document.createElement('p')
    const clearlog = removeAnsiCodes(log)
    p.innerHTML = clearlog
    ServerConsole.append(p)
})

socket.on('server-status', ServerStatus => {
    if(ServerStatus == 'online'){
        statusbox.innerHTML = ServerStatus;
        statusbox.style.color = 'rgb(12, 235, 12)'
        running.style.display = 'block'
        start_BTN.disabled = true
        start_BTN.style.backgroundColor = 'green'
        start_btn.style.cursor = 'context-menu'
    }else if(ServerStatus == 'offline'){
        statusbox.innerHTML = ServerStatus;
        statusbox.style.color = 'rgb(238, 35, 8)'
        running.style.display = 'none'
    }
})

socket.on('players', players => {
    playerbox.innerHTML = players
})

function sendcmd(){
    const p = document.createElement('p')
    p.innerHTML = cmdinput.value;
    p.style.color = 'yellow'
    ServerConsole.append(p)
    fetch('/controls/usecmd',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cmd:cmdinput.value})
        }
    )
    .then(response => console.log(response))
    .catch(err => console.log(err))

    cmdinput.value = ''
}