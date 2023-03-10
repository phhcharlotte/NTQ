import { EMPLOYEES } from "../MOCK_DATA.js";

const nextPage = document.querySelector(".btn-next");
const prevPage = document.querySelector(".btn-prev");
const pageNumber = document.querySelector(".pageNumber");
const totalEmployee = document.querySelector(".totalEmployees");
const itemStore = document.querySelector(".wrapper-bottom-content");
const sortA = document.querySelector(".sort-A");
const sortZ = document.querySelector(".sort-Z");
const searchInput = document.querySelector(".search");
const valueName = document.querySelector(".name-text");
const valueId = document.querySelector(".id-text");
const numberItem = document.querySelector("#numberItem");
const valueEmail = document.querySelector(".email-text");
const valueJob = document.querySelector(".job-text");
const addEmployees = document.querySelector(".add-employees");
const add = document.querySelector(".add");
const over = document.querySelector(".over");
const formAdd = document.querySelector(".formAdd");

let listEmployees = [];
let currenPage = 1;
let perPage = 40;
let newEmployees = EMPLOYEES;
const renderData = (datas) => {
  const valueResult = datas
    .map((data) => {
      return `  <div class="item-employee" id = "${data.id}" ">
      <div class="img-employee">
       <div class ="logoAvatar">${getAvatar(data.name)}</div>
        <p class="icon-employee">
          <span>
            <i id="icon-fa" class="fa-solid fa-comments"></i>
          </span>
          <span>
            <i id="icon-fa" class="fa-solid fa-users"></i>
          </span>
        </p>
      </div>
      <div class="item-detail-employee">
        <div class="item-name" style="padding-left: 10px">
          <span>${data.name}</span>
          <li>${data.job}</li>
        </div>
        <div class="item-email">
          <li style="list-style-type: none">
            <i id="icon-fa" class="fa-solid fa-envelope"></i>
          </li>
          <span>${data.email}</span>
        </div>
        <div class="item-btn-follow">
          <button class="btn-follow">Follow</button>
        </div>
      </div>
    </div>`;
    })
    .join("");
  return valueResult;
};
const pagerCount = (value, n, x) => {
  const valueSlice = value.slice((n - 1) * x, (n - 1) * x + x);
  return valueSlice;
};

function loc_xoa_dau(str) {
  // G???p nhi???u d???u space th??nh 1 space
  str = str.replace(/\s+/g, " ");
  // lo???i b??? to??n b??? d???u space (n???u c??) ??? 2 ?????u c???a chu???i
  str = str.trim();
  // b???t ?????u x??a d???u ti???ng vi???t  trong chu???i
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
  str = str.replace(/??|??|???|???|??/g, "I");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
  str = str.replace(/???|??|???|???|???/g, "Y");
  str = str.replace(/??/g, "D");
  return str;
}

function getAvatar(name) {
  const nameSplit = name.trim().split(" ");
  const avatar = Number(nameSplit[nameSplit.length - 1])
    ? nameSplit[nameSplit.length - 2][0].toLocaleUpperCase()
    : nameSplit[nameSplit.length - 1][0].toLocaleUpperCase();
  return avatar;
}

function renderResult(data, currenPage) {
  listEmployees = [...pagerCount(data, currenPage, perPage)];
  itemStore.innerHTML = renderData(listEmployees);
  pageNumber.innerHTML = `${(currenPage - 1) * perPage + 1}-${
    (currenPage - 1) * perPage + perPage
  }`;
  totalEmployee.innerHTML = `${EMPLOYEES.length}`;
}
renderResult(EMPLOYEES, currenPage);

numberItem.onchange = (e) => {
  perPage = Number(e.target.value);
  renderResult(newEmployees, currenPage);
};
add.onclick = () => {
  over.style.display = "block";
  formAdd.style.display = "block";
};
over.onclick = () => {
  over.style.display = "none";
  formAdd.style.display = "none";
};

nextPage.onclick = () => {
  if (currenPage < Math.ceil(newEmployees.length / perPage)) {
    currenPage++;
    listEmployees = [...pagerCount(newEmployees, currenPage, perPage)];
    itemStore.innerHTML = renderData(listEmployees);
    pageNumber.innerHTML =
      listEmployees.length >= currenPage * 40
        ? `${(currenPage - 1) * perPage + 1}-${
            (currenPage - 1) * perPage + perPage
          }`
        : `${(currenPage - 1) * perPage + 1}-${
            listEmployees.length + (currenPage - 1) * perPage
          }`;
    prevPage.style.opacity = 1;
  } else {
    nextPage.style.opacity = 0.5;
    currenPage = Math.ceil(newEmployees.length / perPage);
  }
};

