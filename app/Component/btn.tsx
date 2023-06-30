import React, { useState } from "react";

interface Hospital {
  name: string;
  address: string;
  email: string;
  phone: string;
  description: string;
}

interface ExportHospitalsButtonProps {
  displayListings: Hospital[];
}

const ExportHospitalsButton: React.FC<ExportHospitalsButtonProps> = ({
  displayListings,
}) => {
  const [exporting, setExporting] = useState(false);

  const handleExportClick = async () => {
    setExporting(true);

    try {
      // Create a CSV content string
      const csvContent = [
        "Hospital Name,Address,Email,Phone,Description", // CSV header
        ...displayListings.map((listing) =>
          Object.values(listing)
            .map((value) => `"${value.replace(/"/g, '""')}"`)
            .join(",")
        ), // CSV rows
      ].join("\n");

      // Create a Blob object from the CSV content
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create a download URL for the Blob object
      const downloadUrl = URL.createObjectURL(blob);

      // Open the download URL in a new browser tab
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Export Hospitals Error:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExportClick}
      disabled={exporting}
      style={{
        background: "#f07900",
        color: "blue",
        padding: "8px 16px",
        border: "none",
        borderRadius: "9999px",
        cursor: "pointer",
        position: "fixed",
        bottom: "16px",
        right: "16px",
      }}
    >
      {exporting ? "Exporting..." : "Export Hospitals"}
    </button>
  );
};

export default ExportHospitalsButton;
