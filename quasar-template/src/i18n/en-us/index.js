export default {
  user: {
    label: 'User | Users',
    name: 'Name',
    password: 'Password',
    forgotPassword: 'Forgot password? Click ',
    modal: {
      title: 'Remove User',
      description: `You are about delete the user “{user}” from the platform,`,
    },
  },
  eTable: {
    pagination: {
      page: 'Page',
      of: 'of {pagesNumber}',
      displaying:
        'Displaying ({firstRowNumber} - {endRowNumber} of {totalRowNumber})',
    },
  },
  gral: {
    pages: {
      logIn: 'Log in',
      newPassword: 'New password',
    },
    new: 'New',
    delete: 'Remove',
    save: 'Save',
    send: 'Send',
    cancel: 'Cancel',
    accept: 'Accept',
    export: 'Export',
    here: 'here',
    goback: 'Go back',
    restore: 'Restore',
    settings: 'Settings',
    signOut: 'Sign out',
    areYouSure: `Are you sure to continue?`,
    table: {
      pagination: '{num1}-{num2} of {total}',
      noData: 'No information to show.',
    },
  },
  errors: {
    server: {
      forbidden: 'Denied access',
      unauthorizedUser: 'Unauthorized user',
      notFound: 'Request URL not founded',
      internalError: 'Internal error',
      system: 'Internal server error',
    },
    amplify: {
      disableUser: 'User disable',
      invalidCredentials: 'Invalid credentials',
      passNotLongerValid: 'Password not longer valid',
      registerIncomplete: 'User not confirmed',
    },
    exportFile: {
      nodata: 'No data to export',
      nocolums: 'No columns to export',
    },
    fieldRequired: ' is required',
    pageNotFound: '¡Oops!, nothing here...',
    email: 'Invalid email',
    invalidRequest: 'Invalid request',
    badRequest: 'Bad request',
  },
};
