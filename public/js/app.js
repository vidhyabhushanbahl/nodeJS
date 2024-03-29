console.log('java script loaded')

weatherForm = document.querySelector("form");

search = document.querySelector("input");
weather = document.querySelector('#weather')

weather.textContent = 'Loading...'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loc = search.value
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(error)
            }
            else {
                weather.textContent = data.temp + data.longitude
            }
        })
    })
})



