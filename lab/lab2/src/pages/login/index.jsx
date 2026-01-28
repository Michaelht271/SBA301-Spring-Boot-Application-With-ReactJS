
// 5. Login.jsx - Main component (đơn giản hơn)
import { Container } from 'react-bootstrap';
import Background from '../../component/ui/background'
import { LoginCard } from '../../component/ui/LoginCard'
import LoginForm from '../../component/auth/form-login'
import useLoginLogic from '../../services/auth/useLoginLogic'
function Login() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        validated,
        handleLogin,
        handleCancel,
        resetError
    } = useLoginLogic();
    return (
        <Background>
            <Container className="d-flex justify-content-center">
                <LoginCard >
                    <LoginForm
                        username={username}
                        password={password}
                        error={error}
                        onUsernameChange={setUsername}
                        onPasswordChange={setPassword}
                        onSubmit={handleLogin}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                        validated={validated}
                    />
                </LoginCard>
            </Container>
        </Background>
    );
}

export default Login;