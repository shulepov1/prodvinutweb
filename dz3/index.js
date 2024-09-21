// проверить является ли строка палиндромом

const palindromeInput = document.getElementById("palindrome_inpt");
const palindromeResult = document.getElementById("palindrome_result");

function isPalindrome(str) {
	let s = str.toLowerCase();
	for (let i = 0; i < Math.floor(s.length / 2); i += 1) {
		if (s[i] !== s[s.length - 1 - i]) {
			return false;
		}
	}
	return true;
}

palindromeInput.addEventListener("input", (event) => {
	if (event.currentTarget.value === "") {
		palindromeResult.textContent = "";
		return;
	}
	const isP = isPalindrome(event.currentTarget.value);
	palindromeResult.textContent = isP.toString();
});
