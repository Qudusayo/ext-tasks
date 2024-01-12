<template>
  <main id="hello">
    <!-- gradients -->
    <div class="css-blurry-gradient-blue"></div>
    <div class="css-blurry-gradient-green"></div>

    <section class="hero">
      <div class="head">
        <h2>{{ date }}</h2>
        <h1>{{ timestamp }}</h1>
      </div>
      <form class="flex items-center justify-center gap-5 w-[80%]" id="search" @submit.prevent="submit">
        <input type="text"
          class="bg-transparent text-white border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl"
          placeholder="Search..." v-model="searchInput" />
        <button
          class="text-white bg-[#4d5bce] hover:bg-[#4d5bce] focus:outline-none focus:ring-0 font-light rounded-lg text-xl sm:w-auto px-5 py-2.5 text-center dark:bg-[#4d5bce] dark:hover:bg-[#4d5bce] dark:focus:ring-[#4d5bce]"
          type="submit">
          Search
        </button>
      </form>
    </section>

    <section data-aos="fade-up" class="game" v-if="!isMobile">
      <!-- <SnakeGame /> -->
      <div id="console">
        <!-- bolts -->
        <img id="corner" src="./icons/console/bolt-up-left.svg" alt="" class="absolute top-2 left-2 opacity-70" />
        <img id="corner" src="./icons/console/bolt-up-right.svg" alt="" class="absolute top-2 right-2 opacity-70" />
        <img id="corner" src="./icons/console/bolt-down-left.svg" alt="" class="absolute bottom-2 left-2 opacity-70" />
        <img id="corner" src="./icons/console/bolt-down-right.svg" alt="" class="absolute bottom-2 right-2 opacity-70" />

        <!-- Game Screen -->
        <div id="game-screen" ref="gameScreen"></div>

        <button id="start-button" class="font-fira_retina" @click="startGame">
          start-game
        </button>

        <!-- Game Over -->
        <div id="game-over" class="hidden">
          <span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">GAME
            OVER!</span>
          <button
            class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white"
            @click="startAgain">
            start-again
          </button>
        </div>

        <div id="congrats" class="hidden">
          <span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">WELL
            DONE!</span>
          <button
            class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white"
            @click="startAgain">
            play-again
          </button>
        </div>

        <div id="console-menu" class="h-full flex flex-col items-end justify-between">
          <div>
            <div id="instructions" class="font-fira_retina text-sm text-white">
              <p>// use your keyboard</p>
              <p>// arrows to play</p>

              <div id="buttons" class="w-full flex flex-col items-center gap-1 pt-5">
                <buttony id="console-button" class="button-up" @click="move('up')">
                  <img src="./icons/console/arrow-button.svg" alt="" />
                </buttony>

                <div class="grid grid-cols-3 gap-1">
                  <button id="console-button" class="button-left" @click="move('left')">
                    <img src="./icons/console/arrow-button.svg" alt="" class="-rotate-90" />
                  </button>

                  <button id="console-button" class="button-down" @click="move('down')">
                    <img src="./icons/console/arrow-button.svg" alt="" class="rotate-180" />
                  </button>

                  <button id="console-button" class="button-right" @click="move('right')">
                    <img src="./icons/console/arrow-button.svg" alt="" class="rotate-90" />
                  </button>
                </div>
              </div>
            </div>

            <!-- score board -->
            <div id="score-board" class="w-full flex flex-col pl-5">
              <p class="font-fira_retina text-white pt-5">// food left</p>

              <div id="score" class="grid grid-cols-5 gap-5 justify-items-center pt-5 w-fit">
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
                <div class="food"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      gameInterval: null,
      gameStarted: false,
      gameOver: false,
      food: { x: 10, y: 5 },
      snake: [
        { x: 10, y: 12 },
        { x: 10, y: 13 },
        { x: 10, y: 14 },
        { x: 10, y: 15 },
        { x: 10, y: 16 },
        { x: 10, y: 17 },
        { x: 10, y: 18 },
        { x: 11, y: 18 },
        { x: 12, y: 18 },
        { x: 13, y: 18 },
        { x: 14, y: 18 },
        { x: 15, y: 18 },
        { x: 15, y: 19 },
        { x: 15, y: 20 },
        { x: 15, y: 21 },
        { x: 15, y: 22 },
        { x: 15, y: 23 },
        { x: 15, y: 24 },
      ],
      direction: "up",
      isMobile: false,
      loading: true,
      date: "",
      timestamp:
        new Date().getHours().toString().padStart(2, "0") +
        ":" +
        new Date().getMinutes().toString().padStart(2, "0"),
      searchInput: "",
    };
  },
  methods: {
    async submit() {
      if(this.searchInput === "") {
        return;
      }
      window.location.href = `https://www.google.com/search?q=${this.searchInput}`;
    },
    startGame() {
      // hide start button
      console.log("start game");
      document.getElementById("start-button").style.display = "none";

      // start game
      this.gameStarted = true;
      this.gameInterval = setInterval(this.moveSnake, 50);
    },
    startAgain() {
      // Mostrar botón de start-game
      document.getElementById("start-button").style.display = "block";

      // Ocultar game over
      document.getElementById("game-over").style.display = "none";
      document.getElementById("congrats").style.display = "none";

      // reiniciar datos del juego
      this.gameStarted = false;
      this.gameOver = false;
      this.restartScore();
      this.food = {
        x: 10,
        y: 5,
      };
      (this.snake = [
        { x: 10, y: 12 },
        { x: 10, y: 13 },
        { x: 10, y: 14 },
        { x: 10, y: 15 },
        { x: 10, y: 16 },
        { x: 10, y: 17 },
        { x: 10, y: 18 },
        { x: 11, y: 18 },
        { x: 12, y: 18 },
        { x: 13, y: 18 },
        { x: 14, y: 18 },
        { x: 15, y: 18 },
        { x: 15, y: 19 },
        { x: 15, y: 20 },
        { x: 15, y: 21 },
        { x: 15, y: 22 },
        { x: 15, y: 23 },
        { x: 15, y: 24 },
      ]),
        (this.direction = "up");

      // limpiar intervalo de juego
      clearInterval(this.gameInterval);
      this.render();
    },
    // ... resto del código
    moveSnake() {
      let newX = this.snake[0].x;
      let newY = this.snake[0].y;

      switch (this.direction) {
        case "up":
          newY--;
          break;
        case "down":
          newY++;
          break;
        case "left":
          newX--;
          break;
        case "right":
          newX++;
          break;
      }

      // check if snake dont leave from game window
      // and check if snake dont eat itself
      if (
        newX >= 0 &&
        newX < 24 &&
        newY >= 0 &&
        newY < 40 &&
        !this.snake.find(
          (snakeCell) => snakeCell.x === newX && snakeCell.y === newY
        )
      ) {
        /* snake move next cell */
        this.snake.unshift({ x: newX, y: newY });

        /* check snake next cell is food */
        if (newX === this.food.x && newY === this.food.y) {
          // add score
          this.score++;

          // add food to score board
          const scoreFoods = document.getElementsByClassName("food");
          scoreFoods[this.score - 1].style.opacity = 1;

          // check if score is 10 (max score)
          if (this.score === 10) {
            // move snake head to food (fix snake head position at end)
            this.snake.unshift({ x: newX, y: newY }); // move head
            this.food = { x: null, y: null }; // remove food
            clearInterval(this.gameInterval); // stop game
            document.getElementById("congrats").style.display = "block"; // show congrats
            this.gameOver = true; // game over
            this.gameStarted = false; // stop game
          } else {
            // create new food
            this.food = {
              x: Math.floor(Math.random() * 24),
              y: Math.floor(Math.random() * 40),
            };
          }
        } else {
          // if next cell is not food: snake pop last cell
          this.snake.pop();
        }
      } else {
        // GAME OVER: if snake leave from game window or eat itself
        clearInterval(this.gameInterval);
        document.getElementById("game-over").style.display = "block";
        this.gameStarted = false;
        this.gameOver = true;
      }
      this.render();
    },
    render() {
      let gameScreen = this.$refs.gameScreen;
      gameScreen.innerHTML = "";

      // responsive cell screen
      // (this.$refs.gameScreen.offsetWidth / 20) + "px";

      /* const widthCells = window.innerWidth > 1536 ? 24 : 20; */
      const cellSize = window.innerWidth > 1536 ? "10px" : "8px";
      // eje y
      for (let i = 0; i < 40; i++) {
        // exe x
        for (let j = 0; j < 24; j++) {
          /* cell style */
          let cell = document.createElement("div");
          cell.classList.add("cell");
          cell.style.width = cellSize;
          cell.style.height = cellSize;
          cell.style.display = "flex";
          cell.style.flexShrink = 0;
          cell.classList.add("black");

          /* Food cell style */
          if (j === this.food.x && i === this.food.y) {
            cell.style.backgroundColor = "#43D9AD";
            cell.style.borderRadius = "50%";
            cell.style.boxShadow = "0 0 10px #43D9AD";
          }

          /* Estilo de la serpiente a medida que va crediendo */
          let snakeCell = this.snake.find(
            (snakeCell) => snakeCell.x === j && snakeCell.y === i
          );

          if (snakeCell) {
            cell.style.backgroundColor = "#43D9AD";
            cell.style.opacity =
              1 - this.snake.indexOf(snakeCell) / this.snake.length;
            cell.classList.add("green");
          }

          /* Estilo de la cabeza */
          if (snakeCell && this.snake.indexOf(snakeCell) === 0) {
            let headRadius = "5px";
            if (this.direction === "up") {
              cell.style.borderTopLeftRadius = headRadius;
              cell.style.borderTopRightRadius = headRadius;
            }
            if (this.direction === "down") {
              cell.style.borderBottomLeftRadius = headRadius;
              cell.style.borderBottomRightRadius = headRadius;
            }
            if (this.direction === "left") {
              cell.style.borderTopLeftRadius = headRadius;
              cell.style.borderBottomLeftRadius = headRadius;
            }
            if (this.direction === "right") {
              cell.style.borderTopRightRadius = headRadius;
              cell.style.borderBottomRightRadius = headRadius;
            }
          }
          gameScreen.appendChild(cell);
        }
      }
    },
    restartScore() {
      this.score = 0;
      const scoreFoods = document.getElementsByClassName("food");
      for (let i = 0; i < scoreFoods.length; i++) {
        scoreFoods[i].style.opacity = 0.3;
      }
    },
    move(direction) {
      switch (direction) {
        case "up":
          if (this.direction !== "down") {
            this.direction = "up";
          }
          break;
        case "down":
          if (this.direction !== "up") {
            this.direction = "down";
          }
          break;
        case "left":
          if (this.direction !== "right") {
            this.direction = "left";
          }
          break;
        case "right":
          if (this.direction !== "left") {
            this.direction = "right";
          }
          break;
      }
    },
    handleResize() {
      if (window.innerWidth <= 1024) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    getNow: function () {
      const today = new Date();
      const time =
        today.getHours().toString().padStart(2, "0") +
        ":" +
        today.getMinutes().toString().padStart(2, "0");
      this.timestamp = time;
    },
    getDate: function () {
      const currentDate = new Date();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day = currentDate.getDate();
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const dayOfWeek = dayNames[currentDate.getDay()];
      const formattedDate = `${dayOfWeek} ${day}, ${year}`;
      this.date = formattedDate;
    },
  },
  created() {
    this.getDate();
    setInterval(this.getNow, 1000);
  },
  mounted() {
    // Detectamos si es mobile
    if (window.innerWidth <= 1024) {
      this.isMobile = true;
    }

    // Escuchamos los cambios de tamaño de pantalla
    window.addEventListener("resize", this.handleResize);

    // When the component is mounted, we can remove the loader.
    this.loading = false;

    document.addEventListener("keydown", (event) => {
      if (this.gameStarted) {
        switch (event.keyCode) {
          case 37:
            if (this.direction !== "right") {
              this.direction = "left";
            }
            break;
          case 38:
            if (this.direction !== "down") {
              this.direction = "up";
            }
            break;
          case 39:
            if (this.direction !== "left") {
              this.direction = "right";
            }
            break;
          case 40:
            if (this.direction !== "up") {
              this.direction = "down";
            }
            break;
        }
      } else {
        switch (event.keyCode) {
          case 32:
            if (this.gameOver) {
              this.startAgain();
            } else {
              this.startGame();
            }
            break;
        }
      }
    });

    /* window.innerWidth < 1536 ? cellSize = 8 : cellSize = 10; */
    /* this.food = {
    x: Math.floor(Math.random() * 24),
    y: Math.floor(Math.random() * 40)
  }; */
    window.onresize = () => {
      this.render();
    };

    this.render();
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed.
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>