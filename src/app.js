const feedDisplay = document.querySelector('#feed')

function initialDisplay() {
    
fetch('http://localhost:3000/results')
.then(response => {return response.json()})

.then(data => {
    data.forEach(results => {
        const article = `<div><h2>` + results.rank + `</h2><h2>` + results.title + `</h2><p>score: ` + results.score + `</p><p>comments: ` + results.comments + `</p></div>`
        feedDisplay.insertAdjacentHTML("beforeend", article)
    })
})
.catch(err => console.log(err))
}

function FivePlus() {
    
    fetch('http://localhost:3000/5Plus')
    .then(response => {return response.json()})
    
    .then(data => {
        data.forEach(results => {
            const article = `<div><h2>` + results.rank + `</h2><h2>` + results.title + `</h2><p>score: ` + results.score + `</p><p>comments: ` + results.comments + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", article)
        })
    })
    .catch(err => console.log(err))
    }

    function LessThanFive() {
        
        fetch('http://localhost:3000/Less5')
        .then(response => {return response.json()})
        
        .then(data => {
            data.forEach(results => {
                const article = `<div><h2>` + results.rank + `</h2><h2>` + results.title + `</h2><p>score: ` + results.score + `</p><p>comments: ` + results.comments + `</p></div>`
                feedDisplay.insertAdjacentHTML("beforeend", article)
            })
        })
        .catch(err => console.log(err))
        }


