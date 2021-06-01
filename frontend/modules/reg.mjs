import {
  diary
} from "./diary.mjs";

export function reg() {

  document.body.innerHTML = "";
  let regTemplate = `<form action="" id="regForm">
    <input type="text" name="userName" id="userName" placeholder="Användarnamn" required autofocus>
    <input type="text" name="userPass" id="userPass" placeholder="Lösenord" required>
    <button id="regBtn">Registrera dig</button>
    </form>`;

  document.body.insertAdjacentHTML('afterbegin', regTemplate)

  let regBtn = document.querySelector('#regBtn');
  regBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let userName = document.querySelector('#userName').value;
    let userPass = document.querySelector('#userPass').value;

    let newUser = {
      userName: userName,
      userPass: userPass
    }
    console.log(newUser);

    fetch('https://stinas-diary.herokuapp.com/users/reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(res => res.json())
      .then(results => {
        console.log(results);
        diary(results);
      })
  })
}