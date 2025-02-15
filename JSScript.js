const form = document.getElementById("myform");
let unorderedList = document.getElementById("todoList");
const localTime = document.getElementById("localtime");
const dateTime = document.getElementById("datetime");
const task = document.getElementById("task");
const done = document.getElementById("done");
const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
const resetButton = document.getElementById("ResetButton");
//data form
let selectForm;
let dateForm;
let textareaForm;

//update date once



const now = new Date();
const day = now.getDate();
const month = now.toLocaleString("en-GB", { month: "long" } );
const year = now.getFullYear();
dateTime.innerHTML = `${day} ${month} ${year}`;
localTime.innerHTML = now.toLocaleTimeString();

const dateInput1 = document.getElementById("dateInput1");

dateInput1.min = new Date().toISOString().split("T")[0];

//give select a color from option background color
const select = document.getElementById("prioritySelect");
task.classList.toggle("buttontodohover");


const resetPriorityColor = () => {
    const selectedOption = select.options[select.selectedIndex];
    select.style.backgroundColor = selectedOption.style.backgroundColor;

    select.style.backgroundColor = select.options[select.selectedIndex].style.backgroundColor;
};

resetPriorityColor();

    select.addEventListener("change", resetPriorityColor);


    resetButton.onclick = () => {
        const form1 = document.getElementById("myform").reset();

            resetPriorityColor();
    };

    

form.addEventListener ("submit", function(e) {
e.preventDefault();

selectForm = e.target.elements["select"].value;
dateForm = e.target.elements["date"].value;
textareaForm = e.target.elements["textarea"].value;









if (dateForm === "" && textareaForm === "")
{
    alert("kamu belum mengisi tanggal dan hal yang ingin kamu lakukan!");
    return;
}
else if (dateForm === "")
{
    alert("kamu belum mengisi tanggal!");
    return;
}
else if (textareaForm === "")
{
    alert("kamu belum mengisi apa yang ingin kamu lakukan.");
    return;
}
else
{
    console.log(selectForm);
    console.log(dateForm);
    console.log(textareaForm);
    processDataList();
}
});

function processDataList() {


    //membuat data list
    unorderedList = document.getElementById("todoList");
    const classDiv1 = document.createElement("li");
    classDiv1.className = "flexForSpaceBetween TextCustom todoListStyle2 fade-checkbox";
    classDiv1.setAttribute("data-checkbox", 0);
    classDiv1.style = "padding: 10px;";

    const classDiv2 = document.createElement("div");
    classDiv2.className = "classdiv2";

    //create delete button
    const deleteButton = document.createElement("span");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.style.textDecoration = "none";
    deleteButton.onclick = () => {
        unorderedList.removeChild(classDiv1);
    }

    //convert the date time
    const now1 = new Date(dateForm);
    let day1 = now1.getDate().toString().padStart(2, "0");

    const month1 = now1.toLocaleString("en-GB", { month: "short" } );
    const year1 = now1.getFullYear();

    let dataForDataSpan1;

    if (selectForm === "Low")
    {
        classDiv1.className += " lowbackground";
        classDiv1.setAttribute("data-priority", "Low");
        classDiv1.setAttribute("data-date", dateForm);
        dataForDataSpan1 = "😹 ";
        deleteButton.style.color = "red";
    }
    else if (selectForm === "Medium")
    {
        classDiv1.className += " mediumbackground";
        classDiv1.setAttribute("data-priority", "Medium");
        classDiv1.setAttribute("data-date", dateForm);
        dataForDataSpan1 = "😡 ";
        deleteButton.style.color = "red";
    }
    else if (selectForm === "High")
    {
        classDiv1.className += " highbackground";
        classDiv1.setAttribute("data-priority", "High");
        classDiv1.setAttribute("data-date", dateForm);
        dataForDataSpan1 = "🔥 ";
        deleteButton.style.color = "blue";
    }
    else
    {

    }

    
    

    

    const dataList = document.createElement("div");
    dataList.className = "datalist1";
    const dataSpan1 = document.createElement("span");
    const dataSpan2 = document.createElement("span");
    const dataSpan3 = document.createElement("span");

    

    const checkButton = document.createElement("input");
    checkButton.type = "checkbox";
    checkButton.className = "buttoncustom";
    checkButton.addEventListener("change", (e) => {
        if (e.target.checked) {
            
            classDiv1.classList.add("hidden");

            setTimeout(() => {
                
                dataList.classList.add("strikethrough");
            }, 50);

            setTimeout(() => {
                
                classDiv1.style.display = "none";
            }, 500);

            classDiv1.setAttribute("data-checkbox", 1);
        }
        else {
            classDiv1.classList.add("hidden");

            setTimeout(() => {
                
                dataList.classList.remove("strikethrough");
            }, 50);

            setTimeout(() => {
                
                classDiv1.style.display = "none";
            }, 500);
            classDiv1.setAttribute("data-checkbox", 0);
        }
    });

    dataSpan1.className = "dataSpan1";
    dataSpan2.className = "dataSpan2";
    dataSpan3.className = "dataSpan3";

    dataSpan1.textContent = dataForDataSpan1;
    dataSpan2.textContent = `${day1} ${month1} ${year1}`+" ";
    dataSpan3.textContent = "\""+textareaForm+"\"";

    

    dataList.append(dataSpan1, dataSpan2, dataSpan3);
    classDiv2.append(deleteButton, checkButton);
    
    
    

    classDiv1.appendChild(dataList);
    classDiv1.appendChild(classDiv2);


    unorderedList.appendChild(classDiv1);
    
}

