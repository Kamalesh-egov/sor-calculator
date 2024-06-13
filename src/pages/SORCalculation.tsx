import React, { useState } from 'react';

interface RowData {
  id: number;
  description: string;
  uom: string;
  rate: number;
  quantity: number;
  amount: number;
}

const SORCalculation: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    { id: 1, description: '', uom: '', rate: 0, quantity: 0, amount: 0 }
  ]);
  const [filterValue, setFilterValue] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [nextId, setNextId] = useState(2);

  const handleInputChange = (id: number, field: keyof RowData, value: string) => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };

        if (field === 'rate' || field === 'quantity') {
          const rate = field === 'rate' ? parseFloat(value) || 0 : row.rate;
          const quantity = field === 'quantity' ? parseFloat(value) || 0 : row.quantity;
          updatedRow.amount = rate * quantity;
        }

        return updatedRow;
      }
      return row;
    });
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { id: nextId, description: '', uom: '', rate: 0, quantity: 0, amount: 0 }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleFilterChange = () => {
    setFilterOpen(filterOpen ? false : true);
    setFilterValue('');
  }

  const filteredRows = rows.filter(row =>
    Object.values(row).some(val =>
      val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const totalAmount = rows.reduce((total, row) => total + row.amount, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">SOR Calculation</h1>
      <div className="mb-4">
      </div>
      <div className="mb-4">
        <button onClick={handleFilterChange} className='font-bold'>
            Filters {filterOpen ? '⏷' : '🢒'}
        </button>
        {filterOpen && (
          <input
            type="text"
            placeholder="Type for any text in the table to get the filtered result in the table"
            value={filterValue.trim()}
            onChange={(e) => setFilterValue(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
          />
        )}
      </div>
      <h1 className='font-bold mb-2'>Table</h1>
      <table className="w-full border-collapse border">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">UOM</th>
            <th className="border p-2">Rate (₹)</th>
            <th className="border p-2">Estimated Quantity</th>
            <th className="border p-2">Estimated Amount</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={row.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                  className="w-full border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.uom}
                  onChange={(e) => handleInputChange(row.id, 'uom', e.target.value)}
                  className="w-full border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  inputMode='numeric'
                  value={row.rate.toString()}
                  onChange={(e) => handleInputChange(row.id, 'rate', e.target.value)}
                  className="w-full border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  inputMode='numeric'
                  value={row.quantity.toString()}
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                  className="w-full border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <p className='w-full text-center border border-gray-300 p-1'>
                    {row.amount.toFixed(2)}
                </p>
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => removeRow(row.id)} className="text-red-500">✖</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className='border p-2'></td>
            <td colSpan={3} className='border text-center p-2'>
                { !filterOpen && <button onClick={addRow} className="text-orange-500 py-1 px-2 rounded">+ Add Item</button>}
            </td>
            <td className="border p-2 text-right font-bold">Grand Total</td>
            <td className="border p-2 text-center font-bold">{totalAmount.toFixed(2)}</td>
            <td className="border p-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SORCalculation;