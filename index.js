//alert("test");

const inputRange = document.getElementById("n");
const valueDisplay = document.getElementById("n-display");
const table = document.querySelector(".pythagoras__table");

inputRange.addEventListener("input",  () => { updateTable(inputRange.value); });

updateTable(inputRange.value);

function updateTable(n) {
	valueDisplay.textContent = n;
	table.innerHTML = "";

	// first row
	const firstRow = document.createElement("div");
	firstRow.classList.add("row");
	
	for (let i = 0; i <= n; i += 1) {
		const cell = document.createElement("div");
		cell.classList.add("border", "cell");
		
		if (i > 0) {
			cell.textContent = i;
		}

		firstRow.appendChild(cell);
	}
	table.appendChild(firstRow);

	for (let i = 1; i <= n; i += 1) {
		const row = document.createElement("div");
		row.classList.add("row");

		const firstCell = document.createElement("div");
		firstCell.classList.add("border", "cell");
		firstCell.textContent = i;

		row.appendChild(firstCell);

		for (let j = 1; j <= n; j += 1) {
			const result = i * j;
			const cell = document.createElement("div");
			cell.classList.add("cell");
			if (i === j) {
				cell.classList.add("diagonal");
			}
			cell.textContent = result;

			row.appendChild(cell);
		}

		table.appendChild(row);
	}
}

const passport = document.querySelector(".passport");
passport.classList.add("passport_ru");

const data = {
	kem: {
		ru: "Отделом таким-то по г.Москваотделом таким-то по г.Москва",
		eng: "Otdel Otdel Moskva Otdel Moskva Otdel Otdel Otdel Otdel"
	},
	kogda: {
		ru:  "21.05.2012",
		eng: "21.05.2012"
	},
	kod: {
		ru: "440-002",
		eng: "440-002"
	},
	surname: {
		ru: "Иванов",
		eng: "Ivanov"
	},
	name: {
		ru: "Петр",
		eng: "Petr"
	},
	otchestvo: {
		ru: "Олегович",
		eng: "Olegovich"
	},
	sex: {
		ru: "МУЖ",
		eng: "M"
	},
	dateOfBirth: {
		ru: "03.03.2003",
		eng: "03.03.2003"
	},
	placeOfBirth: {
		ru: "г. Москва",
		eng: "Moscow"
	}
}

const languageButtons = document.querySelectorAll("[name='lang']");
console.log(languageButtons);

languageButtons.forEach((inpt) => {
	inpt.addEventListener("click", (event) => {
		updatePassportData(event.currentTarget.value);
	})
});

function updatePassportData(lang) {
		passport.className = `passport_${lang}`;
		[...passport.children].forEach((elt) => {
			if (elt.nodeName === "DIV") {
				[...elt.children].forEach((child) => {
					child.textContent = data[child.className][lang];
				})
			}
		})
}