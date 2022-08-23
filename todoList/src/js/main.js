const $LIST_UL = document.querySelector(".listSection__ul");
const $LIST_SECTION = document.querySelector(".listSection");
const $SUBMIT_BTN = document.querySelector(".inputSection__submit");
const $TEXT = document.querySelector(".inputSection__input");

console.log($LIST_SECTION);

function App() {
  this.state = {
    nodes: [
      {
        name: "hi",
      },
    ],
  };

  const nodes = new Nodes({
    $LIST_SECTION,
    initialState: this.state,
  });

  $SUBMIT_BTN.addEventListener("click", () => {
    const nextState = {
      nodes: [
        {
          name: $TEXT.value,
        },
      ],
    };
    $TEXT.value = "";
    nodes.setState(nextState);
  });
}

new App();

function Nodes({ $LIST_SECTION, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("ul");
  this.$target.classList.add("listSection__ul");
  $LIST_SECTION.append(this.$target);

  this.setState = (nextState) => {
    if (!nextState.nodes[0].name) {
      return;
    }
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.insertAdjacentHTML(
      "beforeend",
      `<li class="listSection__li">
          <article class="listSection__article">
            <p class="listSection__text">
             ${this.state.nodes[0].name}
            </p>
            <button class="listSection__btn">X</button>
          </article>
         </li>
      `
    );
    this.$target.addEventListener("click", (e) => {
      const target = e.target;
      const li = target.closest("li");
      const btn = target.closest("button");

      if (btn) {
        li.remove();
      }
      if (li) {
        if (!li.classList.contains("check")) {
          li.classList.add("check");
        } else {
          li.classList.remove("check");
        }
      }
    });
  };

  this.render();
}
