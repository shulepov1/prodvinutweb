const submitButton = document.getElementById("fetch");
const textField = document.getElementById("text");
const sizeField = document.getElementById("size");

const sizeValueField = document.getElementById("sizeValue");
sizeField.addEventListener("input", (e) => {
    sizeValueField.textContent = e.currentTarget.value;
})

const nameHeader = document.getElementById("btnName");
nameHeader.addEventListener("click", () => { sortFn("name")});
let reversedName = false;

const searchScoreButton = document.getElementById("btnScore")
searchScoreButton.addEventListener("click", () => { sortFn("score")});
let reversedScore = false;

let data = [];

const tableBody = document.querySelector("tbody");

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    tableBody.innerHTML = "<td colspan='6'>waiting...</td>";
    submitButton.disabled = true;
    setTimeout(() => { submitButton.disabled = false; }, 1500)

    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${textField.value}&size=${sizeField.value}`)
    const json = await response.json();
    data = json;
    
    if (json.objects.length === 0) {
        tableBody.innerHTML = `<td colspan='6'> no results for <strong>${textField.value}</strong></td>`
    } else {
        fillTable(json.objects);
    }
})

function sortFn(param) {
    if (param === "name") {
        reversedName = !reversedName;
        let newArr = [...data.objects];

        if (reversedName) {
            newArr.sort((a, b) => a.package.name.toLowerCase().localeCompare(b.package.name.toLowerCase()));
        } else {
            newArr.sort((a, b) => b.package.name.toLowerCase().localeCompare(a.package.name.toLowerCase()));
        }
        fillTable(newArr);
    } else if (param === "score") {
        reversedScore = !reversedScore;
        let newArr = [...data.objects];

        if (reversedScore) {
            newArr.sort((a, b) => Number(a.searchScore) - Number(b.searchScore));
        } else {
            newArr.sort((a, b) => Number(b.searchScore) - Number(a.searchScore));
        }
        fillTable(newArr);
    }
}

function fillTable(arr) {
    tableBody.innerHTML = "";
    arr.forEach((entry, index) => {
        const name = entry.package.name;
        const version = entry.package.version;
        const description = entry.package.description;
        const publisher = entry.package.publisher.username;
        const searchScore = entry.searchScore;

        const newRow = document.createElement("tr");
        const numberItem = document.createElement("td");
        numberItem.textContent = index+1;

        const nameItem = document.createElement("td");
        nameItem.textContent = name;

        const versionItem = document.createElement("td");
        versionItem.textContent = version;

        const descriptionItem = document.createElement("td");
        descriptionItem.textContent = description;

        const publisherItem = document.createElement("td");
        publisherItem.textContent = publisher;

        const searchScoreItem = document.createElement("td");
        searchScoreItem.textContent = searchScore;

        newRow.append(numberItem, nameItem, versionItem, descriptionItem, publisherItem, searchScoreItem);

        tableBody.appendChild(newRow);
    })
}