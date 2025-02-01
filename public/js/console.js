const ServerConsole = document.getElementById('console')
const statusbox = document.getElementById('status')
const playerbox = document.getElementById('players')

const socket = io();

socket.on('server-log', log => {
    const p = document.createElement('p')
    p.innerHTML = log
    ServerConsole.append(p)
})

socket.on('server-status', ServerStatus => {
    if(ServerStatus == 'online'){
        statusbox.innerHTML = ServerStatus;
        statusbox.style.color = 'rgb(12, 235, 12)'
    }else if(ServerStatus == 'offline'){
        statusbox.innerHTML = ServerStatus;
        statusbox.style.color = 'rgb(238, 35, 8)'
    }
})

socket.on('players', players => {
    playerbox.innerHTML = players
})