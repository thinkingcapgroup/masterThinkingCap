
function BiasDistribution(mean, stdDeviation){
    this.mean = mean;
    this.stdDeviation = stdDeviation;
    if(this.stdDeviation < 0) this.stdDeviation = 0;
}

function StudentType(name, id, type, medical, budget, tuition, functions){
  this.name = name;
  this.id = id;
  this.type = type;
  this.medical = medical;
  this.budget = budget;
  this.tuition = tuition;
  this.functions = functions;
}

function getBiasValue(bias, property, defaults, presets){
  //Check if the value is a string aka either a default or a preset
  if(typeof(bias[property]) == "string" ){

    //If shortcuts were passed in and the value isn't "default"
    //get that shortcut value from the list
    if(presets && bias[property] != "default"){
      return presets[bias[property]];
    }

    //otherwise, return the default value
    //Even if the value wasn't actually "default", returning the default is the best solution
    return defaults[property];
  }

  //If it's a normal number, just return that
  return bias[property];
}

function generateStudentBiases(){
  let json;
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e){
      json = JSON.parse(this.responseText);

      let defaults = json.biasDefaults;
      let meanOfMeanPresets = json.meanOfMeanPresets;
      let deviationOfMeanPresets = json.deviationOfMeanPresets;
      let meanOfDeviationPresets = json.meanOfDeviationPresets;

      let studentTypes = json.studentTypes;

      for(let i = 0; i < studentTypes.length; i++){
        let name = studentTypes[i].name;
        let id = studentTypes[i].id;
        let type = studentTypes[i].type;


        let studentBiases = {};
        let biasValues = studentTypes[i].biases;

        for(let j = 0; j < biasValues.length; j++){
          let issue = biasValues[j].issue;
          let meanOfMean = getBiasValue(biasValues[j], "meanOfMean", defaults, meanOfMeanPresets);
          let deviationOfMean = getBiasValue(biasValues[j], "deviationOfMean", defaults, deviationOfMeanPresets);
          let meanOfDeviation = getBiasValue(biasValues[j], "meanOfDeviation", defaults, meanOfDeviationPresets);
          let deviationOfDeviation = getBiasValue(biasValues[j], "deviationOfDeviation", defaults);

          let biasMean = normalDistribution(meanOfMean, deviationOfMean);
          let biasDeviation = normalDistribution(meanOfDeviation, deviationOfDeviation);
          studentBiases[issue] = new BiasDistribution(biasMean, biasDeviation);
        }
        globals.studentTypes[id] = new StudentType(name, id, type, studentBiases["medical"], studentBiases["budget"], studentBiases["tuition"], studentBiases["functions"]);

      }

      console.log(globals.studentTypes);
  }


  oReq.open("get", "json/studentTypes.json", true);
  oReq.send();
}
