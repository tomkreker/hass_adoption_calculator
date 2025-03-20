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
  var newintakes = parseFloat(document.getElementById('input-Newintakes').value);
  var outcomes = parseFloat(document.getElementById('input-Outcomes').value);
  var pop = parseFloat(document.getElementById('output-Pop').value);
  var otherlive = parseFloat(document.getElementById('output-Otherlive').value);
  var nonlive = parseFloat(document.getElementById('input-Nonlive').value);

  // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
  var calculatedValue100 = newintakes - Math.round(newintakes * otherlive/outcomes) - Math.round(newintakes * nonlive/outcomes);
  // value to hit 100% balance with new intake, assuming same % of other live and non-live outcomes
  var calculatedValuePop =  calculatedValue100 + Math.round((100-pop)/100*newintakes);
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

// define listening events to dynamically display dervied values
document.addEventListener('DOMContentLoaded', () => {
  const intakeInput = document.getElementById('input-Intakes'); 
  const outcomeInput = document.getElementById('input-Outcomes');
  const adoptionsInput = document.getElementById('input-Adoptions');
  const nonliveInput = document.getElementById('input-Nonlive');
  const outputText = document.getElementById('output-Text'); 
 
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
  // turn result text off - it is shown when the Calculate button is clicked
  outputText.style.display = "none";
});


