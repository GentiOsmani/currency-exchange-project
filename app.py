from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('static/data/exchange_rates.csv')

@app.route('/')
def index():
    currencies = df['currency'].unique().tolist()
    return render_template('index.html', currencies=currencies)

@app.route('/exchange_rate', methods=['POST'])
def exchange_rate():
    try:
        currency1 = request.form['currency1']
        currency2 = request.form['currency2']

        currency_data1 = df[df['currency'] == currency1]
        currency_data1 = currency_data1.drop_duplicates(subset=['date'])
        data_currency1 = {
            'x': currency_data1['date'].tolist(),
            'y': currency_data1['value'].tolist(),
            'type': 'scatter',
            'mode': 'lines',
            'name': currency1,
            'line': {'color': 'blue'}
        }

        currency_data2 = df[df['currency'] == currency2]
        currency_data2 = currency_data2.drop_duplicates(subset=['date'])
        data_currency2 = {
            'x': currency_data2['date'].tolist(),
            'y': currency_data2['value'].tolist(),
            'type': 'scatter',
            'mode': 'lines',
            'name': currency2,
            'line': {'color': 'green'}
        }

        return jsonify(data_currency1=data_currency1, data_currency2=data_currency2)

    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while processing the request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
