import requests as req
from ..config import settings


def send_telegram_message(chat_id: str, message: str) -> bool:
    """Telegram ga xabar yuborish"""
    if not settings.TELEGRAM_BOT_TOKEN or not chat_id:
        return False
    try:
        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        response = req.post(
            url,
            json={"chat_id": chat_id, "text": message, "parse_mode": "HTML"},
            timeout=10,
        )
        return response.status_code == 200
    except Exception as e:
        print(f"Telegram xatosi: {e}")
        return False
