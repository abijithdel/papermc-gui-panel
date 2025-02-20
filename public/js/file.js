const createnew = document.querySelector('.createnew')
const closediv = document.querySelector('.close')
const filename = document.getElementById('name')
const message = document.getElementById('message')
const mainMenu = document.querySelector('.main-menu')
var Type

function formatUrlPath(urlPath, filestat) {
    let parts = urlPath.split('/');
    if (parts.length > 1) {
        let lastPart = parts.pop();
        const base = parts.join('') + '$' + lastPart;
        const path = base.replace('files', '')

        if (filestat) {
            urlPath = `/files/file/${path}`
        } else {
            urlPath = `/files/${path}`
        }
    }
    console.log(urlPath)
    return urlPath;
}

function goToDir(name, filestat) {
    const file = filestat === 'true'
    const base = window.location.pathname;
    if (file) {
        const url = formatUrlPath(`${base}/${name}`, true)
        location.href = url
    } else {
        const url = formatUrlPath(`${base}/${name}`)
        location.href = url
    }
}

closediv.addEventListener('click', (e) => {
    createnew.style.display = 'none'
})

function create(type) {
    Type = type
    createnew.style.display = 'block'
}

function savename() {
    if (!filename.value) {
        return alert(`Enter ${Type} Name`)
    }
    fetch('/files/createfile', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: location.pathname, type: Type, name: filename.value })
    })
        .then(response => response.json())
        .then(data => {
            message.style.display = 'block'
            const p = document.createElement('p')
            p.innerHTML = data.message
            if (data.status) {
                message.style.backgroundColor = 'rgb(16, 231, 52)'
            } else {
                message.style.backgroundColor = 'rgb(236, 12, 12)'
            }
            message.append(p)
            createnew.style.display = 'none'
            setTimeout(() => {
                location.reload()
            }, 3500);
        })
        .catch(err => {
            message.style.display = 'block'
            createnew.style.display = 'none'
            const p = document.createElement('p')
            p.innerHTML = err.message
            message.style.backgroundColor = 'rgb(236, 12, 12)'
            message.append(p)
        })

}

let Deisfile
let DeName

function menu(name,fileTrue){
    mainMenu.style.display = 'block'
    Deisfile = fileTrue === 'true'
    DeName = name
    
}

function deleteitem(){
    const p = document.createElement('p')
    fetch('/files/delete-item', {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ isfile:Deisfile, name:DeName, urlpath:location.pathname })
    })
    .then(response => response.json())
    .then(data => {
        mainMenu.style.display = 'none'
        message.style.display = 'block'
        p.innerHTML = data.message
        if (data.status) {
            message.style.backgroundColor = 'rgb(16, 231, 52)'
        } else {
            message.style.backgroundColor = 'rgb(236, 12, 12)'
        }
        message.append(p)
        setTimeout(() => {
            location.reload()
        }, 3500);
    })
    .catch(err => {
        p.innerHTML = err.message;
        message.style.display = 'block'
        message.style.backgroundColor = 'rgb(236, 12, 12)'
        message.append(p)
    })
}

function closemenu(){
    mainMenu.style.display = 'none'
}