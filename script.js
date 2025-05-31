localStorage.setItem("theme", "dark-theme");
let theme = document.querySelector('.theme');
theme.addEventListener('click', ()=>
{
    document.body.classList.toggle('dark-theme');
});

let loginSection = document.querySelector('.login');
let name = document.querySelector('.name');
let pin = document.querySelector('.pin');
let errorpass = document.querySelector('.errorpass');
let submit = document.querySelector('.btn');

submit.addEventListener('click', (e)=>
{
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let match = users.find(user =>
        user.name === name.value.trim() &&
        user.pin === pin.value.trim()
    );

    if (match)
    {
        loginSection.style.display = 'none';
        VaultSection.style.display = 'flex';
        DisplayDataSection.style.display = 'flex';
        searchdata.style.display = 'flex';
        let currentUser = name.value;
        localStorage.setItem("currentUser", currentUser);
        DisplayAllData("");
        console.log('True');
    }
    else
    {
        errorpass.textContent = 'Wrong Password';
        errorpass.style.color = 'red';
        errorpass.style.fontSize = '1.2em';
        alert("Wrong PIN. Try again.");
    }
    
});





let VaultSection = document.querySelector('.VaultSection');
let DisplayDataSection = document.querySelector('.DisplayData');
let searchdata = document.querySelector('.searchdata');
let Website = document.querySelector('.Website');
let username = document.querySelector('.username');
let password = document.querySelector('.password');
let siterror = document.querySelector('.siterror');
let usernameerror = document.querySelector('.usernameerror');
let passerror = document.querySelector('.passerror');
let savebtn = document.querySelector('.savebtn');

savebtn.addEventListener('click', (e)=>
{
    e.preventDefault();
    let valid = true;

    // Website field
    if (!Website.value.trim()) 
    {
        siterror.textContent = 'Website or Lable required';
        siterror.style.color = 'red';
        siterror.style.fontSize = '1.2em';
        valid = false;
    }

    // Username field
    if (!username.value.trim()) 
    {
        usernameerror.textContent = 'Username required';
        usernameerror.style.color = 'red';
        usernameerror.style.fontSize = '1.2em';
        valid = false;
    }

    // Password field
    if (!password.value.trim()) 
    {
        passerror.textContent = 'Password required';
        passerror.style.color = 'red';
        passerror.style.fontSize = '1.2em';
        valid = false;
    }

    // If any field invalid, stop here
    if (!valid) return;
    else
    {
        siterror.textContent = "";
        usernameerror.textContent = "";
        passerror.textContent = "";
    }

    

    
    let CurrentUser = localStorage.getItem("currentUser");

    let userKey = `passwords_${CurrentUser}`;
    let data = JSON.parse(localStorage.getItem(userKey)) || [];
    
    let entry = 
    {
        site: Website.value,
        username: username.value,
        password: btoa(password.value)  // String ko Base64 format encode 
    };

    data.push(entry);

    localStorage.setItem(userKey, JSON.stringify(data));

    Website.value = "";
    username.value = "";
    password.value = "";
    console.log(JSON.parse(localStorage.getItem(userKey)));
    DisplayAllData("");
    
});



function DisplayAllData(filterText = "")
{
    let CurrentUser = localStorage.getItem("currentUser");
    let userKey = `passwords_${CurrentUser}`;

    let alldata = JSON.parse(localStorage.getItem(userKey)) || [];
    // console.log(alldata);

    if (filterText) 
    {
        alldata = alldata.filter(entry =>
        entry.site.toLowerCase().includes(filterText.toLowerCase()) ||
        entry.username.toLowerCase().includes(filterText.toLowerCase())
        );
    }



    let AddData = "";
    alldata.forEach((element, index) => 
    {
        AddData += `
                <div class="data">
                    <h3>Website or Lable: ${element.site}</h3>
                    <h3>User Name / Email: ${element.username}</h3>
                    <h3>Password: ${atob(element.password)}</h3>
                    <button id="${index}" class="deleteInfo">Delete</button>
                </div>`;
    });
    document.querySelector('.DisplayData').innerHTML = AddData;

    let Deletebtns = document.querySelectorAll('.deleteInfo');
    Deletebtns.forEach((btn) => 
    {
        btn.addEventListener('click', function(e) 
        {
            let index = Number(e.target.getAttribute('id'));

            let data = JSON.parse(localStorage.getItem(userKey)) || [];
            data.splice(index, 1);
            localStorage.setItem(userKey, JSON.stringify(data));
            alert("Password deleted successfully!");
            DisplayAllData(searchInput.value);
        });
    });
    
    
};

let searchInput = document.querySelector('.searchInput');

searchInput.addEventListener('input', () => 
{
    DisplayAllData(searchInput.value);
});

let logoutBtn = document.querySelector('.logoutBtn');

logoutBtn.addEventListener('click', () => 
{
    loginSection.style.display = 'flex';
    VaultSection.style.display = 'none';
    DisplayDataSection.style.display = 'none';
    searchdata.style.display = 'none';
    localStorage.removeItem("currentUser");
    

    document.querySelector('.pin').value = '';

    location.reload();
});

let loginbtn = document.querySelector('.BackLogInBtn');
let signupbtn = document.querySelector('.showSignup');
let SignUpSection = document.querySelector('.SignUp');

loginbtn.addEventListener('click', () => 
{
  loginSection.style.display = 'flex';
  SignUpSection.style.display = 'none';
});

signupbtn.addEventListener('click', () => 
{
  loginSection.style.display = 'none';
  SignUpSection.style.display = 'flex';
});


let setname = document.querySelector('.setname');
let setpin = document.querySelector('.setpin');
let CreateAccount = document.querySelector('.CreateAcc');
CreateAccount.addEventListener('click', function()
{
    if (!setname.value.trim() || !setpin.value.trim()) 
    {
        alert("Please fill both fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let exists = users.find(user => user.name === setname.value.trim());

    if (exists)
    {
        alert("Username already taken. Please choose a different name.");
        return;
    }

    let newUser = 
    {
        name: setname.value.trim(),
        pin: setpin.value.trim()
    };

    // let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setname.value = "";
    setpin.value = "";
    loginSection.style.display = 'flex';
    SignUpSection.style.display = 'none';
});

// localStorage.clear();
window.addEventListener('load', () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    loginSection.style.display = 'none';
    VaultSection.style.display = 'flex';
    DisplayDataSection.style.display = 'flex';
    searchdata.style.display = 'flex';
    DisplayAllData(); // Optional: show data on load
  }
});