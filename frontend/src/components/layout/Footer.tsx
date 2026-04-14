import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: '#f3f4f6',
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
      marginTop: 'auto',
      borderTop: '1px solid #374151'
    }}>
      <Container style={{ maxWidth: '1200px' }}>
        <Row style={{ gap: '2rem', marginBottom: '2.5rem' }}>
          <Col md={6} style={{ paddingRight: '2rem' }}>
            <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
              🎯 EventHub
            </h5>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: 0 }}>
              A simple and efficient event management system for organizing and participating in amazing events. Built by developers, for developers.
            </p>
          </Col>
          <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <small style={{ color: '#9ca3af', display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                © 2026 EventHub - Academic Project
              </small>
              <small style={{ color: '#9ca3af', display: 'block', fontSize: '0.95rem' }}>
                Built with React 19 • Node.js • MongoDB 8.0
              </small>
            </div>
          </Col>
        </Row>
        
        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, #4b5563 50%, transparent 100%)', margin: '2rem 0' }}></div>
        
        {/* Bottom Links */}
        <Row style={{ textAlign: 'center' }}>
          <Col xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <small style={{ color: '#9ca3af' }}>
                <span style={{ color: '#6366f1', fontWeight: 'bold' }}>✨</span> Organized Events
              </small>
              <small style={{ color: '#9ca3af' }}>
                <span style={{ color: '#ec4899', fontWeight: 'bold' }}>👥</span> Community Driven
              </small>
              <small style={{ color: '#9ca3af' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>🚀</span> Fast & Reliable
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;