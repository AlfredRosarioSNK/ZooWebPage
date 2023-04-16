import requests

api_url = 'https://api.api-ninjas.com/v1/animals?name={}'
response = requests.get(api_url, headers={'X-Api-Key': 'rQFVUenlLXpQGf0+o0kgtw==ciAdRxWMJyLN0WPx'})
print(response.json())
print(response.status_code)