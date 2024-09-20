(function () {
	var hour = document.querySelector(".hour");
	var minutes = document.querySelector(".minute");
	var seconds = document.querySelector(".second");

	var startBtn = document.querySelector(".start");
	var stopBtn = document.querySelector(".stop");
	var resetBtn = document.querySelector(".reset");

	var countDownTimer = null;

	startBtn.addEventListener("click", function () {
		if (hour.value == 0 && minutes.value == 0 && seconds.value == 0) {
			console.log(hour.value);
			return;
		}

		function startInterval() {
			startBtn.style.display = "none";
			stopBtn.style.display = "initial";

			countDownTimer = setInterval(() => {
				timer();
			}, 1000);
		}

		startInterval();
	});

	function stopInterval(state) {
		startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
		// hello
		startBtn.style.display = "initial";
		stopBtn.style.display = "none";
		clearInterval(countDownTimer);
	}

	function timer() {
		if (seconds.value > 60) {
			minutes.value++;
			seconds.value = seconds.value - 59;
		}
		if (minutes.value > 60) {
			hour.value++;
			minutes.value = minutes.value - 59;
		}
		if (hour.value == 0 && minutes.value == 0 && seconds.value == 0) {
			hour.value = "";
			minutes.value = "";
			seconds.value = "";
			stopInterval();
		} else if (seconds.value != 0) {
			// when seconds gets less than 10 it will add 0 infront of the single digit which improves the formatting
			seconds.value = `${seconds.value <= 10 ? "0" : ""}${seconds.value - 1}`;
		} else if (minutes.value != 0 && seconds.value == 0) {
			seconds.value = 59;
			minutes.value = `${minutes.value <= 10 ? "0" : ""}${minutes.value - 1}`;
		} else if (hour.value != 0 && minutes.value == 0) {
			minutes.value = 60;
			hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
		}
	}

	stopBtn.addEventListener("click", function () {
		stopInterval("pause");
	});

	resetBtn.addEventListener("click", function () {
		hour.value = "";
		minutes.value = "";
		seconds.value = "";
		stopInterval();
	});
})();
