let fetchUser = fetch(`https://randomuser.me/api/`);

const loginBtn = document.getElementById("login-form-submit");
const userBtn = document.querySelector("#user-profile .user");
const emailInput = document.querySelector("#login-form input[type='email']");
const passwordInput = document.querySelector("#login-form input[type='password']");
const errMsg = document.querySelector("#login-form .notification");

const loginCredentials = {
  email: "sample@email.com",
  password: "1234567",
};

async function getUsers() {
  const response = await fetchUser;
  const users = await response.json();
  return users;
}

if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let users = [];

    if(emailInput.value != loginCredentials.email || passwordInput.value != loginCredentials.password){
        errMsg.style.display = "block";
        return false;
    }

    try {
      users = await getUsers();
      sessionStorage.setItem("user", JSON.stringify(users));
      window.location.href = "index.html";
    } catch (e) {
      return e;
    }
  });
}

const userProfile = document.getElementById("user-profile");

if (userProfile) {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      user = await getUsers();
      const userStr = sessionStorage.getItem("user");
      const userObj = JSON.parse(userStr);

      let data = `
            <button class="user">
            <img src="${userObj.results[0].picture.thumbnail}" alt="" />
            <p>Welcome ${userObj.results[0].name.title}. ${userObj.results[0].name.first} ${userObj.results[0].name.last}!</p>
            </button>
            <div class="dropdown">
                <p><span>Email:</span> ${userObj.results[0].email}</p>
                <p><span>Phone:</span> ${userObj.results[0].phone}</p>
                <p><span>Address:</span> ${userObj.results[0].location.street.name}, ${userObj.results[0].location.street.number}, ${userObj.results[0].location.city}, ${userObj.results[0].location.country}</p>
                <p><span>Age:</span>  ${userObj.results[0].dob.age}</p>
              </div>
            `;
      userProfile.innerHTML += data;
    } catch (e) {
      console.log("bad request");
    }
  });
}
