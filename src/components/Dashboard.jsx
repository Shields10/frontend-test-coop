import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Toolbar, AppBar, Drawer, List, ListItem, ListItemText, IconButton, Paper, Button,Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Header from '../assets/header.png';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = ({ setAccessToken }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  const handleAddProduct = (product) => { setSelectedProducts([...selectedProducts, product]); };
  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== productId));
  };
  const handleLogout = () => {
    setAccessToken(null); // Clear the access token
    navigate('/login'); // Navigate back to the login page
  };

  return (
    <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: `url(${Header})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }} >     
       <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Inua Mkulima Subsidy Program
          </Typography>

          <Button style={{ color: 'white' }}
                        startIcon={<LogoutIcon />}
                        sx={{ marginLeft: 'auto' }} onClick={handleLogout}
                        color="ochre" 
                      >
                        Log out
                      </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Transactions','Reports'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'row' ,mt:8}}>
      
        <Toolbar />
        <Container sx={{ flex: 1, mr: 2 }}>
     
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <Paper sx={{ maxHeight: '70vh', overflow: 'auto', p: 2 }}>
            <List>
              <ListItem>
                <ListItemText primary="Product Name" sx={{ fontWeight: 'bold' }} />
                <ListItemText primary="Price" sx={{ fontWeight: 'bold', textAlign: 'right' }} />
              </ListItem>
              <Divider />
              {products.map((product) => (
                <ListItem key={product.id} secondaryAction={
                  <IconButton edge="end" aria-label="add" onClick={() => handleAddProduct(product)}>
                    <AddIcon />
                  </IconButton>
                }>
                  <ListItemText
                    primary={product.title}
                  />
                  <ListItemText
                    primary={`$${product.price}`}
                    sx={{ textAlign: 'right' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
        <Container sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Selected Products
          </Typography>
          <Paper sx={{ maxHeight: '70vh', overflow: 'auto', p: 2 }}>
            <List>
              <ListItem>
                <ListItemText primary="Product Name" sx={{ fontWeight: 'bold' }} />
                <ListItemText primary="Price" sx={{ fontWeight: 'bold', textAlign: 'right' }} />
              </ListItem>
              <Divider />
              {selectedProducts.map((product) => (
                <ListItem key={product.id} secondaryAction={
                  <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveProduct(product.id)}>
                    <RemoveIcon />
                  </IconButton>
                }>
                  <ListItemText
                    primary={product.title}
                  />
                  <ListItemText
                    primary={`$${product.price}`}
                    sx={{ textAlign: 'right' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
