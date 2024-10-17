import { html, render } from "./node_modules/lit-html/lit-html.js";

const URL = "http://localhost:3030/jsonstore/advanced/table";
const root = document.querySelector("tbody");

solve();

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const searchRef = document.getElementById("searchField");

   loadTable();

   async function loadTable(searchedText) {      
      const students = await getStudents();
      render(html`${Object.values(students).map(student => tdTemplate(student, searchedText))}`, root);
   }

   function tdTemplate(student, searchedText) {
      const isSelected = isRowSelected(student, searchedText);

      return html`         
            <tr class=${isSelected ? 'select' : ''}>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
            </tr>`
   }

   function isRowSelected(student, searchedText) {      
      delete student._id;
      const textData = Object.values(student).map(value => value.toLowerCase());

      let isSelected = false;

      if (searchedText) {
         isSelected = textData.some(text => text.includes(searchedText));
      }

      return isSelected;         
   }

   async function getStudents() {
      const response = await fetch(URL);
      const students = await response.json();
      return students;
   }
   
   function onClick() {      
      const searchedText = searchRef.value.toLowerCase();
      searchRef.value = '';

      loadTable(searchedText);
   }
}

