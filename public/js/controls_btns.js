const start_btn = document.getElementById('start-btn')
const re_start_btn = document.getElementById('re-start-btn')
const stop_btn = document.getElementById('stop-btn')

start_btn.addEventListener('click', () => {
    start_btn.disabled = true
    start_btn.style.backgroundColor = 'green'
    start_btn.style.cursor = 'context-menu'
    fetch('/controls/start')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

re_start_btn.addEventListener('click', () => {
    re_start_btn.disabled = true;
    re_start_btn.style.cursor = 'context-menu'
    fetch('/controls/restart')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

stop_btn.addEventListener('click', () => {
    fetch('/controls/stop')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})