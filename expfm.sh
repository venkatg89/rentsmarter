
#!/bin/zsh
cat expfm.sh 
export SSL_CERT_FILE=/usr/local/fanniemae/certs/zsbundle.pem
export REQUESTS_CA_BUNDLE=/usr/local/fanniemae/certs/zsbundle.pem
export https_proxy=http://127.0.0.1:9000
export http_proxy=http://127.0.0.1:9000

yarn config set httpProxy http://127.0.0.1:9000
yarn config set httpsProxy http://127.0.0.1:9000

yarn config set strict-ssl false
yarn config set cafile /usr/local/fanniemae/certs/ZscalerRootCA.cer


yarn --version
