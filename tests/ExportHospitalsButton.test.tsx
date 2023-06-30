import { render, screen, fireEvent } from '@testing-library/react';

import ExportHospitalsButton from '@/app/Component/btn';

describe('ExportHospitalsButton component', () => {
  it('renders button with correct text', () => {
    render(<ExportHospitalsButton displayListings={[]} />);
    const exportButton = screen.getByText('Export Hospitals');
    expect(exportButton).toBeInTheDocument();
  });

  it('disables the button while exporting', () => {
    render(<ExportHospitalsButton displayListings={[]} />);
    const exportButton = screen.getByText('Export Hospitals');
    fireEvent.click(exportButton);
    expect(exportButton).toBeDisabled();
  });

  it('triggers the export process when clicked', async () => {
    const mockDisplayListings = [
      {
        name: 'Hospital A',
        address: 'Address A',
        email: 'email@example.com',
        phone: '123456789',
        description: 'Description A',
      },
      // Add more listings if needed
    ];

    const originalOpen = window.open;
    window.open = jest.fn();

    render(<ExportHospitalsButton displayListings={mockDisplayListings} />);
    const exportButton = screen.getByText('Export Hospitals');
    fireEvent.click(exportButton);

    await screen.findByText('Exporting...');

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(expect.any(String), '_blank');

    window.open = originalOpen;
  });
});
