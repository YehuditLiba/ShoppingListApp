import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingDashboard from '../src/components/ShoppingDashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <Container fluid className="p-3">
        <ShoppingDashboard />
      </Container>
    </div>
  );
};

export default App;
