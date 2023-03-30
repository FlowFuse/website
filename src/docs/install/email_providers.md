---
originalPath: install/email_providers.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
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
