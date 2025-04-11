import pickle as pkl
import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

script_dir = os.path.dirname(os.path.abspath(__file__))
scaler_path = os.path.join(script_dir, 'scaler.pkl')
scaler = pkl.load(open(scaler_path, 'rb'))

file_path = os.path.join(script_dir, 'nb.pkl')
with open(file_path, 'rb') as f:
    model = pkl.load(f)

def predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age, HrsSleep, Cholesterol):
    input_data = pd.DataFrame([[Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age, HrsSleep, Cholesterol]])
    
    # Scale the input data
    scaled_data = scaler.transform(input_data)
  
    # Get prediction and probabilities
    prediction = model.predict(scaled_data)[0]
    probabilities = model.predict_proba(scaled_data)
    prob_percent = round(probabilities[0][1] * 100, 2)

    if prediction == 1:
        result = {
            'prediction': "You have high chances of Diabetes!",
            'probability': prob_percent
        }
    else:
        result = {
            'prediction': "You have low chances of Diabetes.",
            'probability': prob_percent
        }
    
    return result

@app.route('/predict', methods=['POST'])
def predictions():
    if request.method == 'POST':
        data = request.get_json()
        Age = data.get('Age')
        Pregnancies = data.get('Pregnancies')
        Glucose = data.get('Glucose')
        BloodPressure = data.get('BloodPressure')
        Insulin = data.get('Insulin')
        Bmi = data.get('BMI')
        SkinThickness = data.get('SkinThickness')
        Dpf = data.get('DPF')
        HrsSleep = data.get('HrsSleep')
        Cholesterol = data.get('Cholesterol')

        result = predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age, HrsSleep, Cholesterol)
        return jsonify(result)
    
    return "Invalid request method"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)