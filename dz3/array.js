// task 3 имя ученика с самым низким средним баллом

document.getElementById("task3__getRes").addEventListener("click", () => {
	const namesString = document.getElementById("task3__names").value;
	const gradesString = document.getElementById("task3__grades").value;

	console.log(namesString, gradesString);
	
	const names = namesString.trim().split(", ");
	const grades = gradesString.trim().split(" ");

	let minIndex = -1;
	let minAvg = Infinity;

	grades.forEach( function(grades, index) {
		const avg = grades.split("-").reduce((sum, currVal) => {
		return sum + Number(currVal)}, 0) / grades.length;
		
		if (avg < minAvg) {
			minIndex = index;
			minAvg = avg;
		}
	})

	document.getElementById("task3__result").textContent = names[minIndex];
});

// task 4 самый низкокалорийный продукт

document.getElementById("task4__getRes").addEventListener("click", () => {
	const namesString = document.getElementById("task4__names").value;
	const caloriesString = document.getElementById("task4__calories").value;

	const names = namesString.trim().split(" ");
	const calories = caloriesString.trim().split(" ");

	let minIndex = -1;
	let minSum = Infinity;

	calories.forEach( function(calories, index) {
		const cals = calories.split("-");
		const sum = 0.4 * cals[0] + 0.3 * cals[1] + 0.3 * cals[2];

		if (sum < minSum) {
			minIndex = index;
			minSum = sum;
		}
	})

	document.getElementById("task4__result").textContent = names[minIndex];
});

// task 5 цены товаров по возрастанию

document.getElementById("task5__getRes").addEventListener("click", () => {
	const convertedToAvg = [];

	const str = document.getElementById("task5__names").value;

	const splitted = str.trim().split("; ");

	const converted = splitted.map((elt, index, arr) => {
		const splitted2 = elt.split(":");
		const name = splitted2[0];

		const avg = splitted2[1].split(",").reduce( (sum, currVal) => {return sum + Number(currVal)}, 0 ) / splitted2[1].length;
	
		return name + " " + avg;
	});

	const sorted = converted.sort( (a,b) => {
		const aSplitted = a.split(" ");
		const bSplitted = b.split(" ");

		if (aSplitted[1] === bSplitted[1]) {
			if (aSplitted[0] > bSplitted[0]) {
				return 1;
			}
			return -1;
		}

		return aSplitted[1] - bSplitted[1];
	});

	document.getElementById("task5__result").innerHTML = sorted.map((elt) => {
		return `<p>${elt.split(" ")[0]}</p>` 
	}).join("");
});


// task 6 максимальная суммарная прибыль

document.getElementById("task6__getRes").addEventListener("click", () => {
	const str = document.getElementById("task6__names").value;
	console.log(str.split("\n"));
});
