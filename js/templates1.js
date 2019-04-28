const assessmentTemplate = function(assessment) {
  return `
  <tr>
  <td>${assessment.name}</td>
  <td>${assessment.weight.toPrecision(2) * 100} + '%' </td>
  <td>${assessment.mark}</td>
  </tr>
  `
}

const calculateGradeHelper = function(grade){
  return `<table><tr><td><tbody>${calculateGrade(grade)}</tbody></td></tr></table>`
}

//comment could be cleaned up and changed two switch staement or ternary instead of nested if/else's
const calculateGrade = function(grade){
  if (grade >= 0 && grade <= 09){
    return `${grade} <span class="label label-danger ">H</span>`
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
    return `${grade} <span class="label label-success"">A</span>`
  }
}

// 2. Display the topics per course
const assessmentTemplateHelper = function(course){
  let result = ''
  if (course.assessments.length === 0) {
    return  `<tr colspan="100%"><td>No assessments found.</td></tr></tabel>`;
  }
  for (let assess of course.assessments){
    courses += course.readingList
    result += assessmentTemplate(assess)
  }
  return result;
}


//template helper function for readinglist
const courseAndReadingListTemplate = function(course) {
  return `
  <h4>Reading List</h4>
  <div class="reading-list-wrapper">
  ${compareDueDates(course)}
  ${readingListTemplateHelper(course)}
  </div>
  `
}
//  loop over the readinglist items
const readingListTemplateHelper = function(course){
  let output = '';
  if ( course.readingList.length ===0 )
  return `<tr ><td><b>No Readinglist Found</b></td></tr>`;
  for (let value of course.readingList){
    if (value.image === null){
      value.image = '404.png';
    }
    output += readingListTemplate(value);
  }
  return output
}

//render reading list items and values with toggle button
const readingListTemplate = function(read) {

  return `

  <div id="display" class="reading-list-item panel " >
  <input type="text" value="Show more details">
  <div id="content">
  <p>${read.title}</p>
  <p>${read.author}</p>
  <p>Due Date:${read.dueDate}</p>
  <img class="book-thumbnail" src= "images/${read.image}" alt="images/404.png">
  </div>
  </div>
  ` ;
}

//4. Show grades based on the marks. Display weighting, course and mark
const arrayOfPercentages = function(course){
  let percentage = []
  for (index of course.assessments){
    let percentagemark = (index.mark / 100) //75
    let percentageweighting =  percentagemark * index.weight  //0.333
    let overallmark = percentageweighting//"0.63", "0.11", "0.06"]
    percentage.push(overallmark)

  }
  return percentage
}


const compareDueDates = function(course){
  let array = []
  let reading = course.readingList
  // sort by dueDate
  reading.sort(function(a, b) {
    let dateA = a.dueDate;
    let dateB = b.dueDate;
    console.log(dateA, dateB);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    // dates must be equal
    return 0;
  });
  array.push(reading)
};

const calculateOverallMark = function (percentages){
  //total all weighted percentages
  let total = 0
  for (percent of percentages){
    total += percent
  }
  return total * 100
}

//5. Calculate and display the overall course mark
const finalGradeHelper = function(course){
  const percentagesArray = arrayOfPercentages(course)
  let finalMark = calculateOverallMark(percentagesArray);
  return calculateGradeHelper(finalMark.toPrecision(2))
}

const courseTemplate = function(course) {
  return `
  ${courseAndReadingListTemplate(course)}
  <h3>${course.id}</br>
  ${course.name}</h3>
  <h4>${course.topics}</h4>
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
  <table>
  <th rowspan="2">
  <td><h2><div class="table-colour-wrapper">
  ${finalGradeHelper(course)}
  </div></h2></td>
  </tbody>

  </table>
  `
}
