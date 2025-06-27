# Test Plan for Upcoming Features – Povio Automation QA Assignment

Author: Bujare Ndrecaj  
Date: June 27, 2025

## What's Coming

We've got three new features in the pipeline that need testing. Based on the requirements I got from the product team, here's what we're looking at:

## Roles & Permissions

The main thing here is that admins can delete campaigns but regular users can't. Pretty straightforward but we need to make sure it actually works.

**Admin stuff to test:**
- Delete a campaign (the happy path)
- Make sure the confirmation dialog works - nobody wants accidental deletions
- Try deleting multiple campaigns back to back
- What happens if you try to delete something that's already gone?

**Regular user testing:**
- Delete button shouldn't even show up for them
- If they somehow get the delete URL, it should block them
- API calls should fail properly

**Things that could go wrong:**
- Session timing out mid-delete
- Two admins trying to delete the same campaign
- Network issues during delete

**Test data needed:**
- Admin and regular user accounts
- Some test campaigns to delete
- Maybe some mock error responses

---

## User Management Dashboard

This one's bigger - admins get a dashboard to see all users and can promote/demote people.

**Basic functionality:**
- Load the user list (hopefully with pagination if there are tons of users)
- Show username, email, role, when they signed up
- Search and filtering - probably by name or role
- Sorting by different columns

**The promotion/demotion stuff:**
- Promote someone from user to admin
- Demote an admin back to regular user  
- What if an admin tries to demote themselves? (probably shouldn't work)
- Bulk operations if they built that

**Access control:**
- Regular users shouldn't see this page at all
- Role changes should kick in right away
- Maybe some kind of audit log?

**Test data:**
- Bunch of users with different roles
- Large dataset to test pagination
- Weird usernames/emails with special characters
- Maybe some edge cases like locked accounts

---

## Campaign Images

Finally, campaigns can have images now. Optional feature, shows thumbnails in the campaign list.

**File upload testing:**
- JPG, PNG, GIF should work
- File size limits (whatever they set)
- Try uploading weird file types
- Creating campaigns without images should still work fine

**Display stuff:**
- Thumbnails show up correctly
- Big images get resized properly
- Broken/missing images don't crash everything
- Loading spinners during upload

**Managing images:**
- Replace an existing image
- Remove an image completely
- File optimization/compression
- Images stored properly (CDN or whatever)

**Test files needed:**
- Various image formats and sizes
- Some corrupted files to test error handling
- Really big files to test limits
- Mock CDN stuff if needed

---

## Implementation Notes

**File structure:**
Following the same pattern we have now:
- `roles-permissions.cy.js`
- `user-management.cy.js`
- `campaign-images.cy.js`

**Page objects:**
- `rolesPermissions.js`
- `userManagement.js` 
- `campaignImages.js`

**Test data updates:**
Need to extend the `testDataHelper.js` with role configs, image paths, permission mappings, and error messages.

**Environment stuff:**
Probably need some new env vars for upload endpoints, file limits, CDN config.

**Reporting:**
Current mochawesome setup should handle this fine, maybe add some categorization for the different features.

---

## Potential Issues

**High risk stuff:**
- Permission enforcement across sessions (biggest concern)
- File upload security 
- Concurrent user management operations
- Session handling during role changes

**Performance things to watch:**
- Large image uploads timing out
- User list with lots of data
- Multiple admins doing operations at once
- Thumbnail generation load

---

## Timeline

Rough estimates:
- Roles/permissions: 2-3 days
- User management: 3-4 days (more complex)
- Image uploads: 2-3 days
- Integration testing: 1-2 days

**Dependencies:**
- Need updated API docs
- Test environment with role management
- Sample image files
- Admin accounts set up

Should maintain the same quality as our current test suite.
