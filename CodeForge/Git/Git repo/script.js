let currentPage = 1;
let reposData = [];
let perPage = 20; // Default to 20 repositories per page
let totalRepos = 0;

// Handle username input change
function handleUsernameInput() {
    document.getElementById('copy-buttons').style.display = 'none'; // Hide the copy buttons when username is not entered
    document.getElementById('repo-list').innerHTML = ''; // Clear previous repositories
    document.getElementById('error').textContent = ''; // Clear any previous errors
    document.getElementById('profile').innerHTML = ''; // Clear profile info
    currentPage = 1; // Reset to the first page when a new username is entered
}

// Fetch repositories and display them
async function fetchRepos() {
    const username = document.getElementById('username').value;
    perPage = document.getElementById('repo-limit').value === 'all' ? totalRepos : parseInt(document.getElementById('repo-limit').value);
    const errorDiv = document.getElementById('error');
    const repoList = document.getElementById('repo-list');
    const pagination = document.getElementById('pagination');
    const profileContainer = document.getElementById('profile');
    const copyButtons = document.getElementById('copy-buttons');
    const pageRange = document.getElementById('page-range');

    // Clear previous error and repository list
    errorDiv.textContent = '';
    repoList.innerHTML = '';
    pagination.innerHTML = '';
    profileContainer.innerHTML = '';
    copyButtons.style.display = 'none'; // Hide the copy buttons by default
    pageRange.innerHTML = '';

    if (!username) {
        errorDiv.textContent = 'Please enter a GitHub username';
        return;
    }

    try {
        // Fetch user data for profile picture
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        if (userData.message === 'Not Found') {
            errorDiv.textContent = 'User not found';
            return;
        }

        // Display user profile picture and username
        profileContainer.innerHTML = `
            <img src="${userData.avatar_url}" alt="${userData.login}'s avatar">
            <h3>${userData.login}</h3>
        `;

        // Fetch repositories with pagination
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        reposData = await repoResponse.json();
        totalRepos = reposData.length;

        if (reposData.length === 0) {
            errorDiv.textContent = 'No repositories found for this user.';
            return;
        }

        const startIndex = (currentPage - 1) * perPage;
        const endIndex = Math.min(startIndex + perPage, reposData.length);
        const currentRepos = reposData.slice(startIndex, endIndex);

        currentRepos.forEach(repo => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = repo.html_url;
            a.target = '_blank';
            a.textContent = repo.name;
            li.appendChild(a);
            repoList.appendChild(li);
        });

        // Display the copy buttons
        copyButtons.style.display = 'flex';

        // Update the page range
        pageRange.innerHTML = `<span>${startIndex + 1} - ${endIndex}</span> of <span>${totalRepos}</span> repositories`;

        // Set up pagination buttons
        const totalPages = Math.ceil(totalRepos / perPage);
        const prevPageButton = document.createElement('button');
        prevPageButton.textContent = '<';
        prevPageButton.classList.add('square');
        prevPageButton.onclick = () => changePage(-1);
        prevPageButton.disabled = currentPage === 1; // Disable if it's the first page

        const nextPageButton = document.createElement('button');
        nextPageButton.textContent = '>';
        nextPageButton.classList.add('square');
        nextPageButton.onclick = () => changePage(1);
        nextPageButton.disabled = currentPage === totalPages; // Disable if it's the last page

        pagination.innerHTML = ''; // Clear previous pagination
        pagination.appendChild(prevPageButton);
        pagination.appendChild(pageRange);
        pagination.appendChild(nextPageButton);
    } catch (error) {
        errorDiv.textContent = 'An error occurred. Please try again later.';
    }
}

// Handle page changes (next/prev)
function changePage(offset) {
    currentPage += offset;
    fetchRepos();
}

// Copy the current page or all repositories
function copyRepos(type) {
    const repoNames = [];

    let reposToCopy;
    if (type === 'page') {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = Math.min(startIndex + perPage, reposData.length);
        reposToCopy = reposData.slice(startIndex, endIndex);
    } else if (type === 'all') {
        reposToCopy = reposData;
    }

    // Collect all the repository names
    reposToCopy.forEach(repo => {
        repoNames.push(repo.name);
    });

    if (repoNames.length > 0) {
        const textToCopy = repoNames.join('\n'); // Join the names with newlines

        // Create a temporary textarea to copy the text to the clipboard
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        // Provide feedback that the names have been copied
        alert(`${type === 'page' ? 'Current Page' : 'All'} repositories copied to clipboard!`);
    }
}
