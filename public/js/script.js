/*Search bar */
function search() {
  let input = document.getElementById("search-bar").value;
  input = input.toLowerCase();
  let itemContainers = document.getElementsByClassName("item-container");

  for (let i = 0; i < itemContainers.length; i++) {
    if (!itemContainers[i].innerHTML.toLowerCase().includes(input)) {
      itemContainers[i].style.display = "none";
    } else {
      itemContainers[i].style.display = "list-item";
    }
  }
}
