# models/slippage_model.py
from sklearn.linear_model import LinearRegression
import numpy as np

# Dummy training data (you can improve this later with real-time data)
# Format: [quantity, volatility], slippage
X_train = np.array([
    [50, 0.2],
    [100, 0.5],
    [150, 0.7],
    [200, 1.0],
    [300, 1.5]
])
y_train = np.array([0.1, 0.3, 0.6, 0.9, 1.5])  # in dollars

model = LinearRegression()
model.fit(X_train, y_train)

def estimate_slippage(quantity_usd: float, volatility: float) -> float:
    """
    Estimate slippage using linear regression.
    """
    prediction = model.predict(np.array([[quantity_usd, volatility]]))
    return round(prediction[0], 4)
