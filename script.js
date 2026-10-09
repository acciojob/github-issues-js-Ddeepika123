//your code here
let currentPage = 1;

const pageNumber = document.getElementById("page-number");
const issuesList = document.getElementById("issues-list");
const loadNext = document.getElementById("load_next");
const loadPrev = document.getElementById("load_prev");

async function fetchIssues(page) {
try {
const response = await fetch(
`https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`
);


    if (!response.ok) {
        throw new Error("Failed to fetch issues");
    }

    const issues = await response.json();

    // Remove the issues from the previous page.
    issuesList.innerHTML = "";

    // Display the new issues.
    issues.forEach(issue => {
        const listItem = document.createElement("li");
        listItem.textContent = issue.title;
        issuesList.appendChild(listItem);
    });

    // Update the page number heading.
    pageNumber.textContent = `Page number ${page}`;

    // Disable Previous on page 1.
    loadPrev.disabled = page === 1;

} catch (error) {
    console.error("Error fetching issues:", error);
    issuesList.innerHTML = "<li>Failed to load issues. Please try again.</li>";
}


}

// Load the next page.
loadNext.addEventListener("click", () => {
currentPage++;
fetchIssues(currentPage);
});

// Load the previous page.
loadPrev.addEventListener("click", () => {
if (currentPage > 1) {
currentPage--;
fetchIssues(currentPage);
}
});

// Load page 1 when the app starts.
fetchIssues(currentPage);
