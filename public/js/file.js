

function formatUrlPath(urlPath,filestat) {
    let parts = urlPath.split('/');
    if (parts.length > 1) {
        let lastPart = parts.pop();  
        const base =  parts.join('') + '$' + lastPart; 
        const path = base.replace('files','')
        
        if(filestat){
            urlPath = `/files/file/${path}`
        }else{
            urlPath = `/files/${path}`
        }
    }
    console.log(urlPath)
    return urlPath; 
}

function goToDir(name,filestat){
    const file = filestat === 'true'
    const base = window.location.pathname;
    if(file){
        const url = formatUrlPath(`${base}/${name}`,true)
        location.href = url
    }else{
        const url = formatUrlPath(`${base}/${name}`)
        location.href = url
    }
}