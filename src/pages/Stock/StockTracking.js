import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const initialStockData = [
  { id: 1, productName: 'Burger', stock: 120 },
  { id: 2, productName: 'Fries', stock: 200 },
  { id: 3, productName: 'Soda', stock: 150 },
];

const StockTracking = () => {
  const [stockData, setStockData] = useState(initialStockData);
  const [open, setOpen] = useState(false);
  const [newStock, setNewStock] = useState({ productName: '', stock: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewStock({ productName: '', stock: '' });
  };

  const handleAddStock = () => {
    setStockData([...stockData, { id: stockData.length + 1, ...newStock }]);
    handleClose();
  };

  return (
    <div>
      <h1>Stock Tracking</h1>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Stock
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.productName}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding New Stock */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Stock</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={newStock.productName}
            onChange={(e) => setNewStock({ ...newStock, productName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={newStock.stock}
            onChange={(e) => setNewStock({ ...newStock, stock: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStock} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockTracking;
