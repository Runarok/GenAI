        // Function to sort programs by their titles alphabetically
        function sortProgramsByTitle(programs) {
            return programs.sort((a, b) => a.question.localeCompare(b.question));
        }

        // Function to show the selected section
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the selected section
            const sectionToShow = document.getElementById(sectionId);
            sectionToShow.classList.add('active');
        }

        // Function to capitalize the first letter of each word in the question
        function capitalizeTitle(text) {
            return text.replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        }

        // Function to copy code to clipboard
        function copyCode(codeId) {
            var copyText = document.getElementById(codeId);
            var range = document.createRange();
            range.selectNode(copyText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");

            var btn = document.querySelector(`#${codeId}`).nextElementSibling;
            btn.classList.add("copied");

            setTimeout(function() {
                btn.classList.remove("copied");
            }, 2000);

            alert("Code copied to clipboard!");
        }

        
        // Function to load programs based on subject
        function loadPrograms(subject) {
            const section = document.getElementById(subject);
            const programs = programData.subjects[subject];
        
            // Sort the programs by question (title)
            const sortedPrograms = sortProgramsByTitle(programs);
        
            // Clear previous programs
            section.innerHTML = `<div class="section-title">${subject}</div>`;
        
            sortedPrograms.forEach((program, index) => {
                const programHTML = `
                    <div class="program-container">
                        <div class="question" onclick="toggleCode('codeWrapper${subject}${index + 1}')">${capitalizeTitle(program.question)}</div>
                        <div class="code-wrapper" id="codeWrapper${subject}${index + 1}">
                            <pre><code id="code${subject}${index + 1}">${program.code.trim()}</code></pre>
                            <button class="copy-btn" onclick="copyCode('code${subject}${index + 1}')">Copy Code</button>
                        </div>
                    </div>
                `;
                section.innerHTML += programHTML; // Append the program to the section
            });
        }


        // Toggle visibility of code for a specific program
        function toggleCode(codeWrapperId) {
            const codeWrapper = document.getElementById(codeWrapperId);
            codeWrapper.style.display = codeWrapper.style.display === 'block' ? 'none' : 'block';
        }

        // Define the sections to cycle through
        const sectionIds = ['DSP', 'DC'];
        let currentSectionIndex = 0; // Start with DSP section

        // Function to go to the next section
        function goToNextSection() {
            currentSectionIndex = (currentSectionIndex + 1) % sectionIds.length; // Loop to the first section after the last
            showSection(sectionIds[currentSectionIndex]);
        }

        // Function to go to the previous section
        function goToPreviousSection() {
            currentSectionIndex = (currentSectionIndex - 1 + sectionIds.length) % sectionIds.length; // Loop to the last section before the first
            showSection(sectionIds[currentSectionIndex]);
        }

        // Event listener for keydown events to listen for arrow keys and 'A/a', 'D/d'
        document.addEventListener('keydown', function(event) {
            // Right arrow key (→) or 'D'/'d' to go to next section
            if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
                goToNextSection();
            } 
            // Left arrow key (←) or 'A'/'a' to go to previous section
            else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
                goToPreviousSection();
            }
        });
       
        // Initialize with DC section and load programs
        showSection('DC');
        loadPrograms('DC');
        loadPrograms('DSP');
