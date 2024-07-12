from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

with open('knn_model.pkl', 'rb') as f:
    model = pickle.load(f)

df_encoded = pd.read_parquet('df_encoded.parquet')

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h1>K-Nearest Neighbors</h1>"

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)
    else:
        data=request.get_json(force=True)
        num_items = int(data['cart_size'])
        cart_indices = data['cart']
        all_recommendations = []
        for i in range(num_items):
            product_index = cart_indices[i]
            selected_product_features = df_encoded[df_encoded['productID'] == product_index]
            if selected_product_features.empty:
                return jsonify({'error': 'Product index not found'}), 400
            
            distances, indices = model.kneighbors(selected_product_features)
            recommended_product_indices = indices.flatten()
            recommended_product_indices = [int(idx) for idx in recommended_product_indices if idx not in cart_indices and idx not in all_recommendations]
            # print(recommended_product_indices)
            all_recommendations += recommended_product_indices
        output = {'recommended_indices': all_recommendations}

        return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)