// add2numbers.js 

function tambah() {   
let angka = document.querySelectorAll('input');   
let i1= angka[0].value ; //angka pertama   
let i2= angka[1].value ; //angka kedua   

angka[2].value= parseInt(i1) + parseInt(i2); 
// let pesan = document.getElementById('message');
// pesan.innerHTML = "Hasilnya:"+angka[2].value;
// // pesan.textContext = "Done boy";

// let label = document.querySelector('label');
// label.textContext = "oh ma boy, this is label";
// label.innerHTML = "<strong>Operator (+) </strong>";
} 

function kali() {   
let angka = document.querySelectorAll('input');   
let i1= angka[0].value ; //angka pertama   
let i2= angka[1].value ; //angka kedua   

angka[2].value= parseInt(i1) * parseInt(i2);
} 

function bagi() {   
let angka = document.querySelectorAll('input');   
let i1= angka[0].value ; //angka pertama   
let i2= angka[1].value ; //angka kedua   

angka[2].value= parseInt(i1) / parseInt(i2);
} 


function kurang() {   
let angka = document.querySelectorAll('input');   
let i1= angka[0].value ; //angka pertama   
let i2= angka[1].value ; //angka kedua   

angka[2].value= parseInt(i1) - parseInt(i2);
} 

// let plus = document.querySelector('button'); 
// plus.addEventListener('click', tambah);

// let times = document.querySelector('button');
// times.addEventListener('click', kali);

