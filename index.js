// const form = document.getElementById("user-form");
//       form.addEventListener("submit", function(event) {
//         event.preventDefault(); // prevent page from reloading
//         validateForm();
//       });

//       function validateForm() {
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;
//         const dob = new Date(document.getElementById("dob").value);
//         const age = (new Date() - dob) / (365 * 24 * 60 * 60 * 1000);
//         const terms = document.getElementById("acceptTerms").checked;

//         if (name === "") {
//           alert("Please enter your name.");
//           return false;
//         }

//         if (email === "") {
//           alert("Please enter your email address.");
//           return false;
//         }

//         if (password === "") {
//           alert("Please enter a password.");
//           return false;
//         }

//         if (age < 18 || age > 55) {
//           alert("Please enter a valid date of birth (you must be between 18 and 55 years old).");
//           c
//         }

//         if (!terms) {
//           alert("Please accept the terms and conditions.");
//           return false;
//         }
//        }
let userForm = document.getElementById("user-form");
const retriveEntries = () =>{
	let entries = localStorage.getItem("user-entries");
	if(entries){
		entries = JSON.parse(entries);
	} else{
		entries = [];
	}
	return entries;
}
let userEntries = retriveEntries();
const displayEntries = () => {
	const entries = retriveEntries();



	const tableEntries = entries.map((entry) => {
		const nameCell = `<td>${entry.name}</td>`;
		const emailCell = `<td>${entry.email}</td>`;
		const passwordCell = `<td>${entry.password}</td>`;
		const dobCell = `<td>${entry.dob}</td>`;
		const TandCCell = `<td>${entry.TandC}</td>`;
		const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${TandCCell} </tr>`;
		return row;
	}).join("\n");
	const table = `<table border="2px"><tr> <th>name</th> <th>Email</th> <th>Password</th> <th>dob</th> <th>accepted terms?</th> </tr> ${tableEntries} </table>`;
	let details = document.getElementById("user-entries");
	details.innerHTML = table;
	}
const saveUserForm = (event) => {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const dob = document.getElementById("dob").value;
	const TandC = document.getElementById("acceptTerms").checked;
	const age = calculateAge(new Date(dob));

	if (age >= 18 && age <= 55) {
		const entry = {
			name,
			email,
			password,
			dob,
			TandC
		};
		userEntries.push(entry);
		localStorage.setItem("user-entries", JSON.stringify(userEntries));
		displayEntries();
	} else {
		alert("Sorry, you must be between 18 and 55 years old to register.");
	}
};

const calculateAge = (birthday) => {
	const ageDifferenceMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDifferenceMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};


    
userForm.addEventListener("submit",saveUserForm);
displayEntries();