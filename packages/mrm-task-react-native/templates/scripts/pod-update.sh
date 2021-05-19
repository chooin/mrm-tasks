#!/bin/bash

export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087
pod repo update aliyun --verbose
pod repo update master --verbose
pod repo update trunk --verbose
unset http_proxy https_proxy
cd ios
pod update --verbose --no-repo-update
cd -
npx pod-install
