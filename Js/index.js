var bookMarkNameInput = document.getElementById("bookMarkName");
var webSiteUrlInput = document.getElementById("webSiteUrl");
var dataList = [];
var validMsgTxt = document.getElementById("infoMsg");
var btnVisit = document.getElementById("btnVisit");
var xMark = document.getElementById("xMark");

if (localStorage.getItem("webData") !== null) {
  dataList = JSON.parse(localStorage.getItem("webData"));
  showData();
}

function addData() {
  if (validName() == true && validUrl() == true) {
    var webSite = {
      name: bookMarkNameInput.value,
      url: webSiteUrlInput.value,
    };
    dataList.push(webSite);
    localStorage.setItem("webData", JSON.stringify(dataList));
    showData();
    clearData();
  } else {
    msgMoudle();
  }
}

function showData() {
  var cartona = "";
  for (var i = 0; i < dataList.length; i++) {
    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${dataList[i].name}</td>
        <td><a onclick="visit(${i})" type="button" class="btn btn-success" id="btnVisit"><span class="pe-2"><i class="fa-solid fa-eye"></i></span>Visit</a></td>
        <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger"><span class="pe-2"><i class="fa-solid fa-trash-can"></i></span>Delete</button></td>
    </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function clearData() {
  bookMarkNameInput.value = null;
  webSiteUrlInput.value = null;
  bookMarkNameInput.classList.remove("is-valid");
  webSiteUrlInput.classList.remove("is-valid");
}

function deleteData(indexItem) {
  dataList.splice(indexItem, 1);
  showData();
  localStorage.setItem("webData", JSON.stringify(dataList));
}

function validName() {
  var regex = /^\w{3,}(\s+\w+)*$/;
  var text = bookMarkNameInput.value;
  if (regex.test(text) == true) {
    bookMarkNameInput.classList.add("is-valid");
    bookMarkNameInput.classList.remove("is-invalid");
    return true;
  } else {
    bookMarkNameInput.classList.add("is-invalid");
    bookMarkNameInput.classList.remove("is-valid");
    return false;
  }
}

function validUrl() {
  var regex = /^(https?:\/\/)(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  var text = webSiteUrlInput.value;
  if (regex.test(text) == true) {
    webSiteUrlInput.classList.add("is-valid");
    webSiteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    webSiteUrlInput.classList.add("is-invalid");
    webSiteUrlInput.classList.remove("is-valid");
    return false;
  }
}

function visit(index) {
  linkUrl = dataList[index].url;
  window.open(`${linkUrl}`, "_blank");
}

xMark.addEventListener("click", function () {
  toClose();
});

document.addEventListener("keyup", function (e) {
  if (e.key == "Escape") {
    toClose();
  }
});

function toClose() {
  validMsgTxt.classList.add("d-none");
}

function msgMoudle() {
  validMsgTxt.classList.remove("d-none");
}
