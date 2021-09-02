// Call HTML element
const inputField = document.getElementById('input-field');
const bookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const errorContainer = document.getElementById('error-container');
const resultContainer = document.getElementById('result-container');
const resultQuantity = document.getElementById('result-quantity');

// Get Data by function

const loadData = () => {
    const search = inputField.value;

// -----------Clear DOM-----------
    inputField.value ='';
    errorContainer.textContent ='';
    bookContainer.textContent = '';
    resultQuantity.textContent ='';
// -----------/Clear DOM----------

    if(search === ''){
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <h2 class="text-center my-5">
                Please Enter a Book name
            </h2>
        `; 
        errorContainer.appendChild(errorDiv);
    }
    else{
        fetch(`https://openlibrary.org/search.json?q=${search}`)
        .then(res => res.json())
        .then(data => displayResult(data))
    }
     
};

const displayResult = data => {
    // console.log(books)

    if(data.numFound === 0){
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <h2 class="text-center my-5">
                Oops!!! No result found
            </h2>
        `; 
        errorContainer.appendChild(errorDiv);
    }
    else{
        resultQuantity.innerText = `Total Books found : ${data.numFound}`

// Get API data to display on UI

        const books = data.docs;
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author : ${book.author_name}</p>
                        <p class="card-text">First Publish year : ${book.first_publish_year}</p>
                        <p class="card-text">Publisher : ${book.publisher}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success w-100">Borrow</button>
                    </div>
                </div>
            </div>
            `;
            bookContainer.appendChild(div);
        })
    }
    

};