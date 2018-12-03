window.onload =() => {
    
    const myForm = document.getElementById('sort-type');

    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = document.querySelector('input[name="sorter"]:checked').value;
        if (value.toLowerCase() === 'language') {
            showChoice(value);
        } else {
            showChoice(value);
        }
    });
}

function showChice(value) {
    console.log(value);
    const userDisplay = document.getElementById('user-choice');
    userDisplay.textContent = value;
}