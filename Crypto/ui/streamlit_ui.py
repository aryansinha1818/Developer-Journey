# streamlit_ui.py
import streamlit as st
import time
from data.websocket_client import start_websocket
from models.slippage_model import estimate_slippage
from utils.fee_calculator import calculate_fee
from models.market_impact import estimate_market_impact
from models.maker_taker_model import predict_maker_taker
from utils.net_cost import compute_net_cost
from data.performance import measure_latency
import asyncio

def main():
    st.set_page_config(layout="wide")
    st.title("💹 Crypto Trade Simulator")

    # UI layout
    col1, col2 = st.columns(2)

    # -------- LEFT PANEL (Inputs) --------
    with col1:
        st.header("🛠 Input Parameters")
        asset = st.selectbox("Spot Asset", ["BTC-USDT-SWAP"])
        quantity_usd = st.number_input("Order Quantity ($)", min_value=10.0, value=100.0)
        fee_tier = st.selectbox("Fee Tier", ["Tier 1", "Tier 2", "Tier 3"])
        volatility = st.slider("Volatility (%)", min_value=0.1, max_value=2.0, value=0.5, step=0.1)
        liquidity = st.slider("Liquidity Depth ($)", min_value=10000.0, max_value=100000.0, value=50000.0, step=5000.0)
        start_stream = st.button("Start WebSocket")

    # -------- RIGHT PANEL (Outputs) --------
    with col2:
        st.header("📊 Output Metrics")
        latency_display = st.empty()
        slippage_display = st.empty()
        fee_display = st.empty()
        impact_display = st.empty()
        net_cost_display = st.empty()
        maker_taker_display = st.empty()

    # ---------- CALLBACK FUNCTION ----------
    def process_tick():
        latency = measure_latency()
        slippage = estimate_slippage(quantity_usd, volatility)
        fee = calculate_fee(quantity_usd, fee_tier)
        impact = estimate_market_impact(quantity_usd, volatility, liquidity)
        net_cost = compute_net_cost(slippage, fee, impact)
        maker_taker = predict_maker_taker(quantity_usd, slippage)

        latency_display.metric("⏱️ Tick Latency", f"{latency:.4f} sec")
        slippage_display.metric("📉 Estimated Slippage", f"${slippage:.2f}")
        fee_display.metric("💸 Estimated Fee", f"${fee:.2f}")
        impact_display.metric("⚡ Market Impact", f"${impact:.2f}")
        net_cost_display.metric("🧮 Net Cost", f"${net_cost:.2f}")
        maker_taker_display.metric("🔀 Type", maker_taker)

    # ---------- Start WebSocket ----------
    if start_stream:
        asyncio.run(start_websocket(process_tick))

if __name__ == "__main__":
    main()