export function diary(user) {

  document.body.innerHTML = "";
  // Creating elements
  window.onload = fetchNew();

  let userGreetingDiv = document.createElement("div");
  let diaryDiv = document.createElement("div");
  let diaryForm = document.createElement("form");
  let diaryDate = document.createElement("input");
  let diaryHeadline = document.createElement("input");
  let diaryText = document.createElement("textarea");
  let diaryBtn = document.createElement("button");
  let diaryUL = document.createElement("ul");
  let masonryContainer = document.createElement("div");
  let logOutBtn = document.createElement("button");

  // Setting values and styling elements
  userGreetingDiv.innerHTML = `<h2>Hej ${user.userName}</h2>`;
  userGreetingDiv.id = 'greetDiv';
  diaryDate.type = "date";
  diaryDate.valueAsDate = new Date();
  diaryHeadline.placeholder = "Rubrik";
  diaryText.style.resize = "none";
  diaryText.placeholder = "Din dagboksanteckning";
  diaryBtn.textContent = "Spara";
  logOutBtn.textContent = "Logga ut";
  logOutBtn.id = "logOutBtn";
  masonryContainer.id = "masonryContainer";

  // Appending elements to DOM
  document.body.appendChild(userGreetingDiv);
  document.body.appendChild(diaryDiv);
  diaryDiv.appendChild(diaryForm);
  diaryForm.appendChild(diaryDate);
  diaryForm.appendChild(diaryHeadline);
  diaryForm.appendChild(diaryText);
  diaryForm.appendChild(diaryBtn);
  document.body.appendChild(masonryContainer);
  masonryContainer.appendChild(diaryUL);
  userGreetingDiv.appendChild(logOutBtn);

  function fetchNew() {
    fetch('https://stinas-diary.herokuapp.com/notes')
      .then(res => res.json())
      .then(notes => {
        console.log(notes);
        diaryUL.innerHTML = "";
        for (let i = 0; i < notes.length; i++) {
          diaryUL.insertAdjacentHTML("afterbegin", `<li><strong>${notes[i].date}</strong></br>${notes[i].header}</br>${notes[i].text} <p>${notes[i].author}</p></li>`);
        }
      })

  }


  diaryBtn.addEventListener("click", function (e) {
    // Prevents form to load page again
    e.preventDefault();

    // Saving input values to variables
    let diaryDateInput = diaryDate.value;
    let diaryHeadlineInput = diaryHeadline.value;
    let diaryTextInput = diaryText.value;

    // Saving the inputs to the object inputs
    let diary = {
      date: diaryDateInput,
      header: diaryHeadlineInput,
      text: diaryTextInput,
      author: user.userName
    };

    console.log(diary);
    fetch('https://stinas-diary.herokuapp.com/notes/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(diary)
      })
      // .then(res => res.json())
      .then(results => {
        console.log(results);
        fetchNew();
      })
    // Emptying the input fields
    diaryHeadline.value = "";
    diaryText.value = "";
  })

  logOutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  })
}