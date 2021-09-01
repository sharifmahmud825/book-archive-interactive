// Assign Value
const inputField = document.getElementById('input-field');
const bookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const errorContainer = document.getElementById('error-container');
const resultContainer = document.getElementById('result-container');

const loadData = () => {
    const search = inputField.value;
// condition for empty search
    if(search === ''){
        const h2 = document.createElement('h2');
        h2.classList.add('text-center');
        h2.innerHTML=`
        <h2 class="text-center my-5">
            No result Found
        </h2>
        `;
        errorContainer.appendChild(h2);
        return;
    }
    

// clear display data
    bookContainer.textContent='';
    errorContainer.textContent= '';
    
// Get API
 
    fetch(`http://openlibrary.org/search.json?q=${inputField.value}`)
    .then(res => res.json())
    .then(data => displayData(data.docs))
}

const displayData = books => {
    console.log(books);

    books.forEach(book => {
        // Clear
       inputField.value= '';
// Create new div

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
    });
    
}