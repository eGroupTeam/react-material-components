[![Build Status](https://travis-ci.org/eGroupAI/egroup-material.svg?branch=master)](https://travis-ci.org/eGroupAI/egroup-material)
[![CodeQL](https://github.com/eGroupAI/egroup-material/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/eGroupAI/egroup-material/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/eGroupAI/egroup-material/branch/master/graph/badge.svg)](https://codecov.io/gh/eGroupAI/egroup-material)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=eGroupAI/egroup-material)](https://dependabot.com)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/eGroupAI/egroup-material.svg)](http://isitmaintained.com/project/eGroupAI/egroup-material "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/eGroupAI/egroup-material.svg)](http://isitmaintained.com/project/eGroupAI/egroup-material "Percentage of issues still open")

[Doc](https://egroupai.github.io/egroup-material)

You'll need create self signed certificate for develop. 

Use openssl

```sh
mkdir certificate && cd certificate
openssl req -x509 -out certificate.crt -keyout privateKey.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Fields answer

1. TW
2. Taiwan
3. Taipei
4. eGroupAI
5. IT
6. LI-YANXIN
7. abrcdf1023@gmail.com
