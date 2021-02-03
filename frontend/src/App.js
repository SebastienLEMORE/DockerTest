import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';

function App() {
  const [users, setUsers] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState({});
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  
  useEffect(() => {
    (
      async () => {
        const response = await fetch('api/users');
        const data = await response.json();
        setUsers(data);
      }
    )();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setActiveUser(user);
    setValue(user.email)
    setShow(true);
    setError(false);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`api/users/${activeUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token, // hack in index-react.html
      },
      body: JSON.stringify({
        username: activeUser.username,
        email: value,
      }),
    }).then(async (response) => {
      if (response.status === 202) {
        const response = await fetch('api/users');
        const data = await response.json();
        setUsers(data);
        setShow(false);
        setError(false);
      } else {
        setError(true);
      }
    })
  }

  return (
    <main>
      <div className="container">
        <h1 className="text-center">Bienvenue !</h1>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Modifier l'adresse mail</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => 
                (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.last_name}</td>
                    <td>{user.first_name}</td>
                    <td id="table-email">{user.email}</td>
                    <td>
                    <Button variant="primary" onClick={() => handleShow(user)}>
                      Modifier
                    </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'adresse mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Adresse Mail</label>
              <input
                type="email"
                value={value}
                className="form-control"
                placeholder="Entrer adresse email"
                onChange={onChange}
              />
              {error ? (
                <p id='error-form' className="text-danger mt-2">Adresse email invalide !</p>
              ) : null} 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Fermer</button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default App;
