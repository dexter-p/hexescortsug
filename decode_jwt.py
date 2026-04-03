import base64
import json

part = "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaW9zZGtveGNpbWxvdmV3cm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDYyNjYsImV4cCI6MjA4NTYyMjI2Nn0"
# Add padding if needed
padded = part + '=' * (4 - len(part) % 4)
decoded = base64.b64decode(padded).decode('utf-8')
print(decoded)
