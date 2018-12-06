window.onload = () => {

	for (let i of arrays.numbers) {
		console.log(i);
	}
	
	const numbersButton = document.getElementById('numbers-action');
	const languagesButton = document.getElementById('languages-action');
	
	numbersButton.onclick = () => {
        const numbersDisplay = document.getElementById('numbers-display');
	
		numbersDisplay.innerHTML = '';
		arrays.numbers.sort((a, b) => a - b);

        for (let i of arrays.numbers) {
			elfCode.appendToList(numbersDisplay, i);
		}
    };
	
	languagesButton.onclick = () => {
		const languagesDisplay = document.getElementById('languages-display');
	
		languagesDisplay.innerHTML = '';
		arrays.languageNames.sort();

        for (let i of arrays.languageNames) {
			elfCode.appendToList(languagesDisplay, i);
		}
    };
	
}

const arrays = {
	numbers: [15,14,13,12,11,10,9,8,7,6,5],
	languageNames: [
		"JavaScript",
		"HTML",
		"CSS",
		"Java",
		"C#",
		"Python",
		"C/C++"
	],
	languagePopularity: [
		{ language: "JavaScript", rank: 1},
		{ language: "HTML", rank: 2},
		{ language: "CSS", rank: 3},
		{ language: "Java", rank: 4},
		{ language: "C#", rank: 5},
		{ language: "Python", rank: 6},
		{ language: "C/C++", rank: 7}
	]
}