prevPage.onclick = () => {
  if (currenPage > 1) {
    currenPage--;
    renderResult(newEmployees, currenPage);
    prevPage.style.opacity = 1;
    nextPage.style.opacity = 1;
  } else {
    prevPage.style.opacity = 0.5;
    currenPage = 1;
  }
};

sortA.onclick = () => {
  currenPage = 1;
  newEmployees.sort((a, b) => {
    let c = a.name.trim().split(" ");
    let d = b.name.trim().split(" ");
    let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
    let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
    return ("" + e).localeCompare(f);
  });
  renderResult(newEmployees, currenPage);
};
sortZ.onclick = () => {
  currenPage = 1;
  newEmployees.sort((a, b) => {
    let c = a.name.trim().split(" ");
    let d = b.name.trim().split(" ");
    let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
    let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
    return ("" + f).localeCompare(e);
  });
  renderResult(newEmployees, currenPage);
};

searchInput.onkeyup = (e) => {
  currenPage = 1;
  let valueInput = e.target.value.toLowerCase();
  let searchListValueName = newEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().search(valueInput) !== -1 ||
      employee.job.toLowerCase().search(valueInput) !== -1
  );
  renderResult(searchListValueName, currenPage);
};

addEmployees.onclick = () => {
  if (valueName.value !== "" && valueJob.value !== "") {
    const inputValueName = valueName.value.trim();
    const nameValue = inputValueName.toLowerCase().split(" ");
    const listID = newEmployees.map((data) => data.id);
    const maxID = Math.max.apply(Math, listID);
    const count = maxID + 1;
    valueId.innerHTML = `${count}`;
    const jobNewEmployee = valueJob.value;

    let mangEmail =
      nameValue.length > 1
        ? [nameValue[nameValue.length - 1], nameValue[0]]
        : nameValue;
    let tenEmail = loc_xoa_dau(mangEmail.join("."));
    let newName;
    let newEmail;

    const arrNameNotSpace = [];
    const arrSameEmail = [];
    newEmployees.forEach((e) => {
      const arrName = e.name.toLowerCase().trim().split(" ");
      arrNameNotSpace.push(arrName);

      if (e.email) {
        if (
          e.email.indexOf(tenEmail) === 0 &&
          (Number(e.email[tenEmail.length]) ||
            e.email.indexOf("@") === tenEmail.length)
        ) {
          arrSameEmail.push(e.email);
        }
      }
    });

    const arrSameName = [];
    arrNameNotSpace.forEach((item) => {
      if (
        JSON.stringify(item) === JSON.stringify(nameValue) ||
        (Number(item[item.length - 1]) &&
          JSON.stringify(item.slice(0, -1)) === JSON.stringify(nameValue))
      ) {
        arrSameName.push(item);
      }
    });

    const arrNumber = [0];
    if (arrSameName.length === 0) {
      newName = inputValueName;
    } else {
      arrSameName.forEach((element) => {
        element.forEach((e) => {
          if (Number(e)) {
            arrNumber.push(e);
            console.log(arrNumber);
          }
        });
      });
      arrNumber.sort((a, b) => {
        return Number(a) - Number(b);
      });
      newName =
        inputValueName + " " + (Number(arrNumber[arrNumber.length - 1]) + 1); // ?????ng Th??? Minh H??a 5
    }

    const arrNumberEmail = [0];
    if (arrSameEmail.length === 0) {
      newEmail = tenEmail + "@ntq-solution.com.vn";
    } else {
      arrSameEmail.forEach((element) => {
        if (/[0-9]/.test(element)) {
          const soCuaEmail = parseInt(element.replace(/[^0-9]/g, ""));
          arrNumberEmail.push(soCuaEmail);
        }
      });
      arrNumberEmail.sort((a, b) => a - b);
      newEmail =
        tenEmail +
        (arrNumberEmail[arrNumberEmail.length - 1] + 1) +
        "@ntq-solution.com.vn";
    }

    //Vi??t in hoa ch??? c??i ?????u c???a h??? t??n
    const nameArray = newName.split(" ");
    const correctName = [];
    nameArray.forEach((item) => {
      const lowerCase = item.toLowerCase();
      const fLetter = lowerCase.slice(0, 1).toUpperCase();
      const rletters = lowerCase.slice(1, lowerCase.length);
      const finalName = fLetter + rletters;
      correctName.push(finalName);
    });
    const theName = correctName.join(" ");

    newEmployees.unshift({
      id: count,
      name: theName,
      email: newEmail,
      job: jobNewEmployee,
    });
    valueName.value = "";
    valueJob.value = "";
    renderResult(newEmployees, currenPage);
    over.style.display = "none";
    formAdd.style.display = "none";
  }
};
