const assessmentTemplate = function(assessment) {
  console.log(assessment.name)
  //display weighting per course , course name and mark available
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
    // readingListTemplateHelper(course)
  }
  return result;
}

const courseAndReadingListTemplate = function(course) {
  return `
  <h3>Reading List</h3>
  <div class="reading-list-wrapper">
  ${readingListTemplateHelper(course)}
  </div>
  `

}

const readingListTemplateHelper = function(course){
  let output = ''
 if ( course.readingList.length ===0) return `<tr colspan="100%"><td>ReadingList Unavailable</td></tr>`;
  for (value of course.readingList){
    if (value.image === null){
      value.image = '404.png';
    }
    output += readingListTemplate(value);
  }
  return output
}

const readingListTemplate = function(read) {
  //3 readinglist in ascending order
  return `
  <div class="reading-list-item">
  <p><b>${read.title}</b></p>
  <p>By ${read.author}</p>
  <p>  ${read.image}</p>
  </div>
  <tr>
  `;
}

//4. Show grades based on the marks.
//display weighting per course , course name and mark available

//5. Calculate and display the overall course mark.
//Add in the overall grade to be shown next to the overall final course mark

const courseTemplate = function(course) {
  return `

  <h3>${course.id}
  ${course.name}</h3>
  <h4>${course.topics}</h4>
  ${courseAndReadingListTemplate(course)}
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
