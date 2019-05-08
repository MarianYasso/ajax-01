document.querySelector('.page-loaded').innerText = (new Date()).toLocaleTimeString();

document.querySelector('.get-html').addEventListener('click', getHtml);

const XHR_DONE = 4;
const HTTP_OK = 200;

function getHtml() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XHR_DONE && xhr.status === HTTP_OK) {
            document.querySelector('.html-container').innerHTML = xhr.responseText;
        } 
    }
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.fetch-html').addEventListener('click', fetchHtml);

function fetchHtml() {
    fetch('client-data.html')
        .then( response => response.text() )
        .then( html => document.querySelector('.html-container').innerHTML = html );
}

document.querySelector('.get-json').addEventListener('click', getJson);

function getJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XHR_DONE && xhr.status === HTTP_OK) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.account;
        } 
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json').addEventListener('click', fetchJson);

function fetchJson() {
    fetch('client-data.json')
        .then( response => response.json() )
        .then( clientData => {
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.account;
        });
}

document.querySelector('.login-form input[type=submit]').addEventListener('click', 
  submitForm);
  
function submitForm(e) {
    e.preventDefault();
    fetch('form.php', {
        method: 'POST',
        body: new FormData(document.querySelector('.login-form'))
    })
     .then( response => response.text() )
     .then( html => document.querySelector('.server-response')
                                .innerHTML = html );
}

document.querySelector('.curr-convert').addEventListener('click', currConvert);
    
function currConvert(e) {
    e.preventDefault();
    const currFrom = document.querySelector('.converter input[name=curr-from]').value;
    const currTo = document.querySelector('.converter input[name=curr-to]').value;
    const currKey = currFrom + '_' + currTo;   
    fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${currKey}&compact=ultra&apiKey=d1b5218e0be93e157106`) // зарегати свій ключ (не юзати!)
        .then( response => response.json() )
        .then( currency => {
           const rate = currency[currKey];
           const sourceAmount = document.querySelector('.converter input[name=curr-amount]').value;
           const convertedAmount = rate * sourceAmount;
           document.querySelector('.converter output[name=curr-converted]')
            .innerText = convertedAmount.toFixed(2);
        });
}