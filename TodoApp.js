const AddItem_ToList = function (Note) {
    let Text = document.getElementById('Additem').value;

    if (Text !== "" || (Note != undefined && Note !== "")) {
        if (Note !== "" && Note != undefined) {
            Text = Note;
        }
        // Create a new row in the table
        let table = document.querySelector('table');
        let newRow = table.insertRow();  // Inserts a new row at the end of the table body

        // Create and style each cell in the row
        let cell1 = newRow.insertCell(0);
        cell1.classList.add('td_check');
        cell1.innerHTML = `<input type="checkbox" class="form-check-input" id="radio1" name="optradio" value="option1">`;

        let checkbox = cell1.querySelector('input[type="checkbox"]');
        checkbox.onclick = function () {
            Checkrow(this);
        };

        let cell2 = newRow.insertCell(1);
        cell2.classList.add('td_text');
        cell2.textContent = Text;

        let cell3 = newRow.insertCell(2);
        cell3.classList.add('td-btn');
        cell3.style.display = "flex";

        // Add an edit button with Font Awesome icon and event listener
        let editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.classList.add('btn', 'btn-warning', 'ml-2');
        editButton.innerHTML = `<i class="fa fa-edit"></i>`; // Font Awesome edit icon
        editButton.onclick = function () {
            editRow(this);
        };

        // Add a delete button with an event listener
        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
        deleteButton.innerHTML = `<i class="material-icons" style="font-size: small;">delete</i>`;
        deleteButton.onclick = function () {
            deleteRow(this);
        };

        cell3.appendChild(editButton);
        cell3.appendChild(deleteButton);

        document.getElementById('Additem').value = "";
        SaveTodoList(false);
        document.getElementById('Additem').focus();

    }
};

// Function to delete the row
function deleteRow(button) {
    debugger;
    const descriptions = JSON.parse(localStorage.getItem("descriptions")) || [];
    let row = button.parentNode.parentNode;  // Navigate up to the <tr> element
    row.parentNode.removeChild(row);
    descriptions.forEach((p, i) => {
        if (row.cells[1].innerText === p) {
            descriptions.splice(i, 1);
        }
    });
    localStorage.clear();
    localStorage.setItem("descriptions", JSON.stringify(descriptions));
}

// Function to edit the row
function editRow(button) {
    debugger;
    let row = button.parentNode.parentNode; // Get the row to edit
    let textCell = row.cells[1]; // The cell with the text
    let input = "";
    let isEditsave = false;
    debugger;
    if (button.innerHTML.includes('fa-edit')) {
        // Change the text to an input for editing
        input = document.createElement('input');
        input.type = 'text';
        input.value = textCell.textContent;
        input.classList.add('form-control');
        textCell.innerHTML = '';
        textCell.appendChild(input);
        input.focus();

        // Change the button icon to "Save" with a checkmark
        button.innerHTML = `<i class="fa fa-check"></i>`;
        button.classList.remove('btn-warning');
        button.classList.add('btn-success');
    } else {
        // Save the edited text and change back to text content
        isEditsave = true;
        input = textCell.querySelector('input');
        textCell.textContent = input.value;

        // Change the button icon back to "Edit"
        button.innerHTML = `<i class="fa fa-edit"></i>`;
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');
    }
    if (isEditsave) {
        SaveTodoList(isEditsave);
    }
}


function Checkrow(checkbox) {
    if (checkbox.checked) {
        checkbox.parentNode.nextSibling.style.textDecoration = "line-through"
    } else {
        checkbox.parentNode.nextSibling.style.textDecoration = "";
    }
}


function SaveTodoList(isEdit) {
    debugger;
    if (isEdit) {
        localStorage.clear();
    }
    // Get all table rows
    const table = document.querySelector('table');
    const descriptions = [];

    var data = table.children[1].parentElement.rows;
    for (let i = 1; i < data.length; i++) {
        descriptions.push(data[i].cells[1].innerText);
    }

    // Store the array in local storage as a JSON string
    localStorage.setItem("descriptions", JSON.stringify(descriptions));

}

// To retrieve it later:
function loadDescriptions() {
    debugger;
    const descriptions = JSON.parse(localStorage.getItem("descriptions")) || [];

    if (descriptions.length > 0) {
        for (let i = 0; i < descriptions.length; i++) {
            AddItem_ToList(descriptions[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDescriptions);