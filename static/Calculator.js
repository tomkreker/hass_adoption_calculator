function popBalance() {
  // dynamically displays the value of percentage of stray intakes of total intakes in Derived Values
  var intakes = parseFloat(document.getElementById('input-Intakes').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var outputPop = document.getElementById('output-Pop');

  // if either of the values is missing, no value. Otherwise, present pop balance as %
  if (isNaN(intakes) || isNaN(outcomes)) {
    outputPop.value = null;
  }
  else if (intakes==0 || outcomes==0) {
    outputPop.value = 'Intakes & outcomes cannot be zero.';
  } 
  else {
    outputPop.value = Math.round((outcomes / intakes) * 100) + '%';
  }
}

function newIntakeNumber() {
  // sets the new intake as the 2024 intake whenever the latter is changed
  var intakes = parseFloat(document.getElementById('input-Intakes').value);
  var outputIntakes = document.getElementById('input-Newintakes');

  // if either of the values is missing, no value. Otherwise, present pop balance as %
  if (!isNaN(intakes) & intakes!=0) {
    outputIntakes.value = intakes; 
  }
}

function adoptionRate() {
  // dynamically displays the adoption rate in Derived Values
  var adoptions = parseFloat(document.getElementById('input-Adoptions').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var outputRate = document.getElementById('output-Rate');

// rule out empty input or values that make no sense 
if (isNaN(adoptions) || isNaN(outcomes)) {
    outputRate.value = null;
  }
  else if (adoptions==0 || outcomes==0) {
    outputRate.value = 'Intakes & outcomes cannot be zero';
  } 
  else if (adoptions > outcomes) {
    outputRate.value = 'Adoptions cannot be more than outcomes';
  } 
  else {
    outputRate.value = Math.round((adoptions / outcomes) * 100) + '%';
  }
}

function otherLive() {
  // dynamically displays the total non-adoption live outcomes
  var adoptions = parseFloat(document.getElementById('input-Adoptions').value);
  var nonlive = parseFloat(document.getElementById('input-Nonlive').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var outputOtherlive = document.getElementById('output-Otherlive');

  // if either of the values is missing, no value. Otherwise, present pop balance as %
  if (isNaN(adoptions) || isNaN(outcomes) || isNaN(nonlive)) {
    outputOtherlive.value = null;
  }
  else if (adoptions > outcomes) {
    outputOtherlive.value = 'Adoptions cannot be more than outcomes.';
  } 
  else if (adoptions + nonlive > outcomes) {
    outputOtherlive.value = 'Other live outcomes cannot be zero.';
  } 
  else {
    outputOtherlive.value = outcomes - adoptions - nonlive + '';
  }
}

function adjustNewIntakes(percent) {
  // adds percent difference to the new intakes
  const input = document.getElementById('input-Newintakes');
  const error = document.getElementById('error-Newintakes');
  const value = parseFloat(input.value);

  if (isNaN(value) || value <= 0) {
      error.textContent = 'Enter a positive number before adjusting.';
      return;
  }

  error.textContent = '';

  const adjustedValue = value * (1 + percent / 100);
  input.value = Math.round(adjustedValue); 
}

function resetNewIntakes() {
  // resets the new intakes field to the value of the current intakes
  const input = document.getElementById('input-Newintakes');
  const intakes = parseFloat(document.getElementById('input-Intakes').value);
  const error = document.getElementById('error-Newintakes');

  if (isNaN(intakes)){
    input.value = '';
  }
  else {
    input.value = intakes;
  }
  error.textContent = '';
}

function adoptCalc() {
  // master function used to perform the calculation  of part 1
  // get selected values based on user input
  //var region = document.getElementById('input-Region').value;
  var intakes = parseFloat(document.getElementById('input-Intakes').value);
  var newintakes = parseFloat(document.getElementById('input-Newintakes').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var adoptions = parseFloat(document.getElementById('input-Adoptions').value);
  var pop = parseFloat(document.getElementById('output-Pop').value);
  var otherlive = parseFloat(document.getElementById('output-Otherlive').value);
  var nonlive = parseFloat(document.getElementById('input-Nonlive').value);

  // Get error elements
  const intakeError = document.getElementById('error-Intakes');
  const outcomeError = document.getElementById('error-Outcomes');
  const adoptionsError = document.getElementById('error-Adoptions');
  const nonliveError = document.getElementById('error-Nonlive');
  const newintakesError = document.getElementById('error-Newintakes');

  // Clear previous errors - stopped here, cont all other errors
  intakeError.textContent = '';
  outcomeError.textContent = '';
  adoptionsError.textContent = '';
  nonliveError.textContent = '';
  newintakesError.textContent = '';

  // Validate input
  let isValid = true;

  if (isNaN(intakes) || intakes === 0) {
      intakeError.textContent = 'Intakes cannot be empty or zero';
      isValid = false;
  }
  if (isNaN(outcomes) || outcomes === 0) {
      outcomeError.textContent = 'Outcomes cannot be empty or zero';
      isValid = false;
  }
  if (isNaN(otherlive) || (adoptions + nonlive > outcomes)) {
      outcomeError.textContent = 'Adoptions + Non-live outcomes cannot be more than total outcomes.';
      isValid = false;
  }
  if (isNaN(adoptions) || adoptions === 0) {
      adoptionsError.textContent = 'Adoptions cannot be empty or zero';
      isValid = false;
  }
  if (adoptions > outcomes) {
      adoptionsError.textContent = 'Adoptions cannot be more than outcomes';
      isValid = false;
  }
  if (isNaN(nonlive) || nonlive === 0) {
      nonliveError.textContent = 'Non-live outcomes cannot be empty or zero';
      isValid = false;
  }
  if (nonlive > outcomes) {
      nonliveError.textContent = 'Non-live outcomes cannot be more than outcomes';
      isValid = false;
  }
  if (isNaN(newintakes) || newintakes === 0) {
    nonliveError.textContent = 'Intakes for calculation cannot be empty or zero';
    isValid = false;
  }

  // Stop calculation if validation fails
  if (!isValid) return;

  else {
    // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
    var calculatedValue100 = newintakes - Math.round(newintakes * otherlive/outcomes) - Math.round(newintakes * nonlive/outcomes);
    // value to make up for previous imbalance - adding the previous non-outcomes
    var calculatedValuePop =  calculatedValue100 + Math.round((100-pop)/100*intakes);
    if (pop >= 100){
      calculatedValuePop = calculatedValue100;
    }

    // update output with the rate
    document.getElementById('output-Prediction').value = calculatedValue100 + ' adoptions';	
    document.getElementById('output-PredictionPop').value = calculatedValuePop + ' adoptions';	
    
    // show result text 
    document.getElementById('output-Text').style.display = "block"; 
  }
}


// part 2





function visitorsUsed() {
  // dynamically displays the number of visitors to be used
  var visitors = parseFloat(document.getElementById('input-Visitors').value);
  var visitorsTotal = parseFloat(document.getElementById('input-VisitorsTotal').value);
  var adoptionsGoal = parseFloat(document.getElementById('input-AdoptionsWeekly').value);
  var conversionRate = document.getElementById('output-ConversionRate').value;
  var outputVisitorsValue = document.getElementById('output-Visitors');

  var outputVisitors = null;

  // if visitors is left empty but total visitors is provided, use 33% of total visitors
  if ((visitors != "" & !isNaN(visitors))){
    // by default use option 1
    outputVisitors = visitors;
  }
  else if (visitorsTotal != "" & !isNaN(visitorsTotal)){
    // option 2
    outputVisitors = Math.round(visitorsTotal*0.33);
  }
  else if (adoptionsGoal!="" & !isNaN(adoptionsGoal)){
  // option 3 -  estimate visitors using the converstion rate
  //// first ensure conversion rate is 30% by default or a valid percent
    if (conversionRate == ""){
      conversionRate = "30%";
    }
    //// add % if input is just a number
    if (conversionRate != "" & conversionRate.charAt(conversionRate.length-1) != "%"){
      conversionRate = conversionRate + '%'
    }
    // find daily visitors
    outputVisitors = adoptionsGoal / 7 * 100 / (parseFloat(conversionRate.slice(0,-1)))
  } 
  
  // set the value
  outputVisitorsValue.value = Math.round(outputVisitors);
}

function staffHours() {
  // dynamically displays the staff hours estimated
  var visitors = parseFloat(document.getElementById('output-Visitors').value);
  var duration = document.getElementById('output-Duration').value;
  var percStaff = document.getElementById('output-PercStaff').value;
  var outputHours = document.getElementById('output-Hours');

  // default values for duration and percent of staff time
  if (duration=="" || isNaN(duration)){
    duration = 60;
  } 
  else {
    duration = parseFloat(duration);
  }  
  if (percStaff == ""){
    percStaff = "50%";
  }
  // add % if input is just a number
  if (percStaff != "" & percStaff.charAt(percStaff.length-1) != "%"){
    percStaff = percStaff + '%'
  }
  
  // if either of the values is missing, no value. Otherwise, present pop balance as %
  if (isNaN(visitors) || visitors == "") {
    outputHours.value = 'Fill one of the three inputs.';
  }
  else if (visitors==0) {
    outputHours.value = 'Visitors must not be zero.';
  } 
  else {
    outputHours.value = Math.ceil(visitors * (duration/60) * (parseFloat(percStaff.slice(0,-1))/100));
  }
}

function hoursCalc() {
  // master function used to perform the calculation of part 2
  var visitors = parseFloat(document.getElementById('input-Visitors').value);
  var visitorsTotal = parseFloat(document.getElementById('input-VisitorsTotal').value);
  var adoptionsGoal = parseFloat(document.getElementById('input-AdoptionsWeekly').value);
  var conversionRate = document.getElementById('output-ConversionRate').value;
  var visitorsUsed = parseFloat(document.getElementById('output-Visitors').value);
  var duration = document.getElementById('output-Duration').value;
  var percStaff = document.getElementById('output-PercStaff').value;
  var outputHours = document.getElementById('output-Hours');

  // Get error elements
  const optionsError = document.getElementById('error-Options');

  // Clear previous errors - stopped here, cont all other errors
  optionsError.textContent = '';

  // Validate input
  let isValid = true;

  if (visitors===0 || visitorsTotal===0 || adoptionsGoal === 0) {
      optionsError.textContent = 'Unused option field should be cleared, not 0.';
      isValid = false;
  }
  if (isNaN(visitors) + isNaN(visitorsTotal) + isNaN(adoptionsGoal) != 2) {
      optionsError.textContent = 'Use only one input field and clear the rest (do not use 0).';
      isValid = false;
  }
  
  // Stop calculation if validation fails
  if (!isValid) return;

  // by this point the only value used is the staff hours estimate
  var hours = parseFloat(outputHours.value);

  // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
  var calculatedValue = Math.max(2,Math.ceil(hours/6.5));

  // update output with the rate
  document.getElementById('output-FTEs').value = calculatedValue + ' staff members';	
  
  // show result text
  document.getElementById('output-Text2').style.display = "block"; 

}

// define listening events to dynamically display dervied values
document.addEventListener('DOMContentLoaded', () => {
  const intakeInput = document.getElementById('input-Intakes'); 
  const outcomeInput = document.getElementById('input-Outcomes');
  const adoptionsInput = document.getElementById('input-Adoptions');
  const nonliveInput = document.getElementById('input-Nonlive');
  const outputText = document.getElementById('output-Text'); 
  // part 2
  const visitorsInput = document.getElementById('input-Visitors'); 
  const visitorsTotalInput = document.getElementById('input-VisitorsTotal'); 
  const adoptionsGoalInput = document.getElementById('input-AdoptionsWeekly'); 
  const conversionRateInput = document.getElementById('output-ConversionRate'); 
  const durationInput = document.getElementById('output-Duration'); 
  const percstaffInput = document.getElementById('output-PercStaff'); 
  const outputText2 = document.getElementById('output-Text2'); 

 
  // event listeners for change in total or stray pets to change their values
  intakeInput.addEventListener('change', () => {
    popBalance();
    newIntakeNumber();
  });
  adoptionsInput.addEventListener('change', () => {
    otherLive();
    adoptionRate();
  });
  nonliveInput.addEventListener('change', () => {
    otherLive();
  });
  outcomeInput.addEventListener('change', () => {
    popBalance();
    otherLive();
    adoptionRate();
  });
  // part 2
  visitorsInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  visitorsTotalInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  adoptionsGoalInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  conversionRateInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  durationInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  percstaffInput.addEventListener('change', () => {
    visitorsUsed();
    staffHours();
  });
  // turn result text off - it is shown when the Calculate button is clicked
  outputText.style.display = "none";
  outputText2.style.display = "none";
});


