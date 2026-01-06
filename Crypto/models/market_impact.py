

def estimate_market_impact(quantity_usd: float, volatility: float, liquidity: float) -> float:
    """
    Simplified Almgren-Chriss inspired formula:
    market_impact = volatility * (quantity / liquidity)^0.5
    """
    if liquidity == 0:
        return 0.0  # Avoid division by zero

    impact = volatility * ((quantity_usd / liquidity) ** 0.5)
    return round(impact, 4)
