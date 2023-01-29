---
title: The pitfalls of high code coverage and how TDD can mitigate them
excerpt: High unit test code coverage is often viewed as a key indicator of code quality, but it's important to focus on the quality of the unit tests, not just the code coverage percentage.
date: 2023-01-29 20:00:00 +0900
tags: testing quality
og_image: /assets/images/2023/100-percent-code-coverage.jpg
---

![Meme: image of Pirate Captain saying "your code is really well tested"](/assets/images/2023/100-percent-code-coverage.jpg)

_High unit test code coverage is often viewed as a key indicator of code quality, and for good reason. It demonstrates that a significant portion of the codebase has been tested and is less likely to contain bugs. However, if you just see the numbers, how can you be sure that your business logic is covered? Or that your code is easy to maintain?_

More often than it should, when you look at what is under that report, you will find poorly written unit tests, with the sole purpose of getting high code coverage.

**The 2 most common problems are:**

- Tests that deliberately leave out complex parts of the business logic, because writing those can take time, and focused on parts easier to test, like utility functions and data access layers.
- Test that, at least in the reports, seem to cover business logic, but when you look at the tests you can’t tell what they are testing, so if they fail, you don’t really know why they failed.

Those can give you a false sense of security, when in reality, the most important part of the codebase is not being tested at all. Leading to issues when a change in the business logic breaks the codebase, and the test suit is not able to detect it.

**To avoid these pitfalls, it's important to focus on the quality of the unit tests, not just the quantity. Here are a few best practices to follow:**

- Write tests that cover all aspects of the business logic, including complex parts. This will ensure that the most important parts of the codebase are being tested.

- Use clear and descriptive test names and assertions. This will make it easy to understand what the test is checking for, and why it have failed.

- Follow Test-Driven Development (TDD) principles. This approach encourages developers to write tests before writing the code, which can help ensure that the code is well-tested from the beginning.

- In code reviews, give a special attention to unit tests. Are the tests are easy to understand? Are they really testing business rules? Or are they using meaningless values just to make sure they hit the conditionals?

## How can TDD help?

Let’s see an example when building a feature to validate the password creation. The development team would receive a requirement like this:

> The new password must be at least 8 characters long, and have at least 1 lowercase letter, 1 uppercase letter, 1 digit and a special character.

### First without TDD

What is the first thing a dev who doesn't follow TTD will probably do?

![google search for "regex to validate password"](/assets/images/2023/google-regex-for-password.png)

After finding the regex they want on Google they will write a function like this:

```javascript
function validateNewPassword(newPassword) {
  let passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
  return passwordRegex.test(newPassword)
}
```

Then, time for the unit tests:

```javascript
test('valid password', () => {
  expect(validateNewPassword('Abcdefg1!')).toBe(true)
})

test('invalid password', () => {
  expect(validateNewPassword('Abcdefgh1')).toBe(false)
})
```

Running the test, both tests would pass, and we would have 100% code coverage. Great, right?

Except there are to big problems with that approach.

First, the 100% test coverage was reached by testing only 1 out of at least 5 invalid password scenarios.

Second, Regex are not easy to understand, especially long expressions. And as the tests are not descriptive enough, if another developer had to change that code later, it would take a while to understand how the validation is done.

### Now lets see how the code could be written differently by applying TDD.

Our first requirement is minimum length =8.
Let's write a test for that:

```javascript
test('password minimum length', () => {
  expect(validateNewPassword('a'.repeat(7))).toBe(false)
})
```

And we start the implementation by applying just making that first test pass:

```javascript
function validateNewPassword(newPassword) {
  if (newPassword.length < 8) {
    return false
  }
  return true
}
```

OK, now second requirement. At least one uppercase letter.
Let's write a test for that:

```javascript
test('password must contain at least one uppercase letter', () => {
  expect(validateNewPassword('abcdefgh1!')).toBe(false)
})
```

To make this test pass, we can add a check for uppercase letters in our validation function:

```javascript
function validateNewPassword(newPassword) {
  if (newPassword.length < 8) {
    return false
  }
  if (!newPassword.match(/[A-Z]/)) {
    return false
  }
  return true
}
```

