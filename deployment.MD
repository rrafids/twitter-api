Setup CI/CD

1. Generate Private & Public Key lewat local device
   `ssh-keygen -t rsa -f ~/.ssh/key_actions -C root`

2. Get private key value
   `cat  ~/.ssh/key_actions`

3. Get public key value
   `cat  ~/.ssh/key_actions.pub`

4. Store private key to github repo secrets
   settings -> secrets & variables -> actions -> create secret

5. Store public key to gcp vm
   compute engine -> metadata -> keys -> add new key

6. Delete metadata os login
   compute engine -> metadata -> metadata -> delete all metadata
