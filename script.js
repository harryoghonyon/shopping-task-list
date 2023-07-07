const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemsFilter = document.querySelector("#filter");
const items = itemList.querySelectorAll("li");

const addItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add item");
    return;
  }

  addItemToDOM(newItem);

  addItemToLocalStorage(newItem);

  checkUI();

  itemInput.value = "";
};

const addItemToDOM = (item) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  checkUI();
};

const clearItems = () => {
  if (confirm("Are you sure?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  checkUI();
};

const filterItems = (e) => {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemsFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemsFilter.style.display = "block";
  }
};

const addItemToLocalStorage = (item) => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

itemForm.addEventListener("submit", addItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemsFilter.addEventListener("input", filterItems);
checkUI();
