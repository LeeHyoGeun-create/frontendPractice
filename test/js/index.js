import Second from "./app.js";

function First() {
  const second = new Second({
    onClick: () => {
      console.log("onClick", this);
    },
    onName: function () {
      console.log("onName", this);
    },
  });
}

new First();
