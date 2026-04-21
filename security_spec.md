# Security Specification: ColdChat

## Data Invariants
1. A user can only write to their own profile in `/users/{userId}`.
2. A chat must have at least 2 participants.
3. Access to messages in `/chats/{chatId}/messages` is strictly restricted to users listed in the parent `/chats/{chatId}` document's `participants` array.
4. Messages are immutable once read (optional design choice, but for integrity, sender can't change text after status is 'read').
5. Timestamps must match `request.time`.

## The Dirty Dozen Payloads (Rejection Targets)
1. User profile with `email` belonging to another user.
2. User profile set to `isAdmin: true` (if field existed).
3. Chat document where the current user is NOT in the `participants` array.
4. Message document created with `senderId` spoofing another user.
5. Message document created with a `timestamp` in the future or past.
6. Updating a chat's `participants` to remove oneself while active (orphaning the chat).
7. Reading a chat document if the user is not a participant.
8. Listing all users (blanket read) without being an admin.
9. Injecting a 2MB string into the message `text`.
10. Setting a message status to `read` for a message one sent themselves.
11. Deleting a message sent by someone else.
12. Creating a chat document with a document ID longer than 128 chars.

## Test Suite Plan
The `firestore.rules` will verify these via named helpers.
1. `isValidUser()`
2. `isValidChat()`
3. `isValidMessage()`
4. `isParticipant()`
