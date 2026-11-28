"use client";

import { useState } from "react";
import { Archive, Image as ImageIcon, X } from "lucide-react";

const STATUS_STYLE = {
  active: "border-green-400 bg-green-50 text-green-700",
  archived:
    "border-[color:var(--border-color)] bg-[var(--off-white-background)] text-[color:var(--secondary-text)]",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const cancelBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const fieldClass =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40 disabled:cursor-not-allowed disabled:bg-[var(--off-white-background)] disabled:text-[color:var(--secondary-text)]";
const labelClass = "block text-sm text-[color:var(--secondary-text)]";

const ModalShell = ({ title, size = "max-w-md", onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`max-h-[92vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
        >
          <X size={18} />
        </button>
      </div>

      {children}
    </div>
  </div>
);

const BmAdminCategoryDataRow = ({ category }) => {
  // null | "view" | "edit" | "archive"
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({
    name: category.name,
    description: category.description,
    active: category.status === "active",
  });

  const isView = mode === "view";

  const handleOpen = (nextMode) => {
    setForm({
      name: category.name,
      description: category.description,
      active: category.status === "active",
    });
    setMode(nextMode);
  };

  const handleClose = () => setMode(null);

  const handleChange = (key, value) =>
    setForm((old) => ({ ...old, [key]: value }));

  const handleUpdateCategory = () => {
    alert(`Category "${form.name}" updated (demo)`);
    handleClose();
  };

  const handleArchiveCategory = () => {
    alert(`Category "${category.name}" archived (demo)`);
    handleClose();
  };

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3">
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md text-[color:var(--primary-text)]">
          <ImageIcon size={28} />
        </span>
      </td>
      <td className="px-4 py-3">{category.name}</td>
      <td className="px-4 py-3">{category.description}</td>
      <td className="px-4 py-3">{category.listings}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs capitalize ${STATUS_STYLE[category.status]}`}
        >
          {category.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => handleOpen("view")} className={btn}>
            View
          </button>
          <button type="button" onClick={() => handleOpen("edit")} className={btn}>
            Edit
          </button>
          {category.status === "active" && (
            <button
              type="button"
              onClick={() => handleOpen("archive")}
              className={`${btn} inline-flex items-center gap-1`}
            >
              <Archive size={13} />
              Archive
            </button>
          )}
        </div>

        {/* VIEW / EDIT MODAL */}
        {(mode === "view" || mode === "edit") && (
          <ModalShell
            title={isView ? "View Category" : "Edit Category"}
            onClose={handleClose}
          >
            <div>
              <label htmlFor={`cat-name-${category.id}`} className={labelClass}>
                Category Name
              </label>
              <input
                id={`cat-name-${category.id}`}
                value={form.name}
                disabled={isView}
                onChange={(e) => handleChange("name", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor={`cat-desc-${category.id}`} className={labelClass}>
                Description
              </label>
              <textarea
                id={`cat-desc-${category.id}`}
                rows={3}
                value={form.description}
                disabled={isView}
                onChange={(e) => handleChange("description", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor={`cat-file-${category.id}`} className={labelClass}>
                Image / File Upload
              </label>
              <input
                id={`cat-file-${category.id}`}
                type="file"
                accept="image/*"
                disabled={isView}
                className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm`}
              />
            </div>

            {isView && (
              <div className="mt-4">
                <p className={labelClass}>Total Products</p>
                <p className="mt-1 text-lg text-[color:var(--primary-text)]">
                  {category.listings}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.active}
                aria-label="Active"
                disabled={isView}
                onClick={() => handleChange("active", !form.active)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  form.active
                    ? "bg-[var(--primary-yellow)]"
                    : "bg-[var(--border-color)]"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    form.active ? "translate-x-5" : ""
                  }`}
                />
              </button>
              <span className="text-sm text-[color:var(--primary-text)]">
                Active
              </span>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className={cancelBtn}>
                {isView ? "Close" : "Cancel"}
              </button>
              {!isView && (
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  className={yellowBtn}
                >
                  Save
                </button>
              )}
            </div>
          </ModalShell>
        )}

        {/* ARCHIVE MODAL */}
        {mode === "archive" && (
          <ModalShell title="Archive Category" onClose={handleClose}>
            <p className="text-sm text-[color:var(--primary-text)]">
              Are you sure you want to archive {category.name}?
            </p>
            <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
              This category will be archived instead of permanently deleted. Its
              existing listings and data will be preserved.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className={cancelBtn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleArchiveCategory}
                className={yellowBtn}
              >
                <Archive size={15} />
                Confirm Archive
              </button>
            </div>
          </ModalShell>
        )}
      </td>
    </tr>
  );
};

export default BmAdminCategoryDataRow;