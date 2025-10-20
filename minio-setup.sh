#!/bin/bash

# Aguardar MinIO ficar pronto
echo 'Aguardando MinIO iniciar...'
sleep 15

# Configurar alias
mc alias set myminio http://minio:9000 minioadmin minioadmin

# Tentar conectar até conseguir
until mc ls myminio 2>/dev/null; do
  echo 'Aguardando MinIO ficar pronto...'
  sleep 5
done

# Criar bucket se não existir
if mc ls myminio/siv-bucket 2>/dev/null; then
  echo 'Bucket siv-bucket já existe.'
else
  echo 'Criando bucket siv-bucket...'
  mc mb myminio/siv-bucket
fi

# Permissões totais para intranet
echo 'Configurando permissões públicas...'
mc anonymous set download myminio/siv-bucket
mc anonymous set upload myminio/siv-bucket  
mc anonymous set public myminio/siv-bucket

# CORS máximo para webcam/upload
echo 'Configurando CORS...'
mc admin config set myminio api cors_allow_origin="*"
mc admin config set myminio api cors_allow_methods="GET,POST,PUT,DELETE,HEAD,OPTIONS"
mc admin config set myminio api cors_allow_headers="*"

echo 'Reiniciando MinIO...'
mc admin service restart myminio

# Aguardar reinício
sleep 10

echo 'Verificando configuração CORS...'
mc admin config get myminio api | grep cors || echo 'CORS não encontrado'

echo '✅ MinIO configurado com permissões totais para intranet'
