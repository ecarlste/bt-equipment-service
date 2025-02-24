#!/usr/bin/env bash

set -o pipefail

client_id=$1 # Client ID as first argument
pem_base64=$2 # Base64-encoded private key as second argument

# Decode private key
pem=$(echo "$pem_base64" | base64 -d)

now=$(date +%s)
iat=$((${now} - 60))  # Issued 60 seconds in the past
exp=$((${now} + 600)) # Expires 10 minutes in the future

b64enc() { openssl base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n'; }

header_json='{
    "typ":"JWT",
    "alg":"RS256"
}'
header=$(echo -n "${header_json}" | b64enc)

payload_json="{
    \"iat\":${iat},
    \"exp\":${exp},
    \"iss\":\"${client_id}\"
}"
payload=$(echo -n "${payload_json}" | b64enc)

header_payload="${header}"."${payload}"
signature=$(
    openssl dgst -sha256 -sign <(echo -n "${pem}") \
    <(echo -n "${header_payload}") | b64enc
)

JWT="${header_payload}"."${signature}"
printf '%s\n' "$JWT"
