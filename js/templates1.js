const assessmentTemplate = function(assessment) {
  console.log(assessment.name)
  //diplsay weighting per course , course name and mark available
  return `
  <tr>
  <td>${assessment.name}</td>
  <td>${assessment.weight.toPrecision(4) * 100} + '%' </td>
  <td>${assessment.mark}</td>
  </tr>  `;
}

//  2. Display the topics per course. topics for Each
// Check if there are no assessments.
const assessmentTemplateHelper = function(course){
  let result = ''
  if (course.assessments.length === 0) return `<tr colspan="100%"><td>No assessments found.</td></tr>`;
  for (let assess of course.assessments){
    courses += course.readingList
    result += assessmentTemplate(assess)
    console.log(assess) //arry of assessments
    console.log(course)//array of courses (all)
    console.log(course.readingList)//all attributes of readinglist
  }
  return result;
}

//3 readinglist in ascending order for each course with title and author and yhumnail images


//4. Show grades based on the marks.


//5. Calculate and display the overall course mark.
//Add in the overall grade to be shown next to the overall final course mark


const courseTemplate = function(course) {
  return `

  <h3>${course.id}
  ${course.name}</h3>
  <h4>${course.topics}</h4>
  <table class="table">
  <!-- Add Grade & Overall Grade here -->
  <thead>
  <th>Assessment</th>
  <th>Weighting</th>
  <th>Mark</th>
  </thead>
  <tbody>
  ${assessmentTemplateHelper(course)}
  </tbody>
  </table>
  `
}
