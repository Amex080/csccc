// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const staffForm = document.getElementById('staffForm');
    if (staffForm) {
        // Show/Hide Welcome Address based on Leadership Position selection
        const leadershipPosition = document.getElementById('leadershipPosition');
        const welcomeAddressSection = document.getElementById('welcomeAddressSection');
        leadershipPosition.addEventListener('change', function () {
            if (leadershipPosition.value !== '') {
                welcomeAddressSection.style.display = 'block';
            } else {
                welcomeAddressSection.style.display = 'none';
            }
        });

        // Handle form submission
        staffForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(staffForm);
            const staffData = {};
            formData.forEach((value, key) => {
                staffData[key] = value;
            });

            // Handle multiple select fields
            staffData.proSkills = formData.getAll('proSkills');
            staffData.hobbies = formData.getAll('hobbies');

            // Handle file upload (convert to base64)
            const photoFile = document.getElementById('photo').files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                staffData.photo = reader.result;

                // Save data to sessionStorage
                sessionStorage.setItem('staffData', JSON.stringify(staffData));

                // Send email using EmailJS
                emailjs.send("service_ih3c44a", "YOUR_TEMPLATE_ID", staffData)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });

                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            };
            if (photoFile) {
                reader.readAsDataURL(photoFile);
            } else {
                // No photo uploaded
                staffData.photo = '';
                // Save data and redirect
                sessionStorage.setItem('staffData', JSON.stringify(staffData));
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Generate dashboard content
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        const staffData = JSON.parse(sessionStorage.getItem('staffData'));
        if (staffData) {
            // Create dashboard content
            let content = `
                <h1>Welcome, ${staffData.name}</h1>
                ${staffData.photo ? `<img src="${staffData.photo}" alt="${staffData.name}" style="max-width:200px;">` : ''}
                <h2>Personal Statement</h2>
                <p>${staffData.personalStatement || ''}</p>
                <h2>Area of Specialization</h2>
                <p>${staffData.specialization || ''}</p>
            `;

            // Leadership Position and Welcome Address
            if (staffData.leadershipPosition) {
                content += `
                    <h2>Leadership Position Held</h2>
                    <p>${staffData.leadershipPosition}</p>
                    <h2>Welcome Address</h2>
                    <p>${staffData.welcomeAddress || ''}</p>
                `;
            }

            content += `
                <h2>Status</h2>
                <p>${staffData.status || ''}</p>
                <h2>Department</h2>
                <p>${staffData.department || ''}</p>
                <h2>Staff Code/ID</h2>
                <p>${staffData.staffCode || ''}</p>
                <h2>Pro Skills</h2>
                <ul>
            `;
            staffData.proSkills.forEach(skill => {
                content += `<li>${skill}</li>`;
            });
            content += `</ul>
                <h2>Skills Percentage Level</h2>
                <p>${staffData.skillsPercentage || ''}</p>
                <h2>Qualification</h2>
                <p>${staffData.qualification || ''}</p>
                <h2>Degree</h2>
                <p>${staffData.degree || ''}</p>
                <h2>University</h2>
                <p>${staffData.university || ''}</p>
                <h2>Hobbies</h2>
                <ul>
            `;
            staffData.hobbies.forEach(hobby => {
                content += `<li>${hobby}</li>`;
            });
            content += `</ul>
                <h2>Motivation</h2>
                <p>${staffData.motivation || ''}</p>
                <h2>Favorite Working/Association Group</h2>
                <p>${staffData.favoriteGroup || ''}</p>
                <h2>Favorite Institutional/Research Discussion Group</h2>
                <p>${staffData.favoriteDiscussion || ''}</p>
                <h2>Best Life Experience</h2>
                <p>${staffData.bestExperience || ''}</p>
                <h2>Contact Details</h2>
                <p>Phone: ${staffData.phone || ''}</p>
                <p>Email: ${staffData.email || ''}</p>
                <h2>Social Media Handles</h2>
                ${staffData.facebook ? `<p><img src="facebook_logo.png" alt="Facebook" style="width:20px;"> ${staffData.facebook}</p>` : ''}
                ${staffData.twitter ? `<p><img src="twitter_logo.png" alt="Twitter" style="width:20px;"> ${staffData.twitter}</p>` : ''}
                ${staffData.instagram ? `<p><img src="instagram_logo.png" alt="Instagram" style="width:20px;"> ${staffData.instagram}</p>` : ''}
                ${staffData.youtube ? `<p><img src="youtube_logo.png" alt="YouTube" style="width:20px;"> ${staffData.youtube}</p>` : ''}
                <button onclick="window.print()">Print Profile</button>
            `;

            dashboard.innerHTML = content;
        } else {
            dashboard.innerHTML = '<p>No staff data found. Please submit the form first.</p>';
        }
    }
});
