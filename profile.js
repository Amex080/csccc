document.addEventListener('DOMContentLoaded', function () {
    // Sample data fetched from localStorage or submitted form
    const staffData = JSON.parse(localStorage.getItem('staffData'));

    if (staffData) {
        document.getElementById('staffName').textContent = staffData.name;
        document.getElementById('staffSpecialization').textContent = staffData.specialization;
        document.getElementById('staffPersonalStatement').textContent = staffData.personalStatement;
        document.getElementById('staffEmail').textContent = staffData.email;
        document.getElementById('staffPhone').textContent = staffData.phone;
        document.getElementById('staffDepartment').textContent = staffData.department;
        document.getElementById('staffLeadershipPosition').textContent = staffData.leadershipPosition;

        // Display welcome address if leadership position is selected
        if (staffData.leadershipPosition && staffData.leadershipPosition !== "") {
            document.getElementById('welcomeAddressSection').style.display = 'block';
            document.getElementById('staffWelcomeAddress').textContent = staffData.welcomeAddress;
        }

        // Social Media Handles
        document.getElementById('staffFacebook').textContent = staffData.facebook || 'N/A';
        document.getElementById('staffTwitter').textContent = staffData.twitter || 'N/A';
        document.getElementById('staffInstagram').textContent = staffData.instagram || 'N/A';
        document.getElementById('staffYouTube').textContent = staffData.youtube || 'N/A';

        // Hobbies
        document.getElementById('staffHobbies').textContent = staffData.hobbies ? staffData.hobbies.join(', ') : 'N/A';

        // Skills
        const skillsList = document.getElementById('skillsList');
        if (staffData.proSkills) {
            staffData.proSkills.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.textContent = `${skill} - ${staffData.skillsPercentage}`;
                skillsList.appendChild(skillItem);
            });
        }

        // Footer contact info
        document.getElementById('footerContactPhone').textContent = staffData.phone;
        document.getElementById('footerContactEmail').textContent = staffData.email;
    }
});


