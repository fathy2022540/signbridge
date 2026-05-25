export function showToast(

  text,

  type = "success"

) {

  const container =

    document.getElementById(
      "toastContainer"
    );

  if (!container)
    return;

  const toast =
    document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.innerText =
    text;

  container.appendChild(
    toast
  );

  setTimeout(() => {

    toast.style.opacity = "0";

    toast.style.transform =
      "translateX(40px)";

    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 3200);

}