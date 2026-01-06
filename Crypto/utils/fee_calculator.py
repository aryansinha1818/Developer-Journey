# utils/fee_calculator.py

def get_fee_rate(fee_tier: str) -> float:
    """
    Fee tier logic based on OKX structure (example only).
    """
    tier_map = {
        "Tier 1": 0.0015,
        "Tier 2": 0.0010,
        "Tier 3": 0.0005
    }
    return tier_map.get(fee_tier, 0.0015)

def calculate_fee(quantity_usd: float, fee_tier: str) -> float:
    rate = get_fee_rate(fee_tier)
    return round(quantity_usd * rate, 4)
