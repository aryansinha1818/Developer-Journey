# utils/net_cost.py
def compute_net_cost(slippage: float, fee: float, market_impact: float) -> float:
    return round(slippage + fee + market_impact, 4)
