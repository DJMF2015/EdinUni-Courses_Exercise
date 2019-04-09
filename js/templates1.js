const assessmentTemplate = function(assessment) {
  // console.log(assessment.name)
  //display weighting per course , course name and mark available
  return `
  <tr>
  <td>${assessment.name}</td>
  <td>${assessment.weight.toPrecision(4) * 100} + '%' </td>
  <td>${assessment.mark}</td>
  <td>${calculateGradeHelper(assessment.mark)}</td>
  </tr>

  `
}

//TO-DO to display table wih colour codes
const calculateGradeHelper = function(mark){
  //use Bootstrap 3 .label class,
}

// 2. Display the topics per course. topics for Each
// Check if there are no assessments.
const assessmentTemplateHelper = function(course){
  let result = ''
  if (course.assessments.length === 0) return `<tr colspan="100%"><td>No assessments found.</td></tr></tabel>`;
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

// const sortReadingList = function (output){
//   let readA = ''
//   console.log(output)
// }


const readingListTemplateHelper = function(course){
  let output = ' ';
  if ( course.readingList.length ===0) return `<tr colspan="100%" ><td>No readingList available</td></tr>`;
  for (value of course.readingList){

    if (value.image === null){
      value.image = '404.png';
    }
    output += readingListTemplate(value);
  }
  return output
}

const readingListTemplate = function(read) {

  //3 TO DOlist readinglist in ascending order by date due.
  return `
  <div class="reading-list-item">
  <p><b>${read.title}</b></p>
  <p> ${read.author}</p>
  <p>  ${read.dueDate} </p>
  <img class="book-thumbnail" src= "images/${read.image}" alt="images/404.png">
  </div>
  <tr>
  `;
}

//4. Show grades based on the marks.
//display weighting per course , course name and mark available
const arrayOfPercentages = function(course){
  let percentage = []
  for (index of course.assessments){
    let percentagemark = (index.mark / 100) //75
    let percentageweighting =  percentagemark * index.weight  //0.333
    // console.log(percentageweighting) //0.45
    let overallmark = percentageweighting//"0.63", "0.11", "0.06"]
    percentage.push(overallmark)

  }
  return percentage
}

const calculateOverallMark = function (percentages){
  //total all weighted percentages
  let total = 0
  for (percent of percentages){
    total += percent
  }
  return total * 100
}


const finalGradeHelper = function(course){
  const percentagesArray = arrayOfPercentages(course)
  let finalMark = calculateOverallMark(percentagesArray);
  return `<h4>Final Mark: ${finalMark.toPrecision(2)}</h4>  `

}

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
  ${finalGradeHelper(course)}

  </tbody>
  </table>
  `
}
