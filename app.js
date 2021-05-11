let nameInput = document.getElementById("nameInput");
let customerInfo = [
  {
    name: "John Otto",
    image: "../assets/images/th.jpg",
    grossSalary: "2500AZN",
    activeLoan: "Y",
    netSalary: "2350AZN",
    applicableLoan: "Y",
  },
  {
    name: "Jacob Thornton",
    image: "../assets/images/img-1.jpg",
    grossSalary: "1500AZN",
    activeLoan: "Y",
    netSalary: "1350AZN",
    applicableLoan: "N",
  },
  {
    name: "Lina Thornton",
    image: "../assets/images/img-2.jpg",
    grossSalary: "1700AZN",
    activeLoan: "N",
    netSalary: "1300AZN",
    applicableLoan: "N",
  },
  // {
  //   img: "assets/img-1.jpg",
  //   name: "Jesus",
  //   surname: "Myers",
  //   loans: [
  //     {
  //       amount: {
  //         value: 22000,
  //         currency: "AZN",
  //       },
  //       closed: false,
  //       loaner: "Bank of Trauny",
  //       period: {
  //         type: "month",
  //         value: 36,
  //       },
  //       perMonth: {
  //         value: 611.11,
  //         currency: "AZN",
  //       },
  //       dueAmount: {
  //         value: 4200,
  //         currency: "AZN",
  //       },
  //       loanPeriod: {
  //         end: "22.01.2022",
  //         start: "22.01.2019",
  //       },
  //       interestRate: 18,
  //     },
  //     {
  //       amount: {
  //         value: 5000,
  //         currency: "AZN",
  //       },
  //       closed: true,
  //       loaner: "TBC",
  //       period: {
  //         type: "month",
  //         value: 12,
  //       },
  //       perMonth: {
  //         value: 416.66,
  //         currency: "AZN",
  //       },
  //       dueAmount: {
  //         value: 2916,
  //         currency: "AZN",
  //       },
  //       loanPeriod: {
  //         end: "03.01.2022",
  //         start: "03.01.2021",
  //       },
  //       interestRate: 22,
  //     },
  //     {
  //       amount: {
  //         value: 8500,
  //         currency: "AZN",
  //       },
  //       closed: false,
  //       loaner: "Revolut",
  //       period: {
  //         type: "month",
  //         value: 24,
  //       },
  //       dueAmount: {
  //         value: 0,
  //         currency: "AZN",
  //       },
  //       loanPeriod: {
  //         end: "22.01.2018",
  //         start: "22.01.2016",
  //       },
  //       interestRate: 19,
  //     },
  //   ],
  //   salary: {
  //     value: 4500,
  //     currency: "AZN",
  //   },
  //   hasSalaryCard: true,
  //   hasLoanHistory: true,
  // },
];

nameInput.addEventListener("keyup", function () {
  var value = this.value;
  var data = searchTable(value, customerInfo);

  createTable(data);
});

function searchTable(val, data) {
  var filteredData = [];
  for (var i = 0; i < data.length; i++) {
    val = val.toLowerCase();
    var name = data[i].name.toLowerCase();

    if (name.includes(val)) {
      filteredData.push(data[i]);
    }
  }

  return filteredData;
}

createTable(customerInfo);

function createTable(data) {
  var table = document.querySelector("#c-table tbody");

  table.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // function activeLoan() {
    //   for (d of data[i].loans) {
    //     while (d.closed == true) {
    //       return "Y";
    //     }
    //   }
    // }

    var tRow = `<tr>
    <td>${data[i].name}</td>
    <td><img src="${data[i].image}" alt="" /></td>
    <td>${data[i].grossSalary}</td>
    <td>${data[i].activeLoan}</td>
    <td>${data[i].netSalary}</td>
    <td>${data[i].applicableLoan}</td>
  </tr>`;

    table.innerHTML += tRow;
  }
}


// SESSION STORAGE
const registerFormBtn = document.getElementById("register-form-submit");
const registerInputs = document.querySelectorAll("#register-form input");
if (registerFormBtn) {
  registerFormBtn.addEventListener("click", function () {
    for (i = 0; i < registerInputs.length; i++) {
      if (registerInputs[i].classList.contains("input-username")) {
        username = registerInputs[i].value;
      } else if (registerInputs[i].classList.contains("input-fullname")) {
        fullname = registerInputs[i].value;
      } else if (registerInputs[i].classList.contains("input-email")) {
        email = registerInputs[i].value;
      }
    }

    const userDetail = {
      username: username,
      fullname: fullname,
      email: email,
    };

    var d = new Date();
    d = d.getTime() + 24 * 60 * 60 * 1000;
    setCookie("token", "supersecuretoken", d);

    sessionStorage.setItem("userDetail", JSON.stringify(userDetail));

    window.location.href = "index.html";
  });
}


//COOKIE STORAGE
function setCookie(cname, cvalue, exdays) {
  document.cookie = cname + "=" + cvalue + ";" + exdays + ";path=/";
}


//LOCAL STORAGE
const theme = document.querySelectorAll('input[name="theme"]');
const lang = document.querySelectorAll('input[name="language"]');
const radio = document.querySelectorAll('input[type="radio"]');
const body = document.querySelector("body");

let langThemeDetail = {
  theme: "",
  lang: "",
};

for (i = 0; i < theme.length; i++) {
  theme[i].addEventListener("change", function () {
    body.setAttribute("class", this.value);
    langThemeDetail.theme = this.value;
    localStorage.setItem("langThemeDetail", JSON.stringify(langThemeDetail));
  });
}

for (i = 0; i < lang.length; i++) {
  lang[i].addEventListener("change", function () {
    langThemeDetail.lang = this.value;
    localStorage.setItem("langThemeDetail", JSON.stringify(langThemeDetail));
  });
}

if (localStorage.getItem("langThemeDetail")) {
  const langThemeStr = localStorage.getItem("langThemeDetail");
  const langThemeObj = JSON.parse(langThemeStr);

  const themeVal = langThemeObj.theme;
  const langVal = langThemeObj.lang;

  for (i = 0; i < radio.length; i++) {
    if (radio[i].getAttribute("id") == themeVal) {
      radio[i].setAttribute("checked", "checked");
      body.setAttribute("class", themeVal);
    } else if(radio[i].getAttribute("id") == langVal){
      radio[i].setAttribute("checked", "checked");
    }
  }
}
