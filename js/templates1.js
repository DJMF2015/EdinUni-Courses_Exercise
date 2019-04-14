const assessmentTemplate = function(assessment) {
  return `
  <tr>
  <td>${assessment.name}</td>
  <td>${assessment.weight.toPrecision(4) * 100} + '%' </td>
  <td>${assessment.mark}</td>
  </tr>
  `
}

const calculateGradeHelper = function(grade){
  return `<table><tr><td><tbody>${calculateGrade(grade)}</tbody></td></tr></table>`
}

const calculateGrade = function(grade){
  if (grade >= 0 && grade <= 09){
    return `${grade} <span class="label label-danger">H</span>`
  } else if (grade >= 10 && grade <= 19) {
    return `${grade} <span class="label label-danger">G</span>`
  } else if (grade >= 20 && grade <= 29) {
    return `${grade} <span class="label label-danger">F</span>`
  } else if (grade >= 30 && grade <= 39){
    return `${grade} <span class="label label-warning">E</span>`
  } else if (grade >= 40 && grade <= 49){
    return `${grade} <span class="label label-warning">D</span>`
  } else if (grade >= 50 && grade <= 59){
    return `${grade} <span class="label label-warning">C</span>`
  } else if (grade >= 60 && grade <= 69) {
    return `${grade} <span class="label label-success">B</span>`
  } else if (grade >=  70 && grade <= 100){
    return `${grade} <span class="label label-success">A</span>`
  }
}

// 2. Display the topics per course
const assessmentTemplateHelper = function(course){
  let result = ''
  if (course.assessments.length === 0) return
  `<tr colspan="100%"><td>No assessments found.</td></tr></tabel>`;
  for (let assess of course.assessments){
    courses += course.readingList
    result += assessmentTemplate(assess)
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

  return `

  <div class="reading-list-item">

  <p><b>${read.title}</b></p>
  <p> ${read.author}</p>
  <img class="book-thumbnail" src= "images/${read.image}" alt="images/404.png">
  <li> ${read.dueDate}</li>
  </div>
  <tr>
  ` ;
}


//4. Show grades based on the marks. Display weighting, course and mark
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


//still doesn't output on display
const compareDueDates = function(course){
  let array = []
  for (index of course.readingList){
    let date = index.dueDate
    let sorted = date
    array.push(date)
    let a =  array.sort()
    return a;
  }
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
  return calculateGradeHelper(finalMark.toPrecision(2))
}

//5. Calculate and display the overall course mark
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
  <th>Overall Mark</th>
  </thead>
  <tbody>
  ${assessmentTemplateHelper(course)}
  ${compareDueDates(course)}
  <table style="width:100%"> <th rowspan="2"><td><h3>${finalGradeHelper(course)}</h3></td></table>
  </tbody>
  </table>
  `
}
