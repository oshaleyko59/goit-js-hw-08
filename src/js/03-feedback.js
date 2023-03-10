import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

//FIX: 20230227 1)data shall not be submitted if email is empty
//              2)object storing data is not cleared @submit
form.firstElementChild.firstElementChild.required = true;

let formFields; //initialized inside handlePageLoad func
window.addEventListener('load', handlePageLoad);
form.addEventListener('submit', handleSubmit);

/***  4-Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500ms  */
form.addEventListener('input', throttle(handleInput, 500));

/*** handles input event on the form
 * 1-Відстежуй на формі подію input, і записуй у локальне сховище
об'єкт з полями email і message i поточними значеннями полів форми.
Ключ для сховища - рядок "feedback-form-state". */
function handleInput(evt) {
  formFields[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formFields));
}

/*** handles submit event on the form - clears local storage and form
 * 3-Під час сабміту форми очищуй сховище і поля форми, а також виводь
у консоль об'єкт з полями email, message та їхніми поточними значеннями. */
function handleSubmit(evt) {
  //clear form fields
  evt.target.reset();
  //clear local storage
  localStorage.removeItem(STORAGE_KEY);
  //consol output as per reqs
  console.log(formFields);

  //empty object where data is stored
  formFields = {}; //FIX: 20230227

  evt.preventDefault();
}

/*** handles load event and populates form with data from local storage if any
 * 2-Під час завантаження сторінки перевіряй стан сховища, і якщо там є дані,
 * заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми. */
// eslint-disable-next-line no-unused-vars
function handlePageLoad(_evt) {
  formFields = {};
  const savedFields = localStorage.getItem(STORAGE_KEY);
  if (savedFields)
    try {
      formFields = JSON.parse(savedFields);
      fillForm(formFields, form);
    } catch (error) {
      console.log('Corrupted object from local storage');
    }
}

//** fills form fields from saved object
function fillForm(savedObj, aForm) {
  Object.entries(savedObj).forEach(entry => {
    aForm.elements[entry[0]].value = entry[1];
  });
}

