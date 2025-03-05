let courses = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            courses = data.courses;
            displayCourses(courses);  
        })
        .catch(error => console.error("Failed to load courses:", error));
});

function displayCourses(courseList) {
    const listContainer = document.getElementById("course-list");
    listContainer.innerHTML = "";  

    if (courseList.length === 0) {
        const noResult = document.createElement("li");
        noResult.textContent = "No courses found.";
        listContainer.appendChild(noResult);
    } else {
        courseList.forEach(course => {
            const li = document.createElement("li");
            li.textContent = course;
            listContainer.appendChild(li);
        });
    }
}

function searchCourses() {
    const query = document.getElementById("searchBox").value.toLowerCase().trim();

    if (query === "") {
        document.getElementById("course-list").innerHTML = ""; 
        return;
    }

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(query)
    );

    displayCourses(filteredCourses);
}

document.getElementById("searchBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCourses();
    }
});

document.getElementById("searchBox").addEventListener("input", function() {
    if (this.value.trim() === "") {
        document.getElementById("course-list").innerHTML = ""; // Clear results if empty
    }
});
