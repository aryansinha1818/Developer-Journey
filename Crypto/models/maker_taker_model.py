# models/maker_taker_model.py
from sklearn.linear_model import LogisticRegression
import numpy as np

# Dummy training data
X = np.array([[50, 0.1], [100, 0.3], [200, 0.8], [300, 1.2]])
y = np.array([0, 0, 1, 1])  # 0 = Maker, 1 = Taker

clf = LogisticRegression()
clf.fit(X, y)

def predict_maker_taker(quantity_usd: float, slippage: float) -> str:
    pred = clf.predict(np.array([[quantity_usd, slippage]]))[0]
    return "Taker" if pred == 1 else "Maker"
