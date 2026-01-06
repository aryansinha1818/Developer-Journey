# import asyncio
# import websockets
# import json

# # OKX WebSocket endpoint
# WS_URL = "wss://ws.gomarket-cpp.goquant.io/ws/l2-orderbook/okx/BTC-USDT-SWAP"

# async def listen_to_order_book():
#     async with websockets.connect(WS_URL) as websocket:
#         print("✅ Connected to OKX WebSocket")

#         while True:
#             try:
#                 # Receive message
#                 message = await websocket.recv()
#                 data = json.loads(message)

#                 # Extract top 5 bids and asks
#                 bids = data.get("bids", [])[:5]
#                 asks = data.get("asks", [])[:5]

#                 print("\n📉 Top 5 Asks:")
#                 for price, quantity in asks:
#                     print(f"Price: {price}, Quantity: {quantity}")

#                 print("\n📈 Top 5 Bids:")
#                 for price, quantity in bids:
#                     print(f"Price: {price}, Quantity: {quantity}")

#             except Exception as e:
#                 print("❌ Error:", e)
#                 break

# # Run the async loop
# asyncio.run(listen_to_order_book())
# main.py
import asyncio
from data.websocket_client import start_websocket
from ui.streamlit_ui import main 

if __name__ == "__main__":
    # Start both the WebSocket and Streamlit UI
    main()