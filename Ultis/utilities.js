import Toast from "react-native-root-toast";

export const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const isValidPhoneNumber = (phoneNumber) => {
    // Allow only 10 digits
    let phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  }

  export const showToast = (type, message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      type: type,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 30000);
  };

  