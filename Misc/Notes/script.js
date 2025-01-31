       // Function to fetch the list of markdown files in the directory
        function fetchFileList() {
            const apiUrl = 'https://api.github.com/repos/Runarok/GenAI/contents/Misc/Notes';
            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    return data.filter(file => file.name.endsWith('.md')).map(file => file.name.replace('.md', ''));
                })
                .catch(error => {
                    console.error('Error fetching file list:', error);
                    return [];
                });
        }

        // Function to fetch the content of a specific markdown file from raw GitHub URL
        function loadPaperContent(PaperName) {
            const fileUrl = `https://raw.githubusercontent.com/Runarok/GenAI/main/Misc/Notes/${PaperName}.md`; // Construct the raw URL

            fetch(fileUrl)
                .then(response => response.text()) // Get the raw markdown data as text
                .then(markdown => {
                    // Convert markdown to HTML
                    const converter = new showdown.Converter();
                    const htmlContent = converter.makeHtml(markdown);

                    // Display the content in the #markdown-content container
                    document.getElementById('markdown-content').innerHTML = htmlContent;

                    // Dynamically update the browser title
                    document.title = `${PaperName} - GenAI Chronicles`;
                })
                .catch(error => {
                    document.getElementById('markdown-content').innerHTML = `<p>Error loading the Paper content. Please try again later.</p>`;
                    console.error('Error loading Paper content:', error);
                });
        }

        // Theme toggle functionality
        const themeToggleBtn = document.getElementById('themeToggle');
        const body = document.body;

        // Check if theme is saved in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            themeToggleBtn.textContent = savedTheme === 'light-theme' ? '🌙' : '🌞'; // Moon for dark theme, Sun for light
        }

        // Toggle theme when the button is clicked
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark-theme');
                themeToggleBtn.textContent = '🌙'; // Switch to Moon when dark
            } else {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
                themeToggleBtn.textContent = '🌞'; // Switch to Sun when light
            }
        });

        // Function to load the markdown file list and create buttons
        function loadFileButtons() {
            fetchFileList().then(fileList => {
                const buttonsContainer = document.getElementById('buttons-container');

                // Create a button for each markdown file
                fileList.forEach(file => {
                    const button = document.createElement('button');
                    button.textContent = file;
                    button.onclick = () => {
                        loadPaperContent(file); // Load content when clicked
                        setActiveButton(button); // Set the active class to the selected button

                        // Update the URL with the selected paper name
                        const newUrl = new URL(window.location);
                        newUrl.searchParams.set('paper', file);
                        history.pushState(null, '', newUrl); // Update the URL without reloading the page
                    };
                    buttonsContainer.appendChild(button);
                });

                // Check if a 'paper' URL parameter is provided
                const urlParams = new URLSearchParams(window.location.search);
                const paperName = urlParams.get('paper');
                if (paperName && fileList.includes(paperName)) {
                    loadPaperContent(paperName); // Automatically load content for the specified paper
                    const activeButton = Array.from(buttonsContainer.children).find(button => button.textContent === paperName);
                    if (activeButton) setActiveButton(activeButton); // Highlight the active button
                }
            });
        }

        // Function to set the active button style
        function setActiveButton(selectedButton) {
            const buttons = document.querySelectorAll('#buttons-container button');
            buttons.forEach(button => button.classList.remove('active')); // Remove active class from all buttons
            selectedButton.classList.add('active'); // Add active class to the clicked button
        }

        // Initialize the page by loading the list of files and displaying the first file
        window.onload = function() {
            loadFileButtons(); // Load buttons for all files
        };