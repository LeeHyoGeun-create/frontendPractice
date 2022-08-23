export default function Second({ onClick, onName }) {
  this.state = {
    name: "Miso",
  };

  this.onClick = onClick;
  this.onName = onName;

  this.render = () => {
    this.onClick();
    onClick();
    this.onName();
    onName();
  };

  this.render();
}