Now, lowercase letters:

```javascript
test('password must contain at least one lowercase letter', () => {
  expect(validateNewPassword('ABCDEFGH1!')).toBe(false)
})
```

And we add the lowercase validation to our validation function:

```javascript
function validateNewPassword(newPassword) {
  if (newPassword.length < 8) {
    return false
  }
  if (!newPassword.match(/[A-Z]/)) {
    return false
  }
  if (!newPassword.match(/[a-z]/)) {
    return false
  }
  return true
}
```

Next, let's move on to the next requirement: at least one digit.

```javascript
test('password must contain at least one digit', () => {
  expect(validateNewPassword('Abcdefgh!')).toBe(false)
})
```

To make this test pass, we can add a check for digits in our validation function:

```javascript
function validateNewPassword(newPassword) {
  if (newPassword.length < 8) {
    return false
  }
  if (!newPassword.match(/[A-Z]/)) {
    return false
  }
  if (!newPassword.match(/[a-z]/)) {
    return false
  }
  if (!newPassword.match(/\d/)) {
    return false
  }
  return true
}
```

Finally, let's test for the last requirement: at least one special symbol.

```javascript
test('password must contain at least one special symbol', () => {
  expect(validateNewPassword('Abcdefgh1')).toBe(false)
})
```

To make this test pass, we can add a check for special symbols in our validation function:

```javascript
function validateNewPassword(newPassword) {
  if (newPassword.length < 8) {
    return false
  }
  if (!newPassword.match(/[A-Z]/)) {
    return false
  }
  if (!newPassword.match(/[a-z]/)) {
    return false
  }
  if (!newPassword.match(/\d/)) {
    return false
  }
  if (!newPassword.match(/[@$!%*?&]/)) {
    return false
  }
  return true
}
```

Now we have a validation function that follows the requirements, and is well tested. Additionally, the tests are now more descriptive, so it's easier for other developers to understand how the validation works.

But some might say: "look at all those if's, it doesn't look good". Ok, let's rewrite it for readability:

```javascript
const LOWERCASE_REGEX = /[a-z]/
const UPPERCASE_REGEX = /[A-Z]/
const DIGIT_REGEX = /\d/
const SPECIAL_CHAR_REGEX = /[@$!%*?&]/

function validateNewPassword(newPassword) {
  return (
    newPassword.length >= 8 &&
    LOWERCASE_REGEX.test(newPassword) &&
    UPPERCASE_REGEX.test(newPassword) &&
    DIGIT_REGEX.test(newPassword) &&
    SPECIAL_CHAR_REGEX.test(newPassword)
  )
}
```

And our unit test file would look like this:

```javascript
describe('Password validation', () => {
  test('password minimum length is 8 characters', () => {
    // refactored after the first example to make sure the only reason for the test to fail is the length
    expect(validateNewPassword('Abcde1!')).toBe(false)
    expect(validateNewPassword('Abcdef1!')).toBe(true)
  })

  test('password must contain at least 1 uppercase letter', () => {
    expect(validateNewPassword('abcdefgh1!')).toBe(false)
    expect(validateNewPassword('Abcdefgh1!')).toBe(true)
  })

  test('password must contain at least 1 lowercase letter', () => {
    expect(validateNewPassword('ABCDEFGH1!')).toBe(false)
    expect(validateNewPassword('AbCdefgh1!')).toBe(true)
  })

  test('password must contain at least 1 digit', () => {
    expect(validateNewPassword('Abcdefgh!')).toBe(false)
    expect(validateNewPassword('Abcdefgh1!')).toBe(true)
  })

  test('password must contain at least 1 special symbol', () => {
    expect(validateNewPassword('Abcdefgh1')).toBe(false)
    expect(validateNewPassword('Abcdefgh1!')).toBe(true)
  })
})
```

By following these best practices, not only you can ensure that your unit test code coverage is an accurate indicator of code quality, and that your business logic is well-covered. But you can also improve the maintainability and readability of your code.
