export default function Footer() {
  return (
    <footer className="cafe-footer" id="visit">
      <div className="footer-grid">
        <div className="footer-column" style={{ flex: "2 1 300px" }}>
          <div className="footer-logo" style={{ marginBottom: "1.5rem" }}>
            Alba’s Cafe
          </div>
          <p style={{ maxWidth: "320px", marginBottom: "1.5rem" }}>
            An immersive sensory space dedicated to the pursuit of exceptional, sustainably sourced coffee.
          </p>
        </div>
        
        <div className="footer-column">
          <h4>Hours</h4>
          <p>Monday – Friday</p>
          <p style={{ color: "var(--primary-pink)", fontWeight: 500, marginBottom: "1.5rem" }}>
            7:00 AM – 6:00 PM
          </p>
          <p>Saturday – Sunday</p>
          <p style={{ color: "var(--primary-pink)", fontWeight: 500 }}>
            8:00 AM – 7:00 PM
          </p>
        </div>
        
        <div className="footer-column">
          <h4>Location</h4>
          <p>80 Feet Road, 4th Block</p>
          <p>Koramangala, Bengaluru, India</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} Alba’s Cafe. All rights reserved.</div>
      </div>
    </footer>
  );
}