//button untuk sortir
const mybuttondate = document.getElementById("sortdateby");

mybuttondate.addEventListener("click", () => {
    sortByDate();
});

const mybuttonpriority = document.getElementById("sortpriorityby");

mybuttonpriority.addEventListener("click", () => {
    sortByPriority();
});

const toggleButton = (button1, button2) => {
    button1.classList.add("buttontodohover");
    button2.classList.remove("buttontodohover");
};

task.addEventListener("click", () => toggleButton(task, done));
done.addEventListener("click", () => toggleButton(done, task));


//olah data di task
task.addEventListener("click", () => {
    const allItem = Array.from(takeli());
    
    allItem.forEach((item) => {
        const allItemSmaller = Array.from(item.querySelectorAll("div"));
        if (item.getAttribute("data-checkbox") === "0") {
            item.style.display = "flex";
            item.classList.remove("hidden");
            allItemSmaller[0].classList.remove("strikethrough");
        }
        else {
            item.style.display = "none";
            item.classList.remove("hidden");
        }

    });
});

//olah data di done
done.addEventListener("click", () => {
    const allItem = Array.from(takeli());
    const myArray = [];
    allItem.forEach((item) => {
        
        if (item.getAttribute("data-checkbox") === "1") {
            item.style.display = "flex";
            item.classList.remove("hidden");
        }
        else {
            item.style.display = "none";
            item.classList.remove("hidden");
        }
    });
});


//function buat ambil data li
function takeli() {
    unorderedList = document.getElementById("todoList");
    const allItem = unorderedList.querySelectorAll("li");
    return allItem;
}





function sortByPriority() {
    const allItem = Array.from(takeli());
    allItem.sort((a, b) => {
        const priorityA = priorityOrder[a.getAttribute("data-priority")];
        const priorityB = priorityOrder[b.getAttribute("data-priority")];

        return priorityA - priorityB;
    });

    reRender(allItem);
}




//function buat sort date taruhnya di button sort by date
function sortByDate() {
    const allItem = Array.from(takeli());

    allItem.sort((a, b) => {
        const priorityA = new Date(a.getAttribute("data-date"));
        const priorityB = new Date(b.getAttribute("data-date"));

        return priorityA - priorityB;
    });


    reRender(allItem);

}

function reRender (arrayItem) {
    unorderedList.innerHTML = "";
    arrayItem.forEach((i) => {
        unorderedList.appendChild(i);
    });
}




















setInterval(() => {
    const now = new Date();
    localTime.innerHTML = now.toLocaleTimeString();
}, 1000);

