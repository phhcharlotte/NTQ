import { EMPLOYEES } from "./MOCK_DATA.js";

const nextPage = document.querySelector(".btn-next");
const prevPage = document.querySelector(".btn-prev");
const pageNumber = document.querySelector(".pageNumber");
const totalEmployee = document.querySelector(".totalEmployees");
const itemStore = document.querySelector(".wrapper-bottom-content");
const sortA = document.querySelector(".sort-A");
const sortZ = document.querySelector(".sort-Z");
const searchInput = document.querySelector(".search");
const valueName = document.querySelector(".name-text");
const numberItem = document.querySelector("#numberItem");
const valueJob = document.querySelector(".job-text");
const addEmployees = document.querySelector(".add-Employees");
const add = document.querySelector(".add");
const over = document.querySelector(".over");
const formAdd = document.querySelector(".formAdd");

let dataEmployee = EMPLOYEES;
let currenPage = 1;
let perPage = 40;

function renderListEmployee(listEmployees, currenPage) {
  const listEmployeesPerpage = listEmployees.slice(
    (currenPage - 1) * perPage,
    (currenPage - 1) * perPage + perPage
  );

  let totalPage = Math.ceil(listEmployees.length / perPage);
  let startNumber = (currenPage - 1) * perPage + 1;
  let endNumber =
    listEmployees.length % perPage !== 0 && totalPage === currenPage
      ? (currenPage - 1) * perPage + (listEmployees.length % perPage)
      : (currenPage - 1) * perPage + perPage;
  totalEmployee.innerHTML = `${listEmployees.length}`;
  pageNumber.innerHTML = `${startNumber}-${endNumber}`;

  numberItem.onchange = (e) => {
    currenPage = 1;
    perPage = Number(e.target.value);
    renderListEmployee(listEmployees, currenPage);
  };

  nextPage.onclick = () => {
    if (
      currenPage >= 1 &&
      currenPage < Math.ceil(listEmployees.length / perPage)
    ) {
      currenPage++;
      renderListEmployee(listEmployees, currenPage);
    }
  };

  prevPage.onclick = () => {
    if (
      currenPage > 1 &&
      currenPage <= Math.ceil(listEmployees.length / perPage)
    ) {
      currenPage--;
      renderListEmployee(listEmployees, currenPage);
    }
  };

  sortA.onclick = () => {
    currenPage = 1;
    listEmployees.sort((a, b) => {
      let c = a.name.trim().split(" ");
      let d = b.name.trim().split(" ");
      let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
      let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
      return ("" + e).localeCompare(f);
    });
    renderListEmployee(listEmployees, currenPage);
  };

  sortZ.onclick = () => {
    currenPage = 1;
    listEmployees.sort((a, b) => {
      let c = a.name.trim().split(" ");
      let d = b.name.trim().split(" ");
      let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
      let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
      return ("" + f).localeCompare(e);
    });
    renderListEmployee(listEmployees, currenPage);
  };

  const valueResult = listEmployeesPerpage
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
  return (itemStore.innerHTML = valueResult);
}

renderListEmployee(dataEmployee, currenPage);

searchInput.oninput = (e) => {
  currenPage = 1;
  let valueInput = e.target.value.toLowerCase();
  let searchListValueName = dataEmployee.filter(
    (employee) =>
      employee.name.toLowerCase().search(valueInput) !== -1 ||
      employee.job.toLowerCase().search(valueInput) !== -1
  );

  renderListEmployee(searchListValueName, currenPage);
};
const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const validate = (name) => {
  if (format.test(name)) {
    return "Tên của bạn chứa ký tự đặc biệt ";
  }
  return " ";
};

addEmployees.onclick = () => {
  if (valueName.value !== "" && valueJob.value !== "") {
    if (validate(valueName.value)) {
      alert("Tên của bạn chứa ký tự đặc biệt ");
      valueName.value = "";
      valueJob.value = "";
    } else {
      const inputValueName = valueName.value.trim();
      const nameValue = inputValueName.toLowerCase().split(" ");
      const listID = dataEmployee.map((data) => data.id);
      const maxID = Math.max.apply(Math, listID);
      const count = maxID + 1;

      const jobNewEmployee = valueJob.value.trim();

      let mangEmail =
        nameValue.length > 1
          ? [nameValue[nameValue.length - 1], nameValue[0]]
          : nameValue;
      let tenEmail = loc_xoa_dau(mangEmail.join("."));
      let newName;
      let newEmail;

      const arrNameNotSpace = [];
      const arrSameEmail = [];
      dataEmployee.forEach((e) => {
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
          inputValueName + " " + (Number(arrNumber[arrNumber.length - 1]) + 1);
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
      //Viêt in hoa chữ cái đầu của họ tên
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

      dataEmployee.unshift({
        id: count,
        name: theName,
        email: newEmail,
        job: jobNewEmployee,
      });
      valueName.value = "";
      valueJob.value = "";
      renderListEmployee(dataEmployee, currenPage);
      over.style.display = "none";
      formAdd.style.display = "none";
    }
  }
};

function getAvatar(name) {
  const nameSplit = name.trim().split(" ");
  const avatar = Number(nameSplit[nameSplit.length - 1])
    ? nameSplit[nameSplit.length - 2][0].toLocaleUpperCase()
    : nameSplit[nameSplit.length - 1][0].toLocaleUpperCase();
  return avatar;
}

function loc_xoa_dau(str) {
  // Gộp nhiều dấu space thành 1 space
  str = str.replace(/\s+/g, " ");
  // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
  str = str.trim();
  // bắt đầu xóa dấu tiếng việt  trong chuỗi
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
add.onclick = () => {
  over.style.display = "block";
  formAdd.style.display = "block";
};
over.onclick = () => {
  over.style.display = "none";
  formAdd.style.display = "none";
};
