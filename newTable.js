let selectedRow = null

function onFormSubmit() {
    let formData = readFormData()
    if (selectedRow == null) {
        insertNewRecord(formData)
    } else {
        updateRecord(formData)
    }
    resetForm()
}

function readFormData() {
    //create object to store formData
    let formData = {}
    formData["firstName"] = document.getElementById("firstName").value
    formData["lastName"] = document.getElementById("lastName").value
    formData["phoneNumber"] = document.getElementById("phoneNumber").value
    formData["emailAddress"] = document.getElementById("emailAddress").value
    return formData
}

function insertNewRecord(data) {
    //populate candidateList table with user input
    let table = document.getElementById("candidateList").getElementsByTagName("tbody")[0]
    let newRow = table.insertRow(table.length) //newRow inserted from total table length
    cell1 = newRow.insertCell(0) //create firstName cell
    cell1.innerHTML = data.firstName //insert firstName data into cell
    cell2 = newRow.insertCell(1) //create lastName cell
    cell2.innerHTML = data.lastName
    cell3 = newRow.insertCell(2) //create phoneNumber cell
    cell3.innerHTML = data.phoneNumber
    cell4 = newRow.insertCell(3) //create emailAddress cell
    cell4.innerHTML = data.emailAddress
    cell4 = newRow.insertCell(4)
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a> 
                        <a onClick="onDelete(this)">Delete</a>` //edit and delete buttons
    
    //for filter
    let cellData = document.querySelectorAll("#candidateList > tbody > tr")
    let searchInp = document.getElementById("searchInp")

    searchInp.addEventListener("keyup", function(event) {
        searchInpVal = event.target.value.toLowerCase()

        cellData.forEach((tableRow) => {
            tableRow.textContent.toLowerCase().includes(searchInpVal)
            ? tableRow.style.visibility = "visible"
            : tableRow.style.visibility = "collapse"
        })
    })
}

function resetForm() {
    //clear form list entry after clicking submit
    document.getElementById("firstName").value = ""
    document.getElementById("lastName").value = ""
    document.getElementById("phoneNumber").value = ""
    document.getElementById("emailAddress").value = ""
    selectedRow = null
}

function onEdit(td) {
    //edit button
    selectedRow = td.parentElement.parentElement //return corresponding table of td element
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML
    document.getElementById("phoneNumber").value = selectedRow.cells[2].innerHTML
    document.getElementById("emailAddress").value = selectedRow.cells[3].innerHTML
}

function onDelete(td) {
    //delete button
    if (confirm("Are you sure you want to delete this entry?")){
        tableRow = td.parentElement.parentElement
        document.getElementById("candidateList").deleteRow(tableRow.rowIndex)
        resetForm() //reset form after delete
    }

}

function updateRecord(formData) {
    //update formData after edit
    selectedRow.cells[0].innerHTML = formData.firstName
    selectedRow.cells[1].innerHTML = formData.lastName
    selectedRow.cells[2].innerHTML = formData.phoneNumber
    selectedRow.cells[3].innerHTML = formData.emailAddress
}