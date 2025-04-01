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
    outputPop.value = 'Intakes and outcomes must not be zero.';
  } 
  else {
    outputPop.value = Math.round((outcomes / intakes) * 100) + '%';
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
    outputRate.value = 'Intakes and outcomes must not be zero.';
  } 
  else if (adoptions > outcomes) {
    outputRate.value = 'Adoptions cannot be larger than total outcomes.';
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
    outputOtherlive.value = 'Adoptions cannot be larger than all outcomes.';
  } 
  else if (adoptions + nonlive > outcomes) {
    outputOtherlive.value = 'Adoptions + Non-live outcomes cannot be larger than all outcomes.';
  } 
  else {
    outputOtherlive.value = outcomes - adoptions - nonlive + '';
  }
}


function adoptCalc() {
  // master function used to perform the calculation 
  // get selected values based on user input
  var region = document.getElementById('input-Region').value;
  var intakes = parseFloat(document.getElementById('input-Intakes').value);
  var newintakes = parseFloat(document.getElementById('input-Newintakes').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var pop = parseFloat(document.getElementById('output-Pop').value);
  var otherlive = parseFloat(document.getElementById('output-Otherlive').value);
  var nonlive = parseFloat(document.getElementById('input-Nonlive').value);

  // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
  var calculatedValue100 = newintakes - Math.round(newintakes * otherlive/outcomes) - Math.round(newintakes * nonlive/outcomes);
  // value to make up for previous imbalance - adding the previous non-outcomes
  var calculatedValuePop =  calculatedValue100 + Math.round((100-pop)/100*intakes);
  if (pop >= 100){
    calculatedValuePop = calculatedValue100;
  }
  //console.log('svi, region, orgtype, perc_stray, intake_size', '\nvalues: ',svi, region, orgtype, perc_stray, intake_size, '\ncoefs: ', sviCoef, regionCoef, orgCoef, percstrayCoef, intakeCoef);
  //console.log('calc value', calculatedValue)

  // update output with the rate
  document.getElementById('output-Prediction').value = calculatedValue100 + ' adoptions';	
  document.getElementById('output-PredictionPop').value = calculatedValuePop + ' adoptions';	
  
  // show result text
  document.getElementById('output-Text').style.display = "block"; 

}


function staffHours() {
  // dynamically displays the staff hours estimated
  var visitors = parseFloat(document.getElementById('input-Visitors').value);
  var visitorsTotal = parseFloat(document.getElementById('input-VisitorsTotal').value);
  var duration = document.getElementById('output-Duration').value;
  var percStaff = document.getElementById('output-PercStaff').value;
  var outputHours = document.getElementById('output-Hours');

  // if visitors is left empty, use 33% of total visitors
  if ((visitors == "" || isNaN(visitors)) & (visitorsTotal != "" & !isNaN(visitorsTotal))){
    visitors = Math.round(visitorsTotal*0.33);
  }
  // default values for duration and percent of staff time
  if (duration=="" || isNaN(duration)){
    duration = 60;
  } 
  else {
    duration = parseFloat(duration);
  }  
  if (percStaff == ""){
    percStaff = "30%";
  }
  // add % if input is just a number
  if (percStaff != "" & percStaff.charAt(percStaff.length-1) != "%"){
    percStaff = percStaff + '%'
  }
  
  // console.log("visitors: ",visitors, "visitorsTotal: ", visitorsTotal, "duration: ", duration, "percStaff: ", percStaff);

  // if either of the values is missing, no value. Otherwise, present pop balance as %
  if (isNaN(visitors) & isNaN(visitorsTotal)) {
    outputHours.value = null;
  }
  else if (visitors==0) {
    outputHours.value = 'Visitors must not be zero.';
  } 
  else {
    outputHours.value = visitors * Math.round(duration/60) * (parseFloat(percStaff.slice(0,-1))/100);
  }
}

function hoursCalc() {
  // master function used to perform the calculation 
  // get selected values based on user input
  var hours = parseFloat(document.getElementById('output-Hours').value);

  // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
  var calculatedValue = Math.round(hours/6.5);
  // value to make up for previous imbalance - adding the previous non-outcomes

  //console.log('svi, region, orgtype, perc_stray, intake_size', '\nvalues: ',svi, region, orgtype, perc_stray, intake_size, '\ncoefs: ', sviCoef, regionCoef, orgCoef, percstrayCoef, intakeCoef);
  //console.log('calc value', calculatedValue)

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
  const durationInput = document.getElementById('output-Duration'); 
  const percstaffInput = document.getElementById('output-PercStaff'); 
  const outputText2 = document.getElementById('output-Text2'); 

 
  // event listeners for change in total or stray pets to change their values
  intakeInput.addEventListener('change', () => {
    popBalance();
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
    staffHours();
  });
  visitorsTotalInput.addEventListener('change', () => {
    staffHours();
  });
  durationInput.addEventListener('change', () => {
    staffHours();
  });
  percstaffInput.addEventListener('change', () => {
    staffHours();
  });
  // turn result text off - it is shown when the Calculate button is clicked
  outputText.style.display = "none";
  outputText2.style.display = "none";
});


