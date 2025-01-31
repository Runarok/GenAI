let currentTabToRename = null;

// Create a new Notepad with tabs and textarea
function createNotepad() {
    const container = document.getElementById("notepadContainer");
    const tabsContainer = document.getElementById("tabsContainer");

    // Create a new tab for the notepad
    const tabId = `tab-${Date.now()}`;
    const tab = document.createElement('button');
    tab.className = 'tab';
    tab.textContent = 'Untitled'; // Initially set the tab name as "Untitled"
    tab.setAttribute('data-id', tabId);
    tab.addEventListener('click', switchTab);
    tab.addEventListener('dblclick', renameTab);  // Double-click to rename

    // Create a new notepad content area
    const notepadContent = document.createElement('div');
    notepadContent.className = 'notepad-content';
    notepadContent.setAttribute('data-id', tabId);

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveNote(tabId));

    const loadButton = document.createElement('button');
    loadButton.textContent = 'Load';
    loadButton.addEventListener('click', () => loadNote(tabId));

    toolbar.appendChild(saveButton);
    toolbar.appendChild(loadButton);

    const textarea = document.createElement('textarea');
    textarea.id = `notepad-${tabId}`;
    textarea.placeholder = 'Write something...';
    notepadContent.appendChild(toolbar);
    notepadContent.appendChild(textarea);

    // Append the tab and content to the container
    tabsContainer.insertBefore(tab, tabsContainer.querySelector('#newNotepad')); // Add tab before the "+" button
    container.appendChild(notepadContent);

    // Switch to the new tab
    switchTab({ target: tab });
}

// Switch between tabs
function switchTab(event) {
    const tab = event.target;
    const container = document.getElementById("notepadContainer");

    // Set all tabs to inactive
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Set all notepads to inactive (hide them)
    container.querySelectorAll('.notepad-content').forEach(c => c.classList.remove('active'));

    // Set the clicked tab to active
    tab.classList.add('active');

    // Show the associated notepad
    const tabId = tab.getAttribute('data-id');
    const notepad = container.querySelector(`.notepad-content[data-id="${tabId}"]`);
    notepad.classList.add('active');
}

// Save the content of a notepad
function saveNote(tabId) {
    const text = document.getElementById(`notepad-${tabId}`).value;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tabId}.txt`;
    link.click();
}

// Load a text file into a notepad
function loadNote(tabId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(`notepad-${tabId}`).value = e.target.result;
        };
        reader.readAsText(file);
    });
    input.click();
}

// Open modal to rename the tab
function renameTab(event) {
    const tab = event.target;
    currentTabToRename = tab;
    document.getElementById("tabNameInput").value = tab.textContent; // pre-fill with current name
    document.getElementById("renameModal").style.display = "block";
}

// Save the new tab name
function saveTabName() {
    const newName = document.getElementById("tabNameInput").value;
    if (newName) {
        currentTabToRename.textContent = newName;
    }
    closeModal();
}

// Close the modal
function closeModal() {
    document.getElementById("renameModal").style.display = "none";
}

// Initialize with a default notepad
window.onload = createNotepad;
