var input, buttons, smallButtons, result, blanks, lives = 5;
var hangmans = [
	"assets/hangman4.svg",
	"assets/hangman5.svg",
	"assets/hangman7.svg",
	"assets/hangman9.svg",
	"assets/hangman11.svg"];

function buttonClick(n) {
	console.log("calculator " + n + " pressed.");
	if (n == "=") {
		if (input.innerText != "") {
			document.getElementById("calculation").innerText = cleanCalculation(input.innerText + "=");
			result = eval(input.innerText);
			startHangman();
		}
	}
	else {
		input.innerText += "" + n;
	}
}

function smallButtonClick(n) {
	var correct = false;
	for (var i = 0; i < blanks.children.length; i++) {
		var child = blanks.children[i];
		if (child.dataset.val == n) {
			child.innerText = n;
			correct = true;
		}
	}
	if (correct == false) {
		proceedHangman();
	}

	var done = true;
	for (var i = 0; i < blanks.children.length; i++) {
		if (blanks.children[i].innerText == "_") {
			done = false;
		}
	}

	if (done) {
		document.getElementById("digits").style.display = "none";
		document.body.style.backgroundColor = "lightgreen";
		document.getElementById("hangmanText").innerText = "You won.";
	}
	
	return correct;
}

function init() {
	input = document.getElementById("input");
	buttons = document.getElementsByClassName("button");
	blanks = document.getElementById("blanks")
	smallButtons = document.getElementsByClassName("button-small")

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", (ev) => {
			if (ev.isTrusted) {
				buttonClick(ev.target.dataset["n"])
			}
		});
	}

	for (var i = 0; i < smallButtons.length; i++) {
		smallButtons[i].addEventListener("click", (ev) => {
			if (ev.isTrusted) {
				if (ev.target.dataset["clicked"] == "0") {
					var correct = smallButtonClick(ev.target.dataset["n"]);
					ev.target.style.cursor = "default";
					if (correct) {
						ev.target.style.backgroundColor = "lightgreen";
					}
					else {
						ev.target.style.backgroundColor = "lightpink";
					}
					ev.target.dataset["clicked"] = "1";
				}
			}
		});
	}
}

function startHangman() {
	document.getElementById("calculator").style.display = "none";
	document.getElementById("hangman").style.display = "initial";
	input.innerText = result;
	result = "" + result;
	var numBlanks = result.length;
	for (var i = 0; i < numBlanks; i++) {
		var d = document.createElement("div");
		d.classList.add("blank");
		d.innerText = "_";
		d.dataset["val"] = result[i];
		blanks.appendChild(d);
	}
}

function proceedHangman() {
	if (lives == 0) {
		document.getElementById("digits").style.display = "none";
		document.body.style.backgroundColor = "lightpink";
		document.getElementById("hangmanText").innerText = "You lost.";
	}
	else {
		var idx = 5 - lives;
		lives -= 1;
		document.getElementById("hangmanImage").src = hangmans[idx];
	}
}

function cleanCalculation(s) {
	return s.replaceAll("+", " + ").replaceAll("-", " - ").replaceAll("*", " * ").replaceAll("/", " / ").replaceAll("=", " =");
}
