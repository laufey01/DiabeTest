import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Prediction = () => {
  const [userInput, setUserInput] = useState({
    Age: "",
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    Insulin: "",
    BMI: "",
    SkinThickness: "",
    DPF: "",
    HrsSleep: "",
    Cholesterol: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currentTooltip, setCurrentTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Normal ranges for each parameter
  const normalRanges = {
    Age: "Normal range: Any age can be affected, but risk increases after 45 years",
    Pregnancies: "Normal range: 0-5 (for women), but higher numbers may indicate increased risk",
    Glucose: "Normal range: 70-99 mg/dL (fasting), <140 mg/dL (2 hours after eating)",
    BloodPressure: "Normal range: <80 mmHg (diastolic, optimal), 80-89 mmHg (elevated/hypertension)",
    Insulin: "Normal range: 2-25 μU/mL (fasting)",
    BMI: "Normal range: 18.5-24.9 (healthy weight), 25-29.9 (overweight), 30+ (obese)",
    SkinThickness: "Normal range: 10-40 mm (varies by age, gender, and body composition)",
    DPF: "Higher values indicate stronger family history of diabetes",
    HrsSleep: "Normal range: 7-9 hours per night for adults",
    Cholesterol: "Normal range: <200 mg/dL (desirable), 200-239 mg/dL (borderline high), 240+ mg/dL (high)"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const allFieldsFilled = Object.values(userInput).every(
      (value) => value !== ""
    );
    
    if (!allFieldsFilled) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://diabetest.onrender.com/predict",
        userInput
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error:", error);
      setPrediction({ 
        prediction: "An error occurred. Please try again.", 
        probability: "",
        donut_chart: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and empty string, no + or - signs
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUserInput({ ...userInput, [e.target.name]: value });
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setHeight(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    }
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setUserInput({ ...userInput, BMI: bmiValue });
      setShowBMICalculator(false);
    }
  };

  const handleFocus = (e, fieldName) => {
    setCurrentTooltip(normalRanges[fieldName]);
    const inputRect = e.target.getBoundingClientRect();
    setTooltipPosition({
      x: inputRect.left + window.scrollX,
      y: inputRect.top + window.scrollY - 10
    });
  };

  const handleBlur = () => {
    setCurrentTooltip("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200 flex flex-col items-center justify-center pb-3 md:pb-0 relative">
      {/* Error Popup */}
      {showErrorPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
        >
          Please fill in all fields before submitting.
        </motion.div>
      )}

      {/* Normal Range Tooltip */}
      {currentTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateY(-100%)',
          }}
          className="bg-white text-gray-800 px-3 py-2 rounded-md shadow-lg z-50 max-w-xs text-sm border border-gray-200"
        >
          {currentTooltip}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 
            border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"
          ></div>
        </motion.div>
      )}

      {/* BMI Calculator Modal */}
      {showBMICalculator && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ borderRadius: '10px' }}
            className="bg-white w-full max-w-md p-6 shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">BMI Calculator</h2>
              <button 
                onClick={() => setShowBMICalculator(false)}
                style={{ borderRadius: '10px' }}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  min="0"
                  style={{ borderRadius: '10px' }}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter height in cm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                  min="0"
                  style={{ borderRadius: '10px' }}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight in kg"
                />
              </div>
              
              <button
                onClick={calculateBMI}
                style={{ borderRadius: '10px' }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 transition duration-200 shadow-md"
              >
                Calculate BMI
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 sm:p-6 md:p-8 w-full sm:w-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Enter Parameter
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Age</label>
                  <input
                    type="number"
                    name="Age"
                    value={userInput.Age}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "Age")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Pregnancies</label>
                  <input
                    type="number"
                    name="Pregnancies"
                    value={userInput.Pregnancies}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "Pregnancies")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Glucose</label>
                  <input
                    type="number"
                    name="Glucose"
                    value={userInput.Glucose}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "Glucose")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Blood Pressure</label>
                  <input
                    type="number"
                    name="BloodPressure"
                    value={userInput.BloodPressure}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "BloodPressure")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Cholesterol</label>
                  <input
                    type="number"
                    name="Cholesterol"
                    value={userInput.Cholesterol}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "Cholesterol")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Insulin</label>
                  <input
                    type="number"
                    name="Insulin"
                    value={userInput.Insulin}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "Insulin")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">BMI</label>
                  <input
                    type="number"
                    name="BMI"
                    value={userInput.BMI}
                    onChange={handleChange}
                    onClick={() => setShowBMICalculator(true)}
                    onFocus={(e) => handleFocus(e, "BMI")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    required
                    readOnly
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Skin Thickness</label>
                  <input
                    type="number"
                    name="SkinThickness"
                    value={userInput.SkinThickness}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "SkinThickness")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">DPF</label>
                  <input
                    type="number"
                    name="DPF"
                    value={userInput.DPF}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "DPF")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    step="0.001"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-bold mb-2">Hours of Sleep</label>
                  <input
                    type="number"
                    name="HrsSleep"
                    value={userInput.HrsSleep}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e, "HrsSleep")}
                    onBlur={handleBlur}
                    min="0"
                    onKeyDown={(e) => {
                      if (['+', '-', 'e', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Predict"
                )}
              </button>
            </div>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="w-full sm:w-auto mx-auto mt-8 sm:mt-0 sm:ml-8"
        >
          {!prediction && !isLoading && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                About the Parameters
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Age:</strong> The age of the patient. Age is a risk factor because the likelihood of developing diabetes increases as you get older.</li>
                <li><strong>Pregnancies:</strong> The number of times the patient has been pregnant. Pregnancy can affect insulin sensitivity, and a higher number of pregnancies might indicate a higher risk of developing diabetes.</li>
                <li><strong>Glucose:</strong> Plasma glucose concentration after a 2-hour oral glucose tolerance test. High glucose levels are a primary indicator of diabetes.</li>
                <li><strong>Blood Pressure:</strong> Diastolic blood pressure (mm Hg). High blood pressure is associated with an increased risk of diabetes and its complications.</li>
                <li><strong>Insulin:</strong> 2-Hour serum insulin (mu U/ml). Abnormal insulin levels can be a sign of insulin resistance, a condition often associated with diabetes.</li>
                <li><strong>BMI:</strong> Body Mass Index (weight in kg/(height in cm/100)^2). Higher BMI values indicate obesity, which is a major risk factor for diabetes.</li>
                <li><strong>Skin Thickness:</strong> Triceps skin fold thickness (mm). This measure can indicate body fat distribution, which is related to diabetes risk.</li>
                <li><strong>DPF:</strong> Diabetes Pedigree Function. This function estimates the genetic impact on diabetes by considering family history, helping to understand hereditary risk.</li>
                <li><strong>Cholesterol:</strong> The cholesterol level of the patient. High cholesterol levels are associated with an increased risk of diabetes and cardiovascular complications.</li>
                <li><strong>Hours of Sleep:</strong> The average number of hours the patient sleeps per day. Poor sleep patterns can contribute to insulin resistance and increase the risk of diabetes.</li>
              </ul>
            </div>
          )}
          {isLoading && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl flex items-center justify-center h-64">
              <div className="text-center">
                <svg
                  className="animate-spin mx-auto h-12 w-12 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="mt-4 text-lg font-medium text-gray-700">
                  Analyzing your data...
                </p>
              </div>
            </div>
          )}
          {prediction && !isLoading && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Prediction Result</h2>
              <div className="flex flex-col items-center">
                <p className={`font-bold text-2xl mb-4 text-center ${
                  prediction.prediction.includes("high chances") 
                    ? "text-red-600" 
                    : "text-green-600"
                }`}>
                  {prediction.prediction || "No prediction available"}
                </p>
                
                {prediction.donut_chart && (
                  <div className="mb-6 w-64 h-64 flex items-center justify-center">
                    <img 
                      src={prediction.donut_chart} 
                      alt="Probability donut chart" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className={`h-4 rounded-full ${
                      prediction.probability > 50 
                        ? "bg-red-500" 
                        : "bg-green-500"
                    }`} 
                    style={{ width: `${prediction.probability}%` }}
                  ></div>
                </div>
                
                <p className="text-lg font-medium text-gray-700">
                  Probability: <span className="font-bold">{prediction.probability}%</span>
                </p>
                
                <div className="mt-6 text-center text-gray-700">
                  <p className="mb-2">
                    {prediction.prediction.includes("high chances") ? (
                      <>
                        <span className="font-semibold">Recommendation:</span> Please consult with a healthcare professional for further evaluation and guidance.
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">Recommendation:</span> Continue maintaining a healthy lifestyle with balanced diet and regular exercise.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Prediction;
