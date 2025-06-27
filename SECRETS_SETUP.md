# GitHub Secrets Setup (Production Use)

For production deployment, replace the hardcoded credentials in ci.yml with GitHub secrets:

## Required Secrets

Go to Repository → Settings → Secrets and variables → Actions

Add these secrets:

- `TEST_USER_EMAIL` - Your test account email
- `TEST_USER_PASSWORD` - Your test account password  
- `TEST_USER_NAME` - Test User
- `EXISTING_USER_EMAIL` - An existing user email for negative tests
- `EXISTING_USER_PASSWORD` - Password for existing user

## Update ci.yml

Replace the hardcoded values with:

```yaml
env:
  CYPRESS_baseUrl: https://povio-at.herokuapp.com
  CYPRESS_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
  CYPRESS_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
  CYPRESS_TEST_USER_NAME: ${{ secrets.TEST_USER_NAME }}
  CYPRESS_EXISTING_USER_EMAIL: ${{ secrets.EXISTING_USER_EMAIL }}
  CYPRESS_EXISTING_USER_PASSWORD: ${{ secrets.EXISTING_USER_PASSWORD }}
  # ... rest of the env vars
```

## Note

Current ci.yml uses demo credentials for assignment evaluation.
In real projects, always use GitHub secrets for sensitive data.
