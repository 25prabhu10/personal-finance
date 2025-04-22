// This file contains various constant messages used throughout the application.
// These messages are used for user feedback, error handling, and API documentation.
// They are categorized into different sections for better organization and readability.

// User Messages
export const USER_NOT_FOUND = 'User not found. Did you check the username?'
export const FETCH_USER_FAILED = "Oops! Couldn't fetch the user. Did they run away?"
export const FETCH_USERS_FAILED =
  "Oops! Couldn't fetch the user list. Are they playing hide and seek?"
export const USER_ALREADY_EXISTS =
  'Username or email already exists. Looks like someone beat you to it!'
export const UPDATE_NO_CHANGES = "No changes detected. Why fix what isn't broken?"
export const EMAIL_ALREADY_EXISTS = 'Email already exists. Please use a different one.'
export const UPDATE_USER_FAILED = 'Failed to update user. Please try again later.'
// Note: DELETE_USER_FAILED might not be directly used if relying on global error handling for delete failures.
export const DELETE_USER_FAILED = 'Failed to delete user. Are they immortal?'

// Route Summaries
export const GET_USER_SUMMARY = 'Get User'
export const GET_USERS_SUMMARY = 'Get Several Users'
export const CREATE_USER_SUMMARY = 'Create User'
export const UPDATE_USER_SUMMARY = 'Update User'
export const DELETE_USER_SUMMARY = 'Delete User'

// Route Descriptions
export const GET_USER_DESC = "Get user by username. Is it a bird? Is it a plane? No, it's a user!"
export const GET_USERS_DESC = 'Get several users with pagination options. Gotta catch em all!'
export const CREATE_USER_DESC = 'Create a new user. Welcome to the club!'
export const UPDATE_USER_DESC = 'Update a user by username. Time for a makeover!'
export const DELETE_USER_DESC = 'Delete a user by username. Poof! Gone.'

// Request Body Descriptions
export const CREATE_USER_REQUEST_BODY_DESC = 'User data to create a new legend.'
export const UPDATE_USER_REQUEST_BODY_DESC = 'User data to update. Keep it fresh!'

// Response Descriptions
export const GET_USER_SUCCESS_DESC = 'Found the user! Here are the details.'
export const GET_USERS_SUCCESS_DESC = 'Got the list of users. Quite the crowd!'
export const CREATE_USER_SUCCESS_DESC = 'User created successfully! High five!'
export const UPDATE_USER_SUCCESS_DESC = 'User updated! Looking sharp.'
export const DELETE_USER_SUCCESS_DESC = 'User deleted successfully. Farewell!'

// Error Response Descriptions
export const INVALID_USERNAME_DESC = 'Invalid username. Did you forget your username?'
export const INVALID_PAGINATION_DESC = 'Invalid pagination options. Are we counting pages or sheep?'
export const VALIDATION_ERROR_DESC = 'Validation error(s). Check your payload!'
export const REQUEST_FAILED_DESC = 'Could not complete the request. The server might be napping.'
export const UPDATE_FAILED_DESC =
  'Update failed unexpectedly. Maybe try turning it off and on again?'
