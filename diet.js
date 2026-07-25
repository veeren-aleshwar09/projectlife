(function () {

    const mealInput = document.getElementById("mealInput");
    const mealType = document.getElementById("mealType");
    const mealCalories = document.getElementById("mealCalories");
    const addMealBtn = document.getElementById("addMealBtn");
    const mealList = document.getElementById("mealList");

    let meals = [];

    function saveMeals() {
        localStorage.setItem("lifeosMeals", JSON.stringify(meals));
    }

    function loadMeals() {
        try {
            return JSON.parse(localStorage.getItem("lifeosMeals") || "[]");
        } catch {
            return [];
        }
    }

    function renderMeals() {

        mealList.innerHTML = "";

        if (meals.length === 0) {
            mealList.innerHTML = "<p style='opacity:.7'>No meals added.</p>";
            return;
        }

        meals.forEach(meal => {

            const card = document.createElement("div");

            card.className = "meal";

            card.dataset.id = meal.id;

            card.innerHTML = `
                <div>
                    <h3>${meal.name}</h3>
                    <p>${meal.type} • 🔥 ${meal.calories} kcal</p>
                </div>

                <button class="deleteMeal">
                    Delete
                </button>
            `;

            mealList.appendChild(card);

        });

    }

    function addMeal() {

        if (!mealInput.value.trim() || !mealCalories.value) return;

        meals.unshift({

            id: Date.now(),

            name: mealInput.value.trim(),

            type: mealType.value,

            calories: mealCalories.value

        });

        saveMeals();

        renderMeals();

        mealInput.value = "";

        mealCalories.value = "";

        mealType.selectedIndex = 0;

    }

    function deleteMeal(id) {

        meals = meals.filter(meal => meal.id !== id);

        saveMeals();

        renderMeals();

    }

    addMealBtn.addEventListener("click", addMeal);

    mealInput.addEventListener("keydown", e => {

        if (e.key === "Enter") {

            addMeal();

        }

    });

    mealList.addEventListener("click", e => {

        if (e.target.classList.contains("deleteMeal")) {

            const card = e.target.closest(".meal");

            deleteMeal(Number(card.dataset.id));

        }

    });

    function init() {

        meals = loadMeals();

        renderMeals();

    }

    init();

})();