//import Swal from 'sweetalert2';

const onResponseSuccess = response => {
  return response.data;
};

/**
 * Fires Swal with error message and then re-throws error
 */
// const onError = error => {
/**
 * Error message could be in error.message, error.response.data.status_message or
 * in error.response.data.errors[0]
 */
//   let errorMessage = error.response
//     ? error.response.data.status_message || error.response.data.errors[0]
//     : error.message;

//   const defaultTitle = 'Error';
//   const errorTitle = error.response
//     ? error.response.status + '!'
//     : defaultTitle;
//   if (process.env.NODE_ENV == 'development')
//     Swal.fire({
//       icon: 'error',
//       title: errorTitle,
//       text: errorMessage,
//     });
//   return Promise.reject(error);
// };

export { onResponseSuccess /*onError */ };
