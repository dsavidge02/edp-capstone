import json
import random

# possible values for each field
prices = [1, 2, 3, 5, 8]
styles = ["classic", "pirate", "sports", "animal", "food"]
speeds = ["slow", "average", "fast", "mystery"]
conditions = ["new", "used"]
sizes = ["small", "medium", "large"]

# generate 1,000 JSON documents
documents = []
for duck in range(1000):
    #first 5 ducks generated are featured
    isFeatured = True if duck < 5 else False  

    document = {
        "duckDetails": {
            "price": random.choice(prices),
            "size": random.choice(sizes),
            "style": random.choice(styles),
            "speed": random.choice(speeds),
            "condition": random.choice(conditions)
        },
        "additionalFeatures": {
            "buoyancy": bool(random.getrandbits(1)),
            "inStock": bool(random.getrandbits(1)),
            "isFeatured": isFeatured,
            "onSale": bool(random.getrandbits(1))
        }
    }

    product_name = ""
    for key, value in document["duckDetails"].items():
        if isinstance(value, str) and value:
            product_name += value[0].upper()
    
    document["productName"] = product_name

    documents.append(document)

json_data = json.dumps(documents, indent=4)

# save to 'ducks.json'
with open('ducks.json', 'w') as f:
    f.write(json_data)

print("1,000 JSON documents have been saved to 'ducks.json'.")

# mongoimport --uri mongodb://localhost:27017/duckStock --collection ducks --file ducks.json --jsonArray --drop