javascript: (() => {
	const openTrackCloseBtn = document.querySelectorAll(
		".ngneat-close-dialog.ng-star-inserted",
	)[0];
	if (openTrackCloseBtn) {
		openTrackCloseBtn.dispatchEvent(new MouseEvent("click"));
	}

	const [prevPageBtn, nextPageBth] = ["Ліва стрілка", "Права стрілка"].map(
		(v) => document.querySelectorAll(`[alt="${v}"]`)[0].parentElement,
	);

	const pressRepeatadly = (btn, amount) => {
		const event = new MouseEvent("click");
		for (let i = 0; i < amount; i++) {
			btn.dispatchEvent(event);
		}
	};

	const switchPage = (targetPage) => {
		const [currentPage, totalPages] = document
			.querySelectorAll(".paginator")[0]
			.innerText.split(" / ");
		const pagesMargin = targetPage - currentPage;
		pressRepeatadly(
			pagesMargin < 0 ? prevPageBtn : nextPageBth,
			Math.abs(pagesMargin),
		);
	};

	const input = prompt("Перейти на учасника №:");
	if (!input) return;
	const targetNumber = Number(input);
	const totalTracksAmount = Number(
		document
			.querySelectorAll(".paginator-total")[0]
			.innerText.match(/[0-9]+/)[0],
	);
	if (!targetNumber || targetNumber <= 0 || targetNumber > totalTracksAmount)
		return alert(`Введений текст не підходить: ${input}`);
	const targetPage = Math.ceil(targetNumber / 15);
	switchPage(targetPage);

	const getTracks = () =>
		document.querySelectorAll(".audio-container-row.ng-star-inserted");
	const targetRelNum = targetNumber % 15;
	const trackElem = getTracks()[targetRelNum === 0 ? 14 : targetRelNum - 1];
	const mark = trackElem.querySelectorAll(".mark")[0];
	mark.dispatchEvent(new MouseEvent("click"));
})();
