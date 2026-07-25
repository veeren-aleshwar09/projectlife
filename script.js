// Greeting

function greeting(){

const h=new Date().getHours();

const g=document.getElementById("greeting");

if(h<12) g.innerHTML="Good Morning ☀️";

else if(h<18) g.innerHTML="Good Afternoon 🌤️";

else g.innerHTML="Good Evening 🌙";

}

greeting();

// Clock

function clock(){

document.getElementById("clock").innerHTML=
new Date().toLocaleTimeString();

}

clock();

setInterval(clock,1000);

// ----------------------
// TASK MANAGER
// ----------------------

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput=document.getElementById("taskInput");

const addBtn=document.getElementById("addTask");

const taskList=document.getElementById("taskList");

const search=document.getElementById("searchTask");

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function render(){

taskList.innerHTML="";

const keyword=search.value.toLowerCase();

tasks.forEach((task,index)=>{

if(!task.text.toLowerCase().includes(keyword)) return;

const li=document.createElement("li");

li.className="task";

li.innerHTML=`

<span class="${task.done ? "completed":""}">
${task.text}
</span>

<button class="delete">Delete</button>

`;

li.querySelector("span").onclick=()=>{

task.done=!task.done;

save();

render();

};

li.querySelector("button").onclick=()=>{

tasks.splice(index,1);

save();

render();

};

taskList.appendChild(li);

});

}

addBtn.onclick=()=>{

const text=taskInput.value.trim();

if(text==="") return;

tasks.push({

text,

done:false

});

taskInput.value="";

save();

render();

};

search.oninput=render;

render();