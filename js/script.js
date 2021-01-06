let preloading = false;

const scrollToEndOfPage = () => {

    let sumScrollTopClientHeight = Math.ceil(document.documentElement.scrollTop + document.documentElement.clientHeight);
    // console.log(sumScrollTopClientHeight);
    // console.log(document.documentElement.scrollHeight);

    if(sumScrollTopClientHeight >= document.documentElement.scrollHeight) {
        getData();
    }
}

const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
    preloading = true;

}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    preloading = false;
    
}

const getData = () => {
    
    if (!preloading) {

        showPreloader();
        
        fetch('https://akademia108.pl/api/ajax/get-users.php', {
            method: 'GET'
        })
        .then( (res) => res.json())
        .then( (resJSON) => {
    
        let hr = document.createElement('hr');
        document.body.append(hr);
    
            for (object in resJSON) {
                
                let br = document.createElement('br');
                let nextParagraph = "";
                let newText = "";
    
                for (element in resJSON[object]) {
                    console.log(`${element}: ${resJSON[object][element]}`);
    
                    nextParagraph = document.createElement('p');
                    newText = (`User ${element}: ${resJSON[object][element]}`);
                    nextParagraph.append(newText);
    
                    document.body.lastElementChild.insertAdjacentElement('afterend', nextParagraph);
                }
                // console.log('---------', br);
                nextParagraph.append(br, '---------');
                console.log(newText);
            }
    
            hidePreloader();
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

window.addEventListener('scroll', scrollToEndOfPage);


