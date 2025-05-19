const toastIcons = {
  success: `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>`,
  error: ` <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>`,
  warning: `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>`
};

const toastColors = {
  success: { bg: "bg-green-100", text: "text-green-500", darkBg: "bg-green-800", darkText: "text-green-200" },
  error: { bg: "bg-red-100", text: "text-red-500 ", darkBg: "bg-red-800", darkText: "text-red-200" },
  warning: { text: "text-orange-500", bg: "bg-orange-100", darkBg: "bg-orange-700", darkText: "text-orange-200" }
};

export const showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");

  toast.className =
    "flex items-center w-full max-w-xs p-4 text-sm text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800";
  toast.innerHTML = `
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${toastColors[type].bg} ${toastColors[type].text} dark:${toastColors[type].darkBg} dark:${toastColors[type].darkText} rounded-lg">
    ${toastIcons[type]}
    </div>
    <div class="ms-3 text-sm font-normal">${message}</div>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}