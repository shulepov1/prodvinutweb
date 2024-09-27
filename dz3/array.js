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
		// молоко 34
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

document.getElementById("task6__input").addEventListener("change", function(event){
	const file = this.files[0];
	const reader = new FileReader();
	
	const sums = new Map();

	let maxName = null;
	let maxProfit = -1;

	reader.addEventListener("load", () => {
		const str = reader.result;
		
		str.split("\n").forEach((entry) => {
			if (!entry || entry === "END") {
				//
			} else {
				const splittedEntry = entry.split(",");
				const name = splittedEntry[0];
				const profit = splittedEntry[1];

				if (sums.has(name)) {
					sums.set(name, sums.get(name) + Number(profit));
				} else {
					sums.set(name, Number(profit));
				}
				if (sums.get(name) > maxProfit) {
					maxName = name;
					maxProfit = sums.get(name); 
				}
			}
		});

		console.log(maxName, maxProfit);

		document.getElementById("task6__getRes").textContent = `${maxName} ${maxProfit}`;

	});

	reader.readAsText(file);
});

// task 7 наибольшее кол-во концертов

document.getElementById("task7__input").addEventListener("change", function(event){
	const file = this.files[0];
	const reader = new FileReader();
	
	const concertCounts = new Map();

	let maxName = null;
	let maxCount = -1;

	reader.addEventListener("load", () => {
		const str = reader.result;
		
		str.split("\n").forEach((entry) => {
			if (!entry || entry === "END") {
				//
			} else {
				const splittedEntry = entry.split(",");
				const name = splittedEntry[0];
				const date = splittedEntry[1];

				if (date.split(".")[2] === "2023") {

					if (concertCounts.has(name)) {
						concertCounts.set(name, concertCounts.get(name) + 1);
					} else {
						concertCounts.set(name, 1);
					}

					if (concertCounts.get(name) > maxCount) {
						maxName = name;
						maxCount = concertCounts.get(name); 
					}

				}

			}
		});

		console.log(maxName, maxCount);

		document.getElementById("task7__getRes").textContent = `${maxName} ${maxCount}`;

	});

	reader.readAsText(file);
});

// task 8 города

const cities = ["Москва", "Санкт-Петербург", "Саратов", "Магадан", "Ярославль", "Самара", "Якутск"];

document.getElementById("task8__btn").addEventListener("click", () => {
	const userInput = document.getElementById("task8__input").value;

	const sameFirstLetter = cities.filter( (city) => {
		return userInput[0] === city[0];
	});

	const msgElement = document.getElementById("task8__msg");
	if (sameFirstLetter.length === 0) {
		msgElement.textContent = "Такого города нет в списке";	
	} else {
		msgElement.textContent = `Города, начинающиеся с буквы "${userInput[0]}": ${sameFirstLetter.join(", ")}`;
	}

});
