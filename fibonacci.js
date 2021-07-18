let submit = document.getElementById('submit');
let fiboValue = document.getElementById('input-fibonacci');
let result = document.getElementById('result-fibonacci');
let x = 0;
let loader = document.getElementById('container-load');
let error = document.getElementById('txt-error');
let errorMsg = document.getElementById('error-msg');
let errorContainer = document.getElementById('error-container');
let lastResults = document.getElementById('last-results');
let divs;
let saveCheck = document.getElementById('save');

function dateToString(number) {
    var time = new Date().getTime(number); // get your number
    var date = new Date(time); // create Date object

    return date.toString();
}

function fibonacciResultServer() {

    let fiboResultURL = "http://localhost:5050/getFibonacciResults"; 
    let date = 0;

    fetch(fiboResultURL)
    .then(response => response.json())
    .then((data) => {data.results.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate)}); /* sorted the array because it was not */ 

        const div = document.createElement("div");
        div.className = "results" // ou div.classList.add("results");
        lastResults.appendChild(div);      
    
        divs = document.querySelectorAll(".results"); 
        
        for (let i = 0; i < divs.length && i < 3; i++) {
            divs[i].innerHTML = `<span>The fibonacci of <strong> ${data.results[i].number}</strong> is <strong>${data.results[i].result}</strong>. Calculated at: ${dateToString(data.results[i].createdDate)}</span>`;
        }  

        if (divs.length === 4) {
            lastResults.removeChild(div);
        }
                  
    });        
};

function fibonacciOf(number) {

    let num1 = 0;
    let num2 = 1;
    let numFibo = 0;

    if (number == 0) {
        return 0;
    }

    for (let i = 0; i < number - 1; i++)
    {
        numFibo = num1 + num2;
        num1 = num2;
        num2 = numFibo;
    }
    
    return numFibo;
};

submit.addEventListener('click', function() {

    result.textContent = '';

    if (saveCheck.checked != true) {
        return result.textContent = fibonacciOf(fiboValue.value);
    }

    loader.classList.add("loader");

    x = parseInt(fiboValue.value);
    const serverUrl = "http://localhost:5050/fibonacci/" + x;

    if (fiboValue.value < 1 || fiboValue.value > 50) {

    errorMsg.textContent = '';

    fetch(serverUrl)
        .then(response => response.text())
        .then(text => {error.textContent = text; });
        loader.classList.remove("loader");
        fiboValue.style.border = '1px solid red';
        fiboValue.style.color = 'red';
        errorContainer.style.display = "flex";
    }

    else if (fiboValue.value == 42) {

        errorContainer.style.display = "none";

        fetch(serverUrl)
        .then(response => response.text())
        .then(text => {errorMsg.textContent = "Server error: " + text; });
        loader.classList.remove("loader");
        fiboValue.style.border = '1px solid red';
        fiboValue.style.color = 'red';
    }

    else {

        error.textContent = '';
        errorMsg.textContent = '';
        errorContainer.style.display = "none";
        
        fetch(serverUrl)
        .then(response => response.json())
        .then(data => {result.textContent = data.result; loader.classList.remove("loader")})
        fiboValue.style.color = "#373A3C";
        fiboValue.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    }

    fibonacciResultServer();

});



/********************** FIBONACCI RECURSIVE VERSION **************************/

/*function fibonacciRecursive(number) {

    if (number < 2) {
      return number;
    }
    return fibonacciRecursive(number - 1) + fibonacciRecursive(number - 2); 
  }*/


  
  








