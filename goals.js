(function () {

	const goalInput = document.getElementById("goalInput");
	const goalDate = document.getElementById("goalDate");
	const goalPriority = document.getElementById("goalPriority");
	const addGoalBtn = document.getElementById("addGoalBtn");
	const goalList = document.getElementById("goalList");

	let goals = [];

	function saveGoals() {
		localStorage.setItem("lifeosGoals", JSON.stringify(goals));
	}

	function loadGoals() {
		try {
			return JSON.parse(localStorage.getItem("lifeosGoals") || "[]");
		} catch {
			return [];
		}
	}

	function renderGoals() {

		goalList.innerHTML = "";

		if (goals.length === 0) {

			goalList.innerHTML = `
				<p style="opacity:.7">
					No goals yet.
				</p>
			`;

			return;

		}

		goals.forEach(goal => {

			const card = document.createElement("div");

			card.className = "goal";

			card.dataset.id = goal.id;

			card.innerHTML = `

				<div class="goal-info">

					<h3>${goal.completed ? "✅" : "🎯"} ${goal.text}</h3>

					<div class="goal-meta">

						${goal.priority} Priority

						•

						Due ${goal.date || "No Date"}

					</div>

				</div>

				<div>

					<input
						type="checkbox"
						${goal.completed ? "checked" : ""}
					>

					<button class="deleteGoal">

						Delete

					</button>

				</div>

			`;

			goalList.appendChild(card);

		});

	}

	function addGoal() {

		const text = goalInput.value.trim();

		if (!text) return;

		goals.unshift({

			id: Date.now(),

			text,

			date: goalDate.value,

			priority: goalPriority.value,

			completed: false

		});

		saveGoals();

		renderGoals();

		goalInput.value = "";

		goalDate.value = "";

		goalPriority.value = "High";

	}

	function toggleGoal(id) {

		goals = goals.map(goal => {

			if (goal.id === id) {

				return {

					...goal,

					completed: !goal.completed

				};

			}

			return goal;

		});

		saveGoals();

		renderGoals();

	}

	function deleteGoal(id) {

		goals = goals.filter(goal => goal.id !== id);

		saveGoals();

		renderGoals();

	}

	addGoalBtn.addEventListener("click", addGoal);

	goalInput.addEventListener("keydown", e => {

		if (e.key === "Enter") {

			addGoal();

		}

	});

	goalList.addEventListener("click", e => {

		if (e.target.classList.contains("deleteGoal")) {

			const card = e.target.closest(".goal");

			deleteGoal(Number(card.dataset.id));

		}

	});

	goalList.addEventListener("change", e => {

		if (e.target.type === "checkbox") {

			const card = e.target.closest(".goal");

			toggleGoal(Number(card.dataset.id));

		}

	});

	function init() {

		goals = loadGoals();

		renderGoals();

	}

	init();

})();

(function () {

	const goalInput = document.getElementById("goalInput");
	const goalDate = document.getElementById("goalDate");
	const goalPriority = document.getElementById("goalPriority");
	const addGoalBtn = document.getElementById("addGoalBtn");
	const goalList = document.getElementById("goalList");

	let goals = [];

	function saveGoals() {
		localStorage.setItem("lifeosGoals", JSON.stringify(goals));
	}

	function loadGoals() {
		try {
			return JSON.parse(localStorage.getItem("lifeosGoals") || "[]");
		} catch {
			return [];
		}
	}

	function renderGoals() {

		goalList.innerHTML = "";

		if (goals.length === 0) {

			goalList.innerHTML = `
				<p style="opacity:.7">
					No goals yet.
				</p>
			`;

			return;

		}

		goals.forEach(goal => {

			const card = document.createElement("div");

			card.className = "goal";

			card.dataset.id = goal.id;

			card.innerHTML = `

				<div class="goal-info">

					<h3>${goal.completed ? "✅" : "🎯"} ${goal.text}</h3>

					<div class="goal-meta">

						${goal.priority} Priority

						•

						Due ${goal.date || "No Date"}

					</div>

				</div>

				<div>

					<input
						type="checkbox"
						${goal.completed ? "checked" : ""}
					>

					<button class="deleteGoal">

						Delete

					</button>

				</div>

			`;

			goalList.appendChild(card);

		});

	}

	function addGoal() {

		const text = goalInput.value.trim();

		if (!text) return;

		goals.unshift({

			id: Date.now(),

			text,

			date: goalDate.value,

			priority: goalPriority.value,

			completed: false

		});

		saveGoals();

		renderGoals();

		goalInput.value = "";

		goalDate.value = "";

		goalPriority.value = "High";

	}

	function toggleGoal(id) {

		goals = goals.map(goal => {

			if (goal.id === id) {

				return {

					...goal,

					completed: !goal.completed

				};

			}

			return goal;

		});

		saveGoals();

		renderGoals();

	}

	function deleteGoal(id) {

		goals = goals.filter(goal => goal.id !== id);

		saveGoals();

		renderGoals();

	}

	addGoalBtn.addEventListener("click", addGoal);

	goalInput.addEventListener("keydown", e => {

		if (e.key === "Enter") {

			addGoal();

		}

	});

	goalList.addEventListener("click", e => {

		if (e.target.classList.contains("deleteGoal")) {

			const card = e.target.closest(".goal");

			deleteGoal(Number(card.dataset.id));

		}

	});

	goalList.addEventListener("change", e => {

		if (e.target.type === "checkbox") {

			const card = e.target.closest(".goal");

			toggleGoal(Number(card.dataset.id));

		}

	});

	function init() {

		goals = loadGoals();

		renderGoals();

	}

	init();

})();

