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
