
const courseWindow = document.getElementById('courses');

for (let course of courses) { //array of courses
  // Add in each course to the window.
  courseWindow.innerHTML += courseTemplate(course);
}

// Mark it as loaded for screen readers.
courseWindow.setAttribute('aria-busy', 'false');
