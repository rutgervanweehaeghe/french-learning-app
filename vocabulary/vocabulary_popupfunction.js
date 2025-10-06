
// Step 1: Get the base name of the current HTML file (without extension)
const pageName = window.location.pathname.split("/").pop().split(".")[0].split("_").pop();


  // Step 2: Access the variable with the same name as the page

const variableName=`vocabularyList_${pageName}`;
const vocabularyList = eval(variableName);





// Function to create a table row
function createTableRow(word1, word2) {
    return `<tr><td>${word1}</td><td>${word2}</td></tr>`;
}

// Function to populate the table with word pairs
function populateTable() {
    let tableBody = document.getElementById("wordTable"); // FIXED ID
    let tableContent = "";

    vocabularyList.forEach(pair => {
        tableContent += createTableRow(pair[0], pair[1]);
    });

    tableBody.innerHTML = tableContent;
}

// Run the function when the script loads (since `defer` is used)
populateTable();
