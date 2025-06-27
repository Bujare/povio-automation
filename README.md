# Povio Test Automation

Cypress automation tests for Povio's internal assignment. Tests health checks, user registration, and campaign management with automatic cleanup and reporting.

## What This Does

Tests 3 main areas:
- **Health Check** - Makes sure the app works and loads properly
- **User Registration** - Tests signing up new users (valid and invalid cases)
- **Campaign Management** - Tests creating and editing campaigns
- **Auto Cleanup** - Cleans up test data after each test runs

## Test Details

**Health Check (4 tests)**
- App loads without errors
- Navigation links work
- No JavaScript console errors

**Registration (5 tests)** 
- Can register new user successfully
- Can't register with existing email
- Validates password matching
- Checks email format
- Requires all fields

**Campaigns (2 tests)**
- Create new campaign
- Edit existing campaign
- Each test is independent and cleans up after itself

## Quick Start

**Step 1: Get the code**
```bash
git clone <your-repo-url>
cd Povio-Automation
```

**Step 2: Install**
```bash
npm install
```

**Step 3: Setup your test account**
<<<<<<< HEAD
Create a `.env` file in the project folder with EXACTLY these names:
=======
Create a `.env` file in the project folder:
>>>>>>> 8a4f8341ce4f2b073b8e4a3a3aabfa9bf88f822e
```bash
CYPRESS_baseUrl=https://povio-at.herokuapp.com
CYPRESS_TEST_USER_EMAIL=bujare@gmail.com
CYPRESS_TEST_USER_PASSWORD=12345678
CYPRESS_EXISTING_USER_EMAIL=bujare@gmail.com
CYPRESS_EXISTING_USER_PASSWORD=12345678
CYPRESS_TEST_USER_NAME=Test User
CYPRESS_INVALID_EMAIL=invalid-email
CYPRESS_VALID_PASSWORD=SecurePass123
CYPRESS_MISMATCHED_PASSWORD=DifferentPass456
CYPRESS_CAMPAIGN_NAME=Test Campaign
CYPRESS_CAMPAIGN_DESCRIPTION=This is a test campaign for automation
```

<<<<<<< HEAD
**Important:** All variables MUST start with `CYPRESS_` prefix and match exactly as shown above.

=======
>>>>>>> 8a4f8341ce4f2b073b8e4a3a3aabfa9bf88f822e
**How the credentials work:**
- `CYPRESS_TEST_USER_EMAIL` & `CYPRESS_TEST_USER_PASSWORD` - For logging in to test campaigns
- `CYPRESS_EXISTING_USER_EMAIL` - Used to test "email already exists" error
- `CYPRESS_TEST_USER_NAME` - Display name for new user registrations
- Other variables are for testing validation errors and campaign data

**Step 4: Run tests**
```bash
# Run all tests
npm test

# Or open test runner to see tests run
npm run open
```

**Step 5: Check results**
```bash
# Open reports in browser
open cypress/reports/test-report.xlsx
open cypress/reports/healthcheck-report.html

# View test recordings and screenshots
open cypress/videos/            # Test execution videos
open cypress/screenshots/       # Screenshots of failed tests (if any)
```

## More Commands

**Run specific tests:**
```bash
npm run test:healthcheck    # Just health check tests
npm run test:registration   # Just registration tests  
npm run test:campaigns      # Just campaign tests
```

**Check code quality:**
```bash
npm run lint               # Check for code issues
npm run lint:fix          # Fix code issues automatically
```

**Run with different browsers:**
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

<<<<<<< HEAD
## Troubleshooting

**If tests fail with "EMAIL is undefined":**
- Make sure `.env` file exists in project root
- Check that all variables start with `CYPRESS_` prefix
- Restart terminal after creating .env file

**If registration tests fail:**
- The test user email might already exist in the system
- Try changing `CYPRESS_TEST_USER_EMAIL` to a different email

**If CI/CD fails:**
- GitHub Actions are pre-configured with working credentials
- Check Actions tab for detailed error logs

=======
>>>>>>> 8a4f8341ce4f2b073b8e4a3a3aabfa9bf88f822e
## CI/CD Setup

Tests run automatically on GitHub when you push code.

**For Assignment Demo:**
CI/CD is pre-configured with test credentials for immediate evaluation.

**For Production Use:**
See `SECRETS_SETUP.md` for how to configure GitHub secrets properly.

**How to check results:**
```bash
git push    # Triggers CI/CD automatically
```
- Go to Actions tab in your GitHub repo
- Every push/PR will trigger the tests
- Download test reports, screenshots, and videos from artifacts

---

**Status**: 11 tests passing ✅  
**Built with**: Cypress 14.5.0
