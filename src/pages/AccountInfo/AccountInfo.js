import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import postService from '../../services/accountService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    setIsLoading(true);
    postService.getAllAccountsByUserId()
      .then((response) => {
        setAccounts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching accounts:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching accounts.');
        setIsLoading(false);
      });
  }, []);
  const handleAccountClick = (account) => {
    navigate('/accountDetails', { state: { account } });
  };
  return (
    <div className="container">
      <div className="mt-4">
        <div className="mb-4">
          {isLoading ? (
            <div>Loading accounts...</div>
          ) : (
            <>
              <Link to='/createaccount'>
                <Button variant="secondary" size="lg" className='mb-4'>
                  Create account
                </Button>
              </Link>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {accounts.map((account) => (
                <div key={account.id} className='mb-4' onClick={() => handleAccountClick(account)}>
                  <Card border="dark" style={{ width: '40 rem' }}>
                    <Card.Header>Account Type: {account.accountType}</Card.Header>
                    <Card.Body>
                      <Card.Title>Account Number: {account.accountNumber}</Card.Title>
                      <Card.Text>
                        Account Id: {account.id}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
