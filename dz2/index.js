/*

задачи реализовать с интерфейсом испорльзую html css

1.
Напишите программу, которая запрашивает у пользователя длины трех сторон треугольника и объявляет функцию checkTriangleExistence, которая принимает длины сторон в качестве параметров и возвращает сообщение о том, существует ли треугольник с такими сторонами или нет.

Чтобы проверить треугольник на существование, нужно сравнить каждую сторону с суммой двух других. Если хотя бы в одном случае сторона окажется больше либо равна сумме двух других, то треугольника с такими сторонами не существует.


2.
Перед вами объект, который содержит значение основания. Добавьте в объект метод, который принимает от пользователя число Y, как параметр и возводит число Y - 2 в степень Y. Напишите инструкции ввода числа Y и вывода результата выполнения метода.


3.
Перед вами программа, которая сперва запрашивает у пользователя сумму, а потом спрашивает, какую операцию он хочет с ней совершить: внести эту сумму на счет или снять эту сумму со счета. Если сумма снятия превышает баланс, программа выводит сообщение о недостатке средств. Вставьте вместо троеточий верные инструкции.

*/

// 1
const triangleA = document.getElementById("triangle_a");
const triangleB = document.getElementById("triangle_b");
const triangleC = document.getElementById("triangle_c");
const triangleSubmitButton = document.getElementById("triangle_submit");

function checkTriangleExistence(ap, bp, cp) {
	const a = Number(ap);
	const b = Number(bp);
	const c = Number(cp);
	if (a < 1 || typeof a !== "number") {
		alert("Параметр A введен неверно");
		return;
	}
	if (b < 1 || typeof b !== "number") {
		alert("Параметр B введен неверно");
		return;
	}
	if (c < 1 || typeof c !== "number") {
		alert("Параметр C введен неверно");
		return;
	}

	if (a >= b+c || b >= a+c || c >= a+b) {
		alert("Треугольник не существует");
		return;
	}

	alert("Треугольник существует");
	return;
}

triangleSubmitButton.addEventListener("click", () => {checkTriangleExistence(
	triangleA.value, triangleB.value, triangleC.value
)});


// 2

const yInput = document.getElementById("task2");
const task2Submit = document.getElementById("task2_submit");

const calculator = {
	base: 0,
	power() { alert( (this.base - 2) ** this.base ); }
};

task2Submit.addEventListener("click", () => {
	calculator.base = yInput.value;
	calculator.power();
});``

// 3

let balance = 0;
const balanceDisplay = document.getElementById("task3_balance");

const valueInput = document.getElementById("task3_value");

const depositButton = document.getElementById("task3_deposit");
const withdrawButton = document.getElementById("task3_withdraw");

depositButton.addEventListener("click", () => { deposit(valueInput.value) });
withdrawButton.addEventListener("click", () => { withdraw(valueInput.value) });

function check(inputValue) {
	const messages = [];
	if (Number(inputValue) === NaN || Number(inputValue) < 1) {
		messages.push("Неверное значение");	
	}

	return messages;
}

function deposit(value) {
	const failedCheck = check(value);
	if (failedCheck.length > 0) {
		alert(failedCheck.toString());
		return;
	}

	const newBalance = balance + Number(value);

	renderBalance(newBalance);
	balance = newBalance;

	return;
}

function withdraw(value) {
	const failedCheck = check(value);
	if (failedCheck.length > 0) {
		alert(failedCheck);
		return;
	}
	
	const newBalance = balance - Number(value);
	if (newBalance < 0) {
		alert("Недостаточно средств");
		return;
	}

	renderBalance(newBalance);
	balance = newBalance;

	return;
}

function renderBalance(value){
	balanceDisplay.textContent = value.toString();
	valueInput.value = "";
	return;
}

renderBalance(balance);

