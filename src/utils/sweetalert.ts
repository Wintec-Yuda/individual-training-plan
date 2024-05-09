import Swal from "sweetalert2";
export const showAlert = async (icon: "success" | "error", title: string, text: string) => {
  await Swal.fire({
    icon,
    title,
    text,
    timer: 2000,
  });
};

export const successAlert = async (text: string) => {
  await showAlert("success", "Success", text);
};

export const errorAlert = async (text: string) => {
  await showAlert("error", "Error", text);
};

export const confirmAlert = async (confirmButtonText: string) => {
  const confirmed = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    confirmButtonText: confirmButtonText,
    cancelButtonText: "No, cancel!",
  });

  return confirmed.isConfirmed;
};
