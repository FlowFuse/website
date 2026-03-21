---
originalPath: install/email_providers.md
updated: 2026-03-20 16:15:00 +0000
version: 2.28.0
navTitle: Email configuration
meta:
   description: Explore YAML configurations for GMail and Office365 email setups in FlowFuse, including SMTP server settings and authentication.
   tags:
     - email
     - gmail
     - office365
     - smtp
     - configuration

---

## Example configuration for common email platforms

### GMail
```yaml
email:
  enabled: true
  debug: false
  smtp:
    host: smtp.gmail.com
    port: 465
    secure: true
    auth:
        user: [USER]@gmail.com
        pass: [PASSWORD]
```

Note: Gmail may require an app specific password to be created if you are using 2FA on the account you can set that up [here](https://security.google.com/settings/security/apppasswords)

### Office365
```yaml
email:
  enabled: true
  debug: false
  smtp:
    host: smtp.office365.com,
    secure: false
    tls:
      ciphers: "SSLv3",
      rejectUnauthorized: false
    auth:
      user: [USERNAME]
      pass: [PASSWORD]
```
