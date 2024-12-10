let currentPage = 1;
const totalPages = 20;

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === pageNumber - 1) {
            page.classList.add('active');
        }
    });
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

document.addEventListener('keydown', function(event) {
    const dropdown = document.getElementById('pageDropdown');
    if (dropdown.style.display === 'block') {
        switch (event.key) {
            case 'ArrowDown':
                moveDropdownSelection(1);
                break;
            case 'ArrowUp':
                moveDropdownSelection(-1);
                break;
            case 'Enter':
                goToDropdownPage();
                break;
            default:
                break;
        }
    } else {
        switch (event.key) {
            case 'ArrowRight':
            case 'd':
                nextPage();
                break;
            case 'ArrowLeft':
            case 'a':
                prevPage();
                break;
            case 'Enter':
                togglePageDropdown();
                break;
            default:
                break;
        }
    }
});

let dropdownIndex = -1; // To track the current selection in the dropdown

function moveDropdownSelection(direction) {
    const options = document.querySelectorAll('#pageSelect option');
    if (dropdownIndex === -1) {
        dropdownIndex = 0; // Start with the first option
    } else {
        dropdownIndex = Math.max(0, Math.min(dropdownIndex + direction, options.length - 1));
    }

    options.forEach((option, index) => {
        option.selected = index === dropdownIndex; // Highlight the current selection
    });
}

function goToDropdownPage() {
    const options = document.querySelectorAll('#pageSelect option');
    if (dropdownIndex >= 0) {
        goToPage(options[dropdownIndex].value);
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('fontDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function changeFont(font) {
    const pages = document.querySelectorAll('.page p');
    pages.forEach(page => {
        page.style.fontFamily = font;
    });
    toggleDropdown(); // Close the dropdown after selection
}

function togglePageDropdown() {
    const dropdown = document.getElementById('pageDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function goToPage(pageNumber) {
    if (pageNumber) {
        currentPage = parseInt(pageNumber);
        showPage(currentPage);
    }
    closePageDropdown();
}

function closePageDropdown() {
    document.getElementById('pageDropdown').style.display = 'none';
}
