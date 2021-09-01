// Assign Value
const inputField = document.getElementById('input-field');
const searchField = inputField.value;


const loadData = () => {
    fetch(`http://openlibrary.org/search.json?q=${'searchField'}`)
    .then(res => res.json())
    .then(data => console.log(data.docs[0]))
}