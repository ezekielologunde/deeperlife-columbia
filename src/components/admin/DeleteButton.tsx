"use client";

export default function DeleteButton({
  confirmText = "Are you sure you want to delete this? This cannot be undone.",
  className = "font-semibold text-red-600 hover:text-red-800",
  children = "Delete",
}: {
  confirmText?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
