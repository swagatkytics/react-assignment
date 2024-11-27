const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.text}>Home</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
        backgroundColor: '#f5f5f5', // Optional background color
        margin: 0, // Reset margin
    },
    text: {
        fontSize: '3rem', // Adjust font size as needed
        fontWeight: 'bold',
        color: '#333', // Optional text color
    },
};

export default HomePage;
