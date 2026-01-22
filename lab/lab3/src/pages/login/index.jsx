
// 5. Login.jsx - Main component (đơn giản hơn)
import { Container } from 'react-bootstrap';
import Background from '../../components/ui/background'
import { LoginCard } from '../../components/ui/LoginCard'
import LoginForm from '../../features/authentication/form-login'
import useLoginLogic from '../../hooks/useLoginLogic.js'

function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error, // This is the API error from the hook
        validationErrors, // This is the new validation errors object
        isLoading,
        handleLogin,
        handleCancel,
    } = useLoginLogic();

    return (
        <Background>
            <Container className="d-flex justify-content-center">
                <LoginCard error={error} onErrorClose={handleCancel}>
                    <LoginForm
                        email={email}
                        password={password}
                        // API error is passed to the top error display
                        // validationErrors are for field-specific messages
                        validationErrors={validationErrors}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onSubmit={handleLogin}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </LoginCard>
            </Container>
        </Background>
    );
}

export default Login;