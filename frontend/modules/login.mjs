import {
  diary
} from "./diary.mjs";

export function login() {



  let userName = document.querySelector('#userName').value;
  let userPass = document.querySelector('#userPass').value;

  let testUser = {
    userName: userName,
    userPass: userPass
  }

  fetch('https://stinas-diary.herokuapp.com/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    })
    .then(res => res.json())
    .then(results => {
      console.log(results);
      let errDiv = document.createElement('div');
      errDiv.id = 'errDiv'
      document.querySelector('#loginForm').appendChild(errDiv);

      if (results.msg) {
        document.querySelector('#errDiv').innerHTML = '';
        document.querySelector('#errDiv').innerHTML = `<p>Felaktig inloggning, prova igen</p>`
      } else {
        diary(results);
      }
    })


  // document.body.innerHTML = "";

}