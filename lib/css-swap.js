window.onload = () => {
	
	const myForm = document.getElementById('sort-type');

	myForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const value = document.querySelector('input[name="sorter"]:checked').value;
		const defaults = document.getElementById('default');
		const basic = document.getElementById('basic');
		if (value.toLowerCase() === 'basic') {
			disableStylesheet(defaults);
			enableStylesheet(basic);
		} else {
			disableStylesheet(basic);
			enableStylesheet(defaults);
		}
	});

}

function enableStylesheet (node) {
    node.rel = 'stylesheet';
    }
    
function disableStylesheet (node) {
    node.rel = 'alternate stylesheet';
}                
     