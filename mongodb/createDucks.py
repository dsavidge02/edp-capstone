import json
import random

#possible values for each field
prices = [1, 2, 3, 5, 8]
styles = ["classic", "pirate", "sports", "animal", "food"]
speeds = ["slow", "average", "fast", "mystery"]
conditions = ["new", "used"]
sizes = ["small", "medium", "large"]

#gen 1,000 JSON documents
documents = []
for _ in range(1000):
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
            "isFeatured": bool(0),
            "onSale": bool(0)
        }
    }
    documents.append(document)

json_data = json.dumps(documents, indent=4)

#save to 'ducks.json'
with open('ducks.json', 'w') as f:
    f.write(json_data)

print("1,000 JSON documents have been saved to 'ducks.json'.")