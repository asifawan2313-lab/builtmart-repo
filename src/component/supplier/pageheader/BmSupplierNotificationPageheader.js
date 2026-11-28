const BmSupplierNotificationPageheader = ({ title, description }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-semibold text-[color:var(--primary-text)] sm:text-4xl">
      {title}
    </h1>

    {description && (
      <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
        {description}
      </p>
    )}
  </div>
);

export default BmSupplierNotificationPageheader;